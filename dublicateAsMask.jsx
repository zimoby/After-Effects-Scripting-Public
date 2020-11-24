app.beginUndoGroup('frMove'); {
    makeMask();
} app.endUndoGroup();

function makeMask(){
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        layerName=currentLayer.name;
        currentLayer.duplicate();
        newLayerIndex = arrayLayers[layerIter].index - 1;
        dublLayer=currentComp.layer(newLayerIndex);
        dublLayer.name = layerName + "_mask";
        dublLayer.label = 16;
        dublLayer.parent = currentComp.layer(newLayerIndex + 1);
    };
}