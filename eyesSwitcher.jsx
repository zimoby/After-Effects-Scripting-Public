app.beginUndoGroup('var'); {
    createVar();
} app.endUndoGroup();

function createVar(){
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        var arrayPropert=currentLayer.selectedProperties;
        addTempControls(currentLayer, arrayPropert[propIter]);

        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            numSwitcher=propIter+1;
            textSlider="(effect(\"eyes\")(\"Slider\") == " + numSwitcher + ") ? 100 : 0";
            arrayPropert[propIter].expression += textSlider;
        };
    };
}
function addTempControls(curLayer, curProp, propIter){
    var valueProp = 1;
    var currentLayer = curLayer;
    var getText = "eyes";
    if ( ! currentLayer.Effects.property(getText)) {
        currentLayer.Effects.addProperty("Slider Control");  
        currentLayer.Effects.property("Slider Control").name = getText;
        currentLayer.Effects.property(getText).property("Slider").setValue(valueProp);
    } 
    return getText;
}