// add comp text to layers

app.beginUndoGroup('rename'); {
    // layerRename("li");
    sortingLayers = sortingInstance("all"); //"all" "ShapeLayer"
    layerRename("fr6_handL_", sortingLayers);
} app.endUndoGroup();

function layerRename(textImp, sortLay){
    newText=textImp;
    var filteredLayers = sortLay;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    var blockCounter = 1;
    // alert(filteredLayers)
    for (var layerIter=0; layerIter < filteredLayers.length ; layerIter++) {
        // alert(arrayLayers.length);
        if (layerIter%2 == 1) blockCounter++;
        var currentLayer = filteredLayers[layerIter];
        layerName=currentLayer.name;
        prevName = currentLayer.name;
        textIter = layerIter + 1;
        arrayPropert=currentLayer.selectedProperties;
        if (arrayPropert.length > 0){
            for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
                textPropIter = propIter + 1;
                arrayPropert[propIter].name = newText + textPropIter.toString();
            }
        } else {
            // currentLayer.name = layerName + " " + newText;  

            currentLayer.name = newText + textIter.toString(); 
            // currentLayer.name = newText + prevName;
            // currentLayer.name = newText;
            // currentLayer.name = prevName + "stroke" + textIter.toString();

            // blockCounter2 = blockCounter - 1;
            // if (textIter%2 == 1) {
            //     currentLayer.name = newText + blockCounter.toString()+ "_shadow";
            //     } else {
            //     currentLayer.name = newText + blockCounter2.toString() ;
            // }
        }
    };
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
    // alert(sortingLayers)
}