app.beginUndoGroup('groupShapes'); {
    sortingLayers = sortingInstance("all"); //"all" "ShapeLayer"
    GROUP_SHAPES("fr4_manL_legR", sortingLayers);
} app.endUndoGroup();

function GROUP_SHAPES(textImp, sortLay){
    newText=textImp;
    var filteredLayers = sortLay;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < filteredLayers.length ; layerIter++) {
        var currentLayer = filteredLayers[layerIter];
        layerName=currentLayer.name;
        prevName = currentLayer.name;
        textIter = layerIter + 1;
        arrayPropert=currentLayer.selectedProperties;
        // if (arrayPropert.length > 0){
            currentLayer.selected = false;

            // var myContents = currentLayer.property("ADBE Root Vectors Group");
            // currentLayer.selected = false;
            // for (var i = 1; i <= myContents.numProperties; i++){
            //     myContents.property(i).selected = true;
            // }
            var curContents = currentLayer.property("ADBE Root Vectors Group");
            // alert(curContents.numProperties)
            if ( curContents.numProperties == 1 ) {
                BREAK_GROUP(curContents, currentLayer);
            }
            // alert(curContents.numProperties)
            currentLayer.selected = false;
            for (var i = 1; i <= curContents.numProperties; i++){
                curContents.property(i).selected = true;
                app.executeCommand(3741);
                currentLayer.selected = false;

            }
            // // for (var propIter=1; propIter <= arrayPropert.length ; propIter++) {
            //     // curContents.property(propIter).selected = true;
            //     app.executeCommand(3741);
            //     currentLayer.selected = false;
            // // }
        // } else {

        // }
    }
}
function BREAK_GROUP(inContents, inLayer){
    currentLayer=inLayer;
    curContents=inContents;
    if (curContents.numProperties == 1) {
        // alert("yes")
        curContents.property(1).selected = true;
        app.executeCommand(3742);
    }
    return curContents = currentLayer.property("ADBE Root Vectors Group");

    
}
function sortingInstance(inst){
    var instLayer=inst;
    var currentComp = app.project.activeItem;
    var arrayLayers=currentComp.selectedLayers;
    var sortingLayers=[];
    if (instLayer != "all") {
        for (var i in arrayLayers) {
            if (arrayLayers[i] instanceof ShapeLayer) sortingLayers.push(arrayLayers[i]);
        };
    } else{
        sortingLayers = arrayLayers;
    }
    return sortingLayers;
}

