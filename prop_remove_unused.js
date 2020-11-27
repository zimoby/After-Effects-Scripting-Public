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
    var pass = "True"
    var propNum = propGroup.numProperties;
    // Iterate over the specified property group's properties
    // alert(propGroup.name);
    for (i=1; i<=propNum; i++)
    {
        prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY)    // Found a property
        {
            // Found a property
            // FYI: layer markers have a prop.matchName = "ADBE Marker"
        }
        else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP))
        {
            if ((prop.matchName == "ADBE Vector Graphic - Stroke") || (prop.matchName == "ADBE Vector Graphic - Fill")) {
                // alert(prop.name)
                if ((prop.enabled == false) && (removeUnused == "True")) {
                    // alert("found"); 
                    prop.remove();
                    pass = "False";
                    i--;
                    propNum--;
                    prop = propGroup.property(i);
                    // alert(prop.name)
                    // break;
                    // scanPropGroupProperties(prop, curComp, lay, removeUnused);
                    
                }    
            }
            // Found an indexed or named group, so check its nested properties
            // alert(pass);
            if (pass = "True"){
                scanPropGroupProperties(prop, curComp, lay, removeUnused);
            }
        }
    }
}

