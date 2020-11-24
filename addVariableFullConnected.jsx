app.beginUndoGroup('var'); {
    createVar();
} app.endUndoGroup();

function createVar(){
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        var arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            valueProp=arrayPropert[propIter].value
            addTempControls(currentLayer, arrayPropert[propIter], propIter, valueProp);
            
            textSlider="effect(\"" + getText + "\")(\"Slider\")";
            // arrayPropert[propIter].setValue(valueProp)
            arrayPropert[propIter].expression += textSlider;
        };
    };
}
function addTempControls(curLayer, curProp, propIter, InValueProp){
    var valueProp = InValueProp;
    var currentLayer = curLayer;
    var currectPropName = curProp.name;
    var propertyIter = propIter;
    getText =  "var_" + currectPropName.toString() + "_" + propertyIter.toString();
    if ( ! currentLayer.Effects.property(getText)) {
        currentLayer.Effects.addProperty("Slider Control");  
        currentLayer.Effects.property("Slider Control").name = getText;
        currentLayer.Effects.property(getText).property("Slider").setValue(valueProp);
    } 
    // currentLayer.Effects.addProperty("Slider Control"); 
    
    
    
    return getText;
    // currentLayer.Effects.property("var").property("Slider").setValue("0");
}