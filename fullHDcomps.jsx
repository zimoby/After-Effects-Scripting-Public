app.beginUndoGroup('CompIncrem123');
    getCompsNames();
    comp2fullHD(compsArray);
app.endUndoGroup();	

function comp2fullHD(var1){
    var arraylength=var1.length;
    for(var i = 0; i < arraylength; i++) {
        var activeComp = var1[i];
        activeComp.width = 1920;
        activeComp.height = 1080;
    }
}

function getCompsNames() {
    compsArray=app.project.selection;
    return compsArray;
}