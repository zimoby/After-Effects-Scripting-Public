app.beginUndoGroup('clEff'); {
    setUnusedLabel();
} app.endUndoGroup();

function setUnusedLabel(){
    var currentComp = app.project.activeItem;
    var arrayLayers = currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        findLabel(currentLayer);
        currentLayer.label = finalColor;
    };
}

function findLabel(layer){
    var currentComp = app.project.activeItem;
    // var currentLayer=layer;
    for (var labelColorIter2=4; labelColorIter2 < 17 ; labelColorIter2++) {
        for (var layerColor=1; layerColor <= currentComp.numLayers ; layerColor++) {
            var currentLayerLabel = currentComp.layer(layerColor).label;
            if ( currentLayerLabel == labelColorIter2 ) {
                finalColor = 16;
                break;
            } else 
            {
                finalColor = labelColorIter2;
            }
            if (layerColor == currentComp.numLayers && finalColor != 0) {
                return finalColor;
            }
        }
    }
    return finalColor;
}
