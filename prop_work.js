app.beginUndoGroup('var'); {
    var removeUnused = "True";
    createVar(removeUnused);
} app.endUndoGroup();

function createVar(removeUnused){
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        
        scanPropGroupProperties(currentLayer, currentComp, currentLayer, removeUnused);
    }
}

function scanPropGroupProperties(propGroup, comp, lay, removeUnused)
{   
    var curComp = comp;
    var i, prop;
    var propNum = propGroup.numProperties;
    
    for (i=1; i<=propNum; i++)
    {
        var pass = "True";
        prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY)    // Found a property
        {
            if (prop.name == "Stroke Width") {
                expr = addControlSolid2(curComp, prop.value, lay);
                prop.expression = "thisComp.layer(\"paramSolid\")(\"Effects\")(\"" + expr + "\")(\"Slider\")";
            }
        }
        else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP))
        {
            if (pass = "True"){
                scanPropGroupProperties(prop, curComp, lay, removeUnused);
            }
        }
    }
}


function addControlSolid2(comp, propWidth, lay){
    var curComp = comp;
    var compW = curComp.width;
    var compH = curComp.height;
    var pass = "yes"; 

    if ( ! curComp.layer("paramSolid") ) {
        var paramSolid = curComp.layers.addSolid([0,0,0], "paramSolid", compW, compH, 1);
    } else {
        paramSolid = curComp.layer("paramSolid");
    }

    if ( paramSolid.Effects.numProperties > 0) {
        for (i=1; i<=paramSolid.Effects.numProperties; i++) {
            var curWidth = paramSolid.Effects(i).property(1).value;
            var curWidthName = paramSolid.Effects(i).name;
            if (curWidth > 0) {
    
                if ( curWidth.toString() == propWidth.toString() ){
                    pass = "no";
                    return curWidthName;
                    break;
                }
            }
        }
    }

    if (pass == "yes") {
        paramSolid.Effects.property("Slider Control") ? 0 : paramSolid.Effects.addProperty("Slider Control"); 
        nm = "Width " + " " + paramSolid.Effects.numProperties;
        paramSolid.Effects.property("Slider Control").name = nm;
        paramSolid.Effects.property(nm).property("Slider").setValue(propWidth);
        paramSolid.enabled = false;
        return nm;
    } 
}
