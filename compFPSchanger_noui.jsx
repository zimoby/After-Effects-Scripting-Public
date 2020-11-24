app.beginUndoGroup('fpsChanger123');
    for(var i = 0; i < app.project.selection.length; i++) {
        var activeComp = app.project.selection[i];
        activeComp.frameRate = 30;
    }
app.endUndoGroup();