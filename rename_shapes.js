app.beginUndoGroup('rename'); {
    var sortingType = "all"; // shapes
    var newShapeName = "handL"
    var copyLayerName = true;
    var numbering = true;
    var sortingLayers = sortingInstance(sortingType);
    layerRename(newShapeName, sortingLayers, copyLayerName, numbering);
} app.endUndoGroup();

function layerRename(textImp, sortLay, copyLayerName, numbering){
    var textIter = "";
    var textPropIter = "";
    var layerName = "";
    var currentLayer;
    var newText = textImp;
    var filteredLayers = sortLay;
    for (var layerIter = 0; layerIter < filteredLayers.length ; layerIter++) {
        currentLayer = filteredLayers[layerIter];
        layerName = currentLayer.name;
        numbering == true ? textIter = "_" + (layerIter + 1) : textIter = "";
        var arrayProperty = currentLayer.selectedProperties;
        if (arrayProperty.length > 0){
            for (var propIter = 0; propIter < arrayProperty.length ; propIter++) {
                numbering == true ? textPropIter = "_" + (propIter + 1) : textPropIter = "";
                if (copyLayerName == true) {
                    arrayProperty[propIter].name = layerName + "_" + newText + textPropIter;
                } else {
                    arrayProperty[propIter].name += "_" + newText + textPropIter;
                }
            }
        } else {
            currentLayer.name = layerName + "_" + newText + textIter;  
        }
    };
}
function sortingInstance(inst){
    var instLayer = inst;
    var currentComp = app.project.activeItem;
    var arrayLayers = currentComp.selectedLayers;
    var sortingLayers = [];
    if (instLayer == "shapes") {
        for (var i in arrayLayers) {
            if (arrayLayers[i] instanceof ShapeLayer) sortingLayers.push(arrayLayers[i]);
        };
    } else{
        sortingLayers = arrayLayers;
    }
    return sortingLayers;
}