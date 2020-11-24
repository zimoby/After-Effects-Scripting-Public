app.beginUndoGroup('asd'); {
    globOffset(10);
} app.endUndoGroup();

function globOffset(frames)
    {
        var comp = app.project.activeItem;
        var layers = comp.selectedLayers;
        var offset = frames * comp.frameDuration;
        var layer;
    
        for (var i=0; i<layers.length; i++)
		{
            layer = layers[i];
            stretch = layer.stretch / 100;

            korTime = 0;

            layerOffset(layer, offset, korTime);
            if (layer.source instanceof CompItem){
                var korTime = layer.inPoint - ((layer.inPoint - layer.startTime) / stretch);
                findComps(layer, offset, korTime);
            }
        }
    }

function layerOffset(layer, offset, korTime) {

    var comp = app.project.activeItem;
    var korTimeX = layer.inPoint - ((layer.inPoint - layer.startTime) / stretch);

    if (layer.source instanceof CompItem){
        if (layer.inPoint > layer.time + korTime) {
            layer.startTime += offset;
        } else {
            findKeys(layer, offset, korTime);
        }
    } else {
        if (layer.outPoint > layer.time + korTime) {
            lon = layer.outPoint - layer.inPoint;
            // alert("inPo: " + layer.inPoint + "\n" + "outPo: " + layer.outPoint + "\nstartTim" + layer.startTime + "\n" + offset);
            layer.startTime += offset;
            layer.inPoint -= offset;
            layer.outPoint = layer.inPoint + lon + offset;
            // alert("inPo: " + layer.inPoint + "\n" + "outPo: " + layer.outPoint + "\nstartTim" + layer.startTime + "\n" + offset);
            findKeys(layer, offset, korTime);
        }
    }




    // WORKING WITHOUT GRADS
 
    // if (layer.inPoint > layer.time + korTime) {
    //     layer.startTime += offset;
    // } else {
    //     findKeys(layer, offset, korTime);
    // }


    // if ((layer.inPoint < layer.time) && (layer.outPoint > layer.time))
    //     layer.outPoint += offset;   

}

function findKeys(propGroup, offset, korTime)
{
    var prop;
    
    for (var i=1; i<=propGroup.numProperties; i++)
    {
        prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY)
		{
            if (!prop.isTimeVarying)							// Skip properties that aren't keyframed
                continue;
            if (prop.propertyValueType == 6412) {
                continue;
            } 
            // if (offset > 0) {
            for (var j=prop.numKeys; j>=1; j--) {
                // alert(prop.keyTime(j) + "\n" + propGroup.time);
                offsetKeys(prop, j, -offset, j, korTime);
            }
            // }
            // } else {
            //     for (var j=1; j<=prop.numKeys; j++) {
            //         offsetKeys(prop, j, offset, j+1, korTime);
            //     }
            // }
        }
        else if (prop.propertyType === PropertyType.INDEXED_GROUP)	// Found an indexed group, so check its nested properties
			findKeys(prop, offset, korTime);
		else if (prop.propertyType === PropertyType.NAMED_GROUP)	// Found a named group, so check its nested properties
			findKeys(prop, offset, korTime);
    }
}

function findComps(layer, offset, korTime)
{
    var proj = app.project;
    var target;
    var stretch = layer.stretch / 100;

    var compIdCheck = proj.itemByID(layer.source.id);

    for (var j = 1; j <= compIdCheck.numLayers; j++){

        var layers2 = compIdCheck.layer(j);
        layerOffset(layers2, offset, korTime);
        if (layers2.source instanceof CompItem){
            var korTime2 = layers2.inPoint - ((layers2.inPoint - layers2.startTime) / stretch);
            findComps(layers2, offset, korTime2);
        }
    }
}


function offsetKeys(prop, keyToCopy, offset, keyToRemove, korTime)
	{
        // alert(offset);
        var curTime = app.project.activeItem.time - korTime;

		// Remember the key's settings before creating the new setting, just in case creating the new key affects keyToCopy's settings
		var inInterp = prop.keyInInterpolationType(keyToCopy);
        var outInterp = prop.keyOutInterpolationType(keyToCopy);
        var keyToCopyValue = prop.keyValue(keyToCopy);
        
		if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER))
		{
			var tempAutoBezier = prop.keyTemporalAutoBezier(keyToCopy);
			var tempContBezier = prop.keyTemporalContinuous(keyToCopy);
		}
		if (outInterp !== KeyframeInterpolationType.HOLD)
		{
			var inTempEase = prop.keyInTemporalEase(keyToCopy);
			var outTempEase = prop.keyOutTemporalEase(keyToCopy);
		}
		if ((prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL))
		{
			var spatAutoBezier = prop.keySpatialAutoBezier(keyToCopy);
			var spatContBezier = prop.keySpatialContinuous(keyToCopy);
			var inSpatTangent = prop.keyInSpatialTangent(keyToCopy);
			var outSpatTangent = prop.keyOutSpatialTangent(keyToCopy);
			var roving = prop.keyRoving(keyToCopy);
		}
		// Create the new keyframe
        if (prop.keyTime(keyToCopy) > curTime) {
            var newTime = prop.keyTime(keyToCopy) + offset;
        } else {
            var newTime = prop.keyTime(keyToCopy);
        }

		var newKeyIndex = prop.addKey(newTime);
		prop.setValueAtKey(newKeyIndex, keyToCopyValue);
		
		if (outInterp !== KeyframeInterpolationType.HOLD)
		{
			prop.setTemporalEaseAtKey(newKeyIndex, inTempEase, outTempEase);
		}
		
		// Copy over the keyframe settings
		prop.setInterpolationTypeAtKey(newKeyIndex, inInterp, outInterp);
		
		if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER) && tempContBezier)
		{
			prop.setTemporalContinuousAtKey(newKeyIndex, tempContBezier);
			prop.setTemporalAutoBezierAtKey(newKeyIndex, tempAutoBezier);		// Implies Continuous, so do after it
		}
		
		if ((prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL))
		{
			prop.setSpatialContinuousAtKey(newKeyIndex, spatContBezier);
			prop.setSpatialAutoBezierAtKey(newKeyIndex, spatAutoBezier);		// Implies Continuous, so do after it
			prop.setSpatialTangentsAtKey(newKeyIndex, inSpatTangent, outSpatTangent);
			prop.setRovingAtKey(newKeyIndex, roving);
		}
		
        // Remove the old keyframe
        if (prop.keyTime(keyToCopy) > curTime)
		    prop.removeKey(keyToRemove);
	}