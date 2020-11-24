var proj = app.project;
var currentProject = app.project;
var currentComp = currentProject.activeItem;
currentComp.openInViewer();
var textArray = new Array();

// var currentLayer = currentComp.selectedLayers[0];

// // var srcText = currentLayer.property("Text").property("Source Text").value;
// srcText = currentLayer.property("Text").property("Source Text").value;
// alert(srcText);
iterArray=0;
for (var layerIter=0; layerIter < currentComp.selectedLayers.length ; layerIter++) {
    currentLayer = currentComp.selectedLayers[layerIter];
    srcText = currentLayer.property("Text").property("Source Text").value;
    textArray[textArray.length]=currentLayer.name.toString() + " " + srcText.toString() + "\n";
    // iterArray=textArray.length+1;
}

alert(textArray);