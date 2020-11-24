function sendToRender(OM_name){
    app.beginUndoGroup('HQ');
    for(var i = 0; i < app.project.selection.length; i++) {
        var activeComp = app.project.selection[i];// = app.project.activeComp;
        if ((activeComp === null) || !(activeComp instanceof CompItem)) {
            alert('Please select or open a composition first.', "123");
        } else {
            var lastRender = 0;
            for (var j=1 ; j <= app.project.renderQueue.numItems ; j++) {
                // alert(app.project.renderQueue.item(j).status)
                curCompName=app.project.renderQueue.item(j).comp.name;
                if ( activeComp.name == curCompName ) { lastRender = j }
            };
            if ( lastRender == 0 ) {
                var rqi = app.project.renderQueue.items.add(activeComp);
                var om = rqi.outputModule(1);
                om.applyTemplate(OM_name);
            } else {
                // alert(app.project.renderQueue.item(lastRender).status)
                if ((app.project.renderQueue.item(lastRender).status == 3017)||(app.project.renderQueue.item(lastRender).status == 3019)) {
                    app.project.renderQueue.item(lastRender).duplicate()
                } else {
                    app.project.renderQueue.item(lastRender).render = true;
                }
            }
        }
    }
    app.endUndoGroup();
}
sendToRender("proress alpha (animation)");
