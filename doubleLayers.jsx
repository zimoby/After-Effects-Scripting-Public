
app.beginUndoGroup('clEff'); {
    setLabelFromUpDown("Up");
} app.endUndoGroup();

function setLabelFromUpDown(side){
    var currentComp = app.project.activeItem;
    var arrayLayers = currentComp.selectedLayers;
    firstWorkLayerIndex=arrayLayers[arrayLayers.length - 1].index;
    workLayer=currentComp.layer(firstWorkLayerIndex);

    for (var layerIter=arrayLayers.length - 1; layerIter >= 0 ; layerIter--) {
        var currentLayer = arrayLayers[layerIter];
        workLayer.inPoint=currentLayer.inPoint;
        workLayer.outPoint=currentLayer.outPoint;
        
        workLayer.duplicate();

    };
        workLayer.remove()
}


