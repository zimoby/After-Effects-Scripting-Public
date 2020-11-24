
app.beginUndoGroup('var'); {
    createVar(1);
} app.endUndoGroup();

function createVar(numOperator){
    varZnak=numOperator;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            addTempControls(currentLayer, arrayPropert[propIter], propIter, layerIter);
            
            // textSlider="value-Math.sin((time+effect(\"sinArray\")(\"Slider\")/2)*Math.PI)*20";
            textSlider="a=Math.sin((time+effect(\"sinArray\")(\"Slider\")/2)*Math.PI)*20;\n" +
            "value+[0, a]";

            arrayPropert[propIter].expression += textSlider;
        };
        addTempControls(currentLayer, arrayPropert[propIter], propIter, layerIter);
        currentLayer.position.expression = textSlider;
    };
}
function addTempControls(curLayer, curProp, propIter, inputNum){
    num=inputNum;
    offsetSpeed=30;
    var currentLayer = curLayer;
    // var currectProp = curProp.name;
    var propertyIter = propIter;
    // currentLayer.Effects.property("Slider Control") ? 0 : currentLayer.Effects.addProperty("Slider Control");
    currentLayer.Effects.addProperty("Slider Control"); 
    currentLayer.Effects.property("Slider Control").name = "sinArray";
    currentLayer.Effects.property("sinArray").property("Slider").setValue(num);
    // currentLayer.Effects.addProperty("Slider Control"); 
    // getText =  "var_" + currectProp.toString() + "_" + propertyIter.toString();
    // currentLayer.Effects.property("Slider Control").name = getText;
    // currentLayer.Effects.property(getText).property("Slider").setValue(offsetSpeed);
    return;
}