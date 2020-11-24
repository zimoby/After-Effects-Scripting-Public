app.beginUndoGroup('setparent');
    getCompsNames();
    setParent(compsArray);
app.endUndoGroup();	

function setParent(var1){
    layersArray = var1;
    var arraylength=layersArray.length;
    for(var i = 0; i < arraylength; i++) {
        var activeComp = layersArray[i];
        // activeComp.name += "_1";
        // incremVal=i+1;
        // prevName = activeComp.name;
        // activeComp.name = "fr" + incremVal.toString() + "_1";
        // activeComp.name += "_1";
        app.project.item(index).layer(index).setParentWithJump([newParent]) 
    }
}

function getCompsNames() {
    compsArray=app.project.selection;
    return compsArray;
}