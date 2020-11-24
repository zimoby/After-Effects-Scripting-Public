// add comp text to layers

app.beginUndoGroup('rename'); {
    sortingLayers = sortingInstance("all"); //"all" "ShapeLayer"
    layerRename("fr4_manL_legR", sortingLayers);
} app.endUndoGroup();

function layerRename(textImp, sortLay){
    newText=textImp;
    var filteredLayers = sortLay;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    var blockCounter = 1;
    for (var layerIter=0; layerIter < filteredLayers.length ; layerIter++) {
        if (layerIter%2 == 1) blockCounter++;
        var currentLayer = filteredLayers[layerIter];
        layerName=currentLayer.name;
        prevName = currentLayer.name;
        
        textIter = layerIter + 1;
        arrayPropert=currentLayer.selectedProperties;
        if (arrayPropert.length > 0){
            for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
                textPropIter = propIter + 1;
                prevPropName=arrayPropert[propIter].name;
                // nameArray={"head", "body"};
                if (propIter == 0){
                    arrayPropert[propIter].name = layerName + "_" + "head";            
                } else if (propIter == 1){
                    arrayPropert[propIter].name = layerName + "_" + "body";         
                } else if (propIter == 2){
                    arrayPropert[propIter].name = layerName + "_" + "handL";         
                } else if (propIter == 3){
                    arrayPropert[propIter].name = layerName + "_" + "handR";         
                } else if (propIter == 4){
                    arrayPropert[propIter].name = layerName + "_" + "legL";         
                } else if (propIter == 5){
                    arrayPropert[propIter].name = layerName + "_" + "legR";         
                }
                
                // arrayPropert[propIter].name = layerName + " " + newText +  textPropIter.toString();
                // arrayPropert[propIter].name = prevPropName + newText;
            }
        } else {
            currentLayer.name = layerName + "_" + newText;  
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
}