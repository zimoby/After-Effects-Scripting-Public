var proj = app.project;
var curProject = app.project;
var defParams=[0.5,10];
var currentComp = app.project.activeItem;

createBend();

function createBend(){
    app.beginUndoGroup('extend bend'); {
        var currentComp = app.project.activeItem;
        paramArray=["Freq","Amp"];
        arrayLayers=currentComp.selectedLayers;
        multiControl = "False"
        if ( currentComp.selectedLayers.length > 1 ) {
            multiControl="True";
            if ( ! currentComp.layer("paramSolid") ) {
                addControlSolid(currentComp);
            }; 
        }; 
        for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
            var currentLayer = arrayLayers[layerIter];
            var pos = currentLayer.property("Transform").property("Position");
            pos.expression = "wiggle(effect(\"Freq\")(\"Slider\"),effect(\"Amp\")(\"Slider\"))";
            addTempControls(currentLayer, layerIter, multiControl);
        };
    } app.endUndoGroup();
}

function addControlSolid(comp){
    var curComp=comp;
    var compW = currentComp.width;
    var compH = currentComp.height;
    // if ( curComp.selectedLayers.length > 1 && ! curComp.layer("paramSolid") ) {
        var paramSolid = curComp.layers.addSolid([0,0,0], "paramSolid", compW, compH,1);
        paramSolid.Effects.property("Slider Control") ? 0 : paramSolid.Effects.addProperty("Slider Control"); 
        paramSolid.Effects.property("Slider Control").name = "arrayOffset";
        addTempControls(paramSolid);
        paramSolid.enabled = false;
    // }; 
}

for (var i=0, len=Things.length; i < len ; i++) {
  Things[i]
};

function addTempControls(curLayer, iter, multiControl){
    
    var currentLayer = curLayer;
    for (var i=0, len=paramArray.length; i < len ; i++) {
        currentLayer.Effects.property("Slider Control") ? 0 : currentLayer.Effects.addProperty("Slider Control"); 
        currentLayer.Effects.property("Slider Control").name = paramArray[i];
        if (multiControl == "True") {
            currentLayer.Effects.property(paramArray[i]).property("Slider").expression = "thisComp.layer(\"paramSolid\").effect(\"" + paramArray[i] + "\")(\"Slider\")";
        } else {
            currentLayer.Effects.property(paramArray[i]).property("Slider").setValue(defParams[i]);
        }
    };
}