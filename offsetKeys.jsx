// app.beginUndoGroup('groupContents'); {
    rd_Scooter_doScoot(10);
// } app.endUndoGroup();

function rd_Scooter_doScoot(scootDist)
	{
		// Check if any work (scooting, options) to be done
		if (scootDist === 0)
			return;
		
		var layerSrc = true;
		var layerInOut = false;
		var layerMarkers = false;
		var kfsNone = false, kfsSelected = false, kfsAll = true;
		
		if (!layerSrc && !layerInOut && !layerMarkers && kfsNone)
		{
			alert(rd_Scooter_localize(rd_ScooterData.strErrNoWorkToDo), rd_ScooterData.scriptName);
			return;
		}
		
		// Check that a project exists
		if (app.project === null)
			return;
		
		// Get the current (active/frontmost) comp
		var comp = app.project.activeItem;
		
		if ((comp === null) || !(comp instanceof CompItem))
		{
			alert(rd_Scooter_localize(rd_ScooterData.strErrNoCompSel), rd_ScooterData.scriptName);
			return;
		}
		
		// If no layers are selected, nothing to do
		if (comp.selectedLayers.length === 0)
		{
			alert(rd_Scooter_localize(rd_ScooterData.strErrNoLayerSel), rd_ScooterData.scriptName);
			return;
		}
		
		// Process each selected layer
		app.beginUndoGroup("asd");
		
		var layers = comp.selectedLayers, layer;
		var offset = scootDist * comp.frameDuration, startTime, stretch;
		
		for (var i=0; i<layers.length; i++)
		{
			layer = layers[i];
			stretch = layer.stretch / 100;
			
			if (layerSrc)						// Moving layer source?
			{
				layer.startTime += offset;
				if (!layerInOut)
				{
					layer.inPoint -= offset;
					
					// Calculate the outPoint, compensating for the stretch value and startTime. Ugh!
					startTime = layer.inPoint - ((layer.inPoint - layer.startTime) / stretch);
					layer.outPoint = layer.outPoint - startTime * stretch;
				}
				
				// If not moving all keyframes, adjust keyframes accordingly
				// Note: Keyframes need to be moved before markers; otherwise, the selected keys get unselected
				if (kfsSelected)
					rd_Scooter_scootSelectedPropGroupKeys(layer, -offset, 0);
				else if (kfsNone)
					rd_Scooter_scootAllPropGroupKeys(layer, -offset);
				
				// If moving layer source, but not markers, adjust markers accordingly
				// if (!layerMarkers)
				// 	rd_Scooter_scootLayerMarkers(layer, -offset)
			}
			else if (layerInOut) 				// Moving layer in/out?
			{
				// layer.inPoint += offset;
				
				// Calculate the outPoint, compensating for the stretch value and startTime. Ugh!
				startTime = layer.inPoint - ((layer.inPoint - layer.startTime) / stretch);
				layer.outPoint = layer.outPoint - startTime * stretch;
			}
			
			// If moving all or some keyframes, adjust accordingly
			// Note: Keyframes need to be moved before markers; otherwise, the selected keys get unselected
			if (!layerSrc)
			{
				if (kfsSelected)
					rd_Scooter_scootSelectedPropGroupKeys(layer, offset, 1);
				else if (kfsAll)
					rd_Scooter_scootAllPropGroupKeys(layer, offset);
			}
			
			if (layerMarkers)					// Moving layer markers?
			{
				// If moving markers, but not layer source, adjust markers accordingly
				if (!layerSrc)
					rd_Scooter_scootLayerMarkers(layer, offset)
			}
		}
		
		app.endUndoGroup();
	}

function rd_Scooter_shiftKeyToNewTime(prop, keyToCopy, offset, keyToRemove)
	{
		// Remember the key's settings before creating the new setting, just in case creating the new key affects keyToCopy's settings
		var inInterp = prop.keyInInterpolationType(keyToCopy);
		var outInterp = prop.keyOutInterpolationType(keyToCopy);
		var keyToCopyValue = prop.keyValue(keyToCopy);
		if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER))
		{
            // alert("True")
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
		// alert(prop.keyTime(keyToCopy) + " " + offset)
		var newTime = prop.keyTime(keyToCopy) + offset;
		// alert(prop.keyTime(keyToCopy))
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
		prop.removeKey(keyToRemove);
	}



function rd_Scooter_scootAllPropGroupKeys(propGroup, offset)
{
	var prop, newTime, newValue, keyIndex;
	
	// Iterate over the specified property group's properties
	for (var i=1; i<=propGroup.numProperties; i++)
	{
		var keyTimes = new Array();
		
		prop = propGroup.property(i);
		if (prop.propertyType === PropertyType.PROPERTY)			// Found a property
		{
			if (prop.matchName === "ADBE Marker")				// Skip markers; they're processed separately
				continue;
			if (!prop.isTimeVarying)							// Skip properties that aren't keyframed
				continue;
			
			// Loop through the property's keyframes in the direction such that new
			// keyframes will not affect the indices of existing keyframes
			if (offset > 0)
			{
				for (var j=prop.numKeys; j>=1; j--)
					rd_Scooter_shiftKeyToNewTime(prop, j, offset, j);
			}
			else
			{
				for (var j=1; j<=prop.numKeys; j++)
					rd_Scooter_shiftKeyToNewTime(prop, j, offset, j+1);
			}
		}
		else if (prop.propertyType === PropertyType.INDEXED_GROUP)	// Found an indexed group, so check its nested properties
			rd_Scooter_scootAllPropGroupKeys(prop, offset);
		else if (prop.propertyType === PropertyType.NAMED_GROUP)	// Found a named group, so check its nested properties
			rd_Scooter_scootAllPropGroupKeys(prop, offset);
	}
}


function rd_Scooter_getSelectedPropGroupKeys(propGroup, whichKeys)
{
	var props = new Array();
	var prop, propInfo;
	
	// Iterate over the specified property group's properties
	for (var i=1; i<=propGroup.numProperties; i++)
	{
		prop = propGroup.property(i);
		if (prop.propertyType === PropertyType.PROPERTY)			// Found a property
		{
			if (prop.matchName === "ADBE Marker")				// Skip markers; they're processed separately
				continue;
			if (!prop.isTimeVarying)							// Skip properties that aren't keyframed
				continue;
			
			propInfo = new Object;
			propInfo.prop = prop;
			propInfo.keyTimes = new Array();
			
			for (var j=1; j<=prop.numKeys; j++)
				if (((whichKeys === 0) && !prop.keySelected(j)) || ((whichKeys === 1) && prop.keySelected(j)))
					propInfo.keyTimes[propInfo.keyTimes.length] = prop.keyTime(j);
			
			// If there were keys to save, add the property and its keys to the props array
			if (propInfo.keyTimes.length > 0)
				props[props.length] = propInfo;
		}
		else if (prop.propertyType === PropertyType.INDEXED_GROUP)	// Found an indexed group, so check its nested properties
			props = props.concat(rd_Scooter_getSelectedPropGroupKeys(prop, whichKeys));
		else if (prop.propertyType === PropertyType.NAMED_GROUP)	// Found a named group, so check its nested properties
			props = props.concat(rd_Scooter_getSelectedPropGroupKeys(prop, whichKeys));
	}
	
	return props;
}



	function rd_Scooter_scootSelectedPropGroupKeys(propGroup, offset, whichKeys)
{
	var props = rd_Scooter_getSelectedPropGroupKeys(propGroup, whichKeys);
	var prop, propKeyTimes, keyIndex;
	
	for (var i=0; i<props.length; i++)
	{
		prop = props[i].prop;
		propKeyTimes = props[i].keyTimes;
		
		
		// Loop through the property's keyframes in the direction such that new
		// keyframes will not affect the indices of existing keyframes
		if (offset > 0)
		{
			for (var j=propKeyTimes.length-1; j>=0; j--)
			{
				keyIndex = prop.nearestKeyIndex(propKeyTimes[j]);
				rd_Scooter_shiftKeyToNewTime(prop, keyIndex, offset, keyIndex);
			}
		}
		else
		{
			for (var j=0; j<propKeyTimes.length; j++)
			{
				keyIndex = prop.nearestKeyIndex(propKeyTimes[j]);
				rd_Scooter_shiftKeyToNewTime(prop, keyIndex, offset, keyIndex+1);
			}
		}
	}
}