app.beginUndoGroup('CompIncrem');
    onScaleClick("1.25");
app.endUndoGroup();	

function onScaleClick(scF)
    {
        compsArray = app.project.selection;
        var arraylength = compsArray.length;
        scale_factor = scF;


        for(var i = 0; i < arraylength; i++) {

            var ui_activeItem = compsArray[i];

            if ((ui_activeItem == null) || !(ui_activeItem instanceof CompItem)) {
                alert("Please select or open a composition first.", scriptName);
            } else {
                
                var activeComp = ui_activeItem;
                             
                // Create a null 3D layer.
                var null3DLayer = ui_activeItem.layers.addNull();
                null3DLayer.threeDLayer = true;
                
                // Set its position to (0,0,0).
                null3DLayer.position.setValue([0,0,0]);
                
                // Set null3DLayer as parent of all layers that don't have parents.  
                makeParentLayerOfAllUnparented(activeComp, null3DLayer);
                
                // Set new comp width and height.
                activeComp.width  = Math.floor(activeComp.width * scale_factor);
                activeComp.height = Math.floor(activeComp.height * scale_factor);
                
                // Set the scale of the super parent null3DLayer proportionately.
                var superParentScale = null3DLayer.scale.value;
                superParentScale[0] = superParentScale[0] * scale_factor;
                superParentScale[1] = superParentScale[1] * scale_factor;
                superParentScale[2] = superParentScale[2] * scale_factor;
                null3DLayer.scale.setValue(superParentScale);
                
                // Delete the super parent null3DLayer with dejumping enabled.
                null3DLayer.remove();
    
            }
        }
    }
function makeParentLayerOfAllUnparented(theComp, newParent)
{
for (var i = 1; i <= theComp.numLayers; i++) {
    var curLayer = theComp.layer(i);
    var wasLocked = curLayer.locked;
    curLayer.locked = false;
    if (curLayer != newParent && curLayer.parent == null) {
        curLayer.parent = newParent;
    }
    curLayer.locked = wasLocked
}
}