app.beginUndoGroup('CompIncrem');
    getCompsNames();
    nameIncrement(compsArray);
app.endUndoGroup();	

function nameIncrement(var1){
    var arraylength=var1.length;
    for(var i = 0; i < arraylength; i++) {
        var activeComp = var1[i];
        // activeComp.name += "_1";
        // incremVal=i+1;
        // prevName = activeComp.name;
        // activeComp.name = "fr" + incremVal.toString() + "_1";
        activeComp.name += "_1";
    }
}

function getCompsNames() {
    compsArray=app.project.selection;
    return compsArray;
    
}