app.beginUndoGroup('var'); {
    createVar("mult");
    // createVar("multInv");
} app.endUndoGroup();

function createVar(numOperator){
    varZnak=numOperator;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            alert(arrayPropert[propIter].value)
            valProp=arrayPropert[propIter].value;
            addTempControls(currentLayer, arrayPropert[propIter], propIter, valProp);
            switch (varZnak) {
                case "mult":
                    textSlider="effect(\"val_" + propIter + "\")(\"Slider\")+time*effect(\"" + getText + "\")(\"Slider\")";
                    break;
                case "multInv":
                    textSlider="effect(\"val_" + propIter + "\")(\"Slider\")+time*-effect(\"" + getText + "\")(\"Slider\")";
                    break;
            }            
            arrayPropert[propIter].expression += textSlider;
        };
    };
}
function addTempControls(curLayer, curProp, propIter, inVal){
    valProp = inVal;
    offsetSpeed=30;
    var currentLayer = curLayer;
    var currectProp = curProp.name;
    var propertyIter = propIter;
    // currentLayer.Effects.property("Slider Control") ? 0 : currentLayer.Effects.addProperty("Slider Control");
    currentLayer.Effects.addProperty("Slider Control"); 
    currentLayer.Effects.property("Slider Control").property("Slider").setValue(valProp);
    currentLayer.Effects.property("Slider Control").name = "val" + "_" + propertyIter.toString();
    currentLayer.Effects.addProperty("Slider Control"); 
    getText =  "var_" + currectProp.toString() + "_" + propertyIter.toString();
    currentLayer.Effects.property("Slider Control").name = getText;
    currentLayer.Effects.property(getText).property("Slider").setValue(offsetSpeed);
    return getText;
}