app.beginUndoGroup('frMove'); {
    movelayers("1");
} app.endUndoGroup();

function movelayers(framesNum){
    var frameOffset=framesNum;
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        // var frDur=currentComp.frameDuration;
        // mathOffset = (currentLayer.startTime/frDur+3)*frDur;
        currentLayerStartTime = currentLayer.inPoint;
        offsetNum=0;
        layerNum = layerIter + 1 + offsetNum;
        markerName = "fr" + layerNum;
        var compMarker2 = new MarkerValue(markerName);
        compMarker2.duration = 0;
        currentComp.markerProperty.setValueAtTime(currentLayerStartTime, compMarker2)
        // currentLayer.startTime = mathOffset;
        // alert(currentLayerStartTime)
    };

}

