// add comp text to layers

app.beginUndoGroup('rename'); {
    layerRename("ui");
} app.endUndoGroup();

function layerRename(textImp){
    newText=textImp;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        textIter = layerIter + 1;
        sourceName = currentLayer.source.name;
        var myComp;
        for (var i = 1; i <= app.project.numItems; i ++) {
            if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === sourceName)) {
                myComp = app.project.item(i);
                var activeCompName = app.project.activeItem.name;
                textIter = layerIter + 1; 
                myComp.name = activeCompName.substring(1, activeCompName.length - 2) + "_" + newText + "_" + textIter;
            break;
            }
        }
    }
}
