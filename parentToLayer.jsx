app.beginUndoGroup('frMove'); {
    parentTo();
} app.endUndoGroup();

function parentTo(){
    
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    // setToLayer=arrayLayers[0].index;
    setToLayer=67;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];

        currentLayer.parent = currentComp.layer(setToLayer);
    };
}