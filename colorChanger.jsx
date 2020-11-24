app.beginUndoGroup('color'); {
    COLOR_CHANGER("1");
} app.endUndoGroup();

function COLOR_CHANGER(variativ){
    var varChanger = variativ;
    if (varChanger == "1") {
        colorVar=[1,2,3];
    } else if (varChanger == "2") {
        colorVar=[3,1,2];
    } else {
        colorVar=[2,3,1];
    }
    var currentComp = app.project.activeItem;
    arrayLayers=currentComp.selectedLayers;
    for (var layerIter=0; layerIter < arrayLayers.length ; layerIter++) {
        var currentLayer = arrayLayers[layerIter];
        arrayPropert=currentLayer.selectedProperties;
        for (var propIter=0; propIter < arrayPropert.length ; propIter++) {
            addTempControls(currentLayer);
            textSlider="c1=effect(\"c" + colorVar[0] + "\")(\"Color\");\n" +
            "c2=effect(\"c" + colorVar[1] + "\")(\"Color\");\n" +
            "c3=effect(\"c" + colorVar[2] + "\")(\"Color\");\n" +
            "spd=effect(\"speed\")(\"Slider\");\n" +
            "t=timeToFrames(t = time + thisComp.displayStartTime, fps = 1.0 / thisComp.frameDuration, isDuration = false);\n" +
            "t=Math.round(t/spd);\n" +
            "t2=Math.abs(t)%24+1;\n" +
            "if( t2 >=1 && t2 <=8) value = c3;\n" +
            "if( t2 >=9 && t2 <=16) value = c1;\n" +
            "if( t2 >=17 && t2 <=24) value = c2;\n";
            arrayPropert[propIter].expression = textSlider;
        };
    };
}

function addTempControls(curLayer){
    var currentLayer = curLayer;
    colorArray = [  [255,0,0],
                    [0,255,0],
                    [0,0,255] ];
    if ( ! currentLayer.Effects.property("c1")) {
        for (var i=0 ; i < 3 ; i++) {
            iter= i + 1;
            currentLayer.Effects.addProperty("Color Control"); 
            currentLayer.Effects.property("Color Control").property("Color").setValue(colorArray[i]);
            currentLayer.Effects.property("Color Control").name = "c" + iter;
        };
        currentLayer.Effects.addProperty("Slider Control"); 
        currentLayer.Effects.property("Slider Control").property("Slider").setValue(1);
        currentLayer.Effects.property("Slider Control").name = "speed";
    }
}