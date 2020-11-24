app.beginUndoGroup('parentAttr'); {
    var importText = "fr14char3_body"
    parentAttr(importText);
} app.endUndoGroup();

function parentAttr(impText){
    var importText = impText;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    importText = arrayLayers[0].name;
    for (var layerIter=1; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        var arrayPropert=currentLayer.selectedProperties;
        // if (layerIter > 1) {
            setToLayer = arrayLayers[layerIter-1].index;
            currentLayer.parent = currentComp.layer(setToLayer);
        // }
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            // addTempControls(currentLayer, arrayPropert[propIter], propIter);
            paramName=arrayPropert[propIter].name;
            if (layerIter > 1) {
                
                importText = arrayLayers[layerIter-1].name;
                // alert(currentLayer.name)
            }
            // textSlider = "value+thisComp.layer(thisLayer, +1).transform." + paramName.toLowerCase() + ".valueAtTime(time-0.1)";
            // textSlider = "value+thisComp.layer(thisLayer, +1).transform." + paramName.toLowerCase();
            textSlider = "value+thisComp.layer(\"" + importText + "\").transform." + paramName.toLowerCase() + ".valueAtTime(time-0.1)";
            
            // alert(textSlider)
            arrayPropert[propIter].expression = textSlider;
        };
    };
}

// function addTempControls(curLayer, curProp, propIter){
//     var currentLayer = curLayer;
//     var currectPropName = curProp.name;
//     var propertyIter = propIter;
//     // currentLayer.Effects.property("Slider Control") ? 0 : currentLayer.Effects.addProperty("Slider Control");
//     currentLayer.Effects.addProperty("Slider Control"); 
//     getText =  "var_" + currectPropName.toString() + "_" + propertyIter.toString();
//     currentLayer.Effects.property("Slider Control").name = getText;
//     return getText;
//     // currentLayer.Effects.property("var").property("Slider").setValue("0");
// }