app.beginUndoGroup('clEff'); {
    setLabelFromUpDown("Up");
} app.endUndoGroup();

function setLabelFromUpDown(side){
    setLabelFrom=side;
    var currentComp = app.project.activeItem;
    var arrayLayers = currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        currentIndex=currentLayer.index;
        var correctIndex="0";
        if (setLabelFrom == "Up") {
            correctIndex=-1;
        } else if (setLabelFrom == "Down") {
            correctIndex=1; 
        }
        setLabel=currentComp.layer(currentIndex + correctIndex).label
        alert(setLabel)
        currentLayer.label = setLabel;
    };
}