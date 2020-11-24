app.beginUndoGroup('123');
    setTime=10;
    for(var i = 0; i < app.project.selection.length; i++) {
        var activeComp = app.project.selection[i];// = app.project.activeComp;
        for(var j = 1; j <= activeComp.numLayers; j++) {
            var currentLayer = activeComp.layer(j);
            var statLayLock = "noLocked";
            if ( currentLayer.locked ) {
                statLayLock = "Locked";
                currentLayer.locked = false;
            }
            if ( currentLayer.outPoint >= activeComp.duration ) currentLayer.outPoint = setTime;
            if ( statLayLock == "Locked" ) currentLayer.locked = true;
        }
        activeComp.duration = setTime;
    }
app.endUndoGroup();	