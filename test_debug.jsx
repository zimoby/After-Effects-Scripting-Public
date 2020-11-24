app.beginUndoGroup('vampRnd'); {
    createVampRnd();
} app.endUndoGroup();


function createVampRnd(){
    currentComp = app.project.activeItem;
    ampRndrayLayers=currentComp.selectedLayers;
    var sortingLayers = [];
    for ( layerIter=0; layerIter < ampRndrayLayers.length ; layerIter++) {
        currentLayer = ampRndrayLayers[layerIter];

        // alert(currentLayer.content(1).content(3).name)
        ampRndrayPropert=currentLayer.selectedProperties;
        for (propIter=0; propIter < ampRndrayPropert.length ; propIter++) {
            
            // valueProp=ampRndrayPropert[propIter].propertyGroup(3).propertyGroup(1).numProperties
            
            // valueProp=ampRndrayPropert[propIter].propertyGroup(1).name

            // valueProp2=ampRndrayPropert[propIter].propertyGroup(1).propertyIndex

            valueProp1=ampRndrayPropert[propIter].propertyIndex;
            valueProp2=ampRndrayPropert[propIter].name;
            valueProp="\"" + valueProp2 + "\"" + " - index: " + valueProp1 + "\n";

            sortingLayers.push(valueProp);

            // valueProp=ampRndrayPropert[propIter].propertyGroup(2).propertyGroup(1).propertyIndex

            // thisProperty.propertyGroup(1).numProperties

            // alert(valueProp2 + " index: " +  valueProp)


            // addTempControls(currentLayer, ampRndrayPropert[propIter], propIter, valueProp);
            // textSlider="value+effect(\"" + getText + "\")(\"Slider\")";
            // ampRndrayPropert[propIter].expression += textSlider;
        };
    };
    alert(sortingLayers)
    // for (var i=0, len=sortingLayers.length; i < len ; i++) {
    //   alert(sortingLayers)
    // };
    
}


