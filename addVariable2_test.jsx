var proj = app.project;
var curProject = app.project;
var currentComp = app.project.activeItem;

app.beginUndoGroup('var'); {
    // createVar("plus");
    // createVar("mult");
    // createVar("plusInv");
    createVar("multInv");
} app.endUndoGroup();

function createVar(numOperator){
    varZnak=numOperator;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            addTempControls(currentLayer, arrayPropert[propIter], propIter);
            switch (varZnak) {
                case "plus":
                    textSlider="effect(\"" + getText.val1 + "\")(\"Slider\")+time+effect(\"" + getText.val2 + "\")(\"Slider\")";
                    break;
                case "mult":
                    textSlider="effect(\"" + getText.val1 + "\")(\"Slider\")+time*effect(\"" + getText.val2 + "\")(\"Slider\")";
                    break;
                case "plusInv":
                    textSlider="effect(\"" + getText.val1 + "\")(\"Slider\")+time-effect(\"" + getText.val2 + "\")(\"Slider\")";
                    break;
                case "multInv":
                    textSlider="effect(\"" + getText.val1 + "\")(\"Slider\")+time*-effect(\"" + getText.val2 + "\")(\"Slider\")";
                    break;
            }            
            arrayPropert[propIter].expression += textSlider;
        };
    };
}
function addTempControls(curLayer, curProp, propIter){
    offsetSpeed=30;
    var currentLayer = curLayer;
    var currectProp = curProp.name;
    var propertyIter = propIter;
    var propertyIterName1 = propIter;
    var propertyIterName2 = propIter;


    var getText = new Object();
    var getText.val1 = {"var_move_" + currectProp.toString() + "_" + propertyIterName1.toString() } ;
    var getText.val2 = "var_speed_" + currectProp.toString() + "_" + propertyIterName2.toString();

    // currentLayer.Effects.property(getText1) ? propertyIterName1 = propertyIter + 1;
    // currentLayer.Effects.property(getText2) ? propertyIterName1 = propertyIter + 1;
    // currentLayer.Effects.property("Slider Control") ? 0 : currentLayer.Effects.addProperty("Slider Control");

    
    // if (currentLayer.Effects.property(getText1)) {
    //     propertyIterName = propertyIter + 1;
    //     currentLayer.Effects.property("Slider Control").name = getText1;
    // } else {
    //     currentLayer.Effects.property("Slider Control").name = getText1;
    // }


    currentLayer.Effects.addProperty("Slider Control");
    currentLayer.Effects.property("Slider Control").name = getText.val1;

    currentLayer.Effects.addProperty("Slider Control"); 
    currentLayer.Effects.property("Slider Control").name = getText.val2;
    currentLayer.Effects.property(getText2).property("Slider").setValue(offsetSpeed);
    return getText;
}