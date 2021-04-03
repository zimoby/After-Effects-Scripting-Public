app.beginUndoGroup('rename'); {
    var newText = "handL";
    var arrayLayers = app.project.activeItem.selectedLayers;
    for (var layerIter = 0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        var layerName = currentLayer.name;
        var arrayProperty = currentLayer.selectedProperties;
        if (arrayProperty.length > 0){
            for (var propIter = 0; propIter < arrayProperty.length ; propIter++) {
                arrayProperty[propIter].name = layerName + "_" + newText + "_" + (propIter + 1);
            }
        } else {
            currentLayer.name = layerName + "_" + newText + "_" + (layerIter + 1);  
        }
    }
} app.endUndoGroup();
