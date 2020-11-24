var proj = app.project;
var curProject = app.project;
var currentComp = app.project.activeItem;

app.beginUndoGroup('groupContents'); {
    groupContents();
} app.endUndoGroup();

function groupContents(){
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            
        };
    };
}