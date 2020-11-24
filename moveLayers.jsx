// function mds_seqLayers(){
   app.beginUndoGroup('mds_seqLayers');
       var offset = 5;
       var curComp = app.project.activeItem;
       if ((curComp != null) || (curComp instanceof CompItem)) {  
           var selLayers = curComp.selectedLayers;
           var numSelLayers = selLayers.length;
           var frDur = curComp.frameDuration;
           for (var iter = 0; iter < numSelLayers ; iter++) {
               var curLayer = selLayers[iter];
                curLayer.startTime += iter*frDur*offset;
           };
       } else {
           alert("Please select layers to offset");
       }
   app.endUndoGroup();
// }

// mds_seqLayers();

// function mds_seqLayers(){
//     app.beginUndoGroup('mds_seqLayers');
//         var curComp = app.project.activeItem;
        
//         if ( !checkErrors(curComp) ) {
//             var frDur = curComp.frameDuration;
//             var selLayers = curComp.selectedLayers;
//             var numSelLayers = selLayers.length;
//             alert(selLayers);
//             var offset = 2;
//             // alert(numSelLayers);
//             for (var iter = numSelLayers - 1; iter >= 0 ; iter--) {
//                 var curLayer = selLayers[iter];
//                 // alert(iter);
//                 curLayer.startTime += iter*frDur*offset;
//             }
//         } 
//     app.endUndoGroup();
// }


// function checkErrors (comps) {
//     var checkSel = comps;
//     if ((checkSel == null) || !(checkSel instanceof CompItem)) {
//         alert("Please select layers to offset");

//     } else {
//         return true;
//     }
//     return false;

// }

// mds_seqLayers();

// function mds_seqLayers(){
//     app.beginUndoGroup('mds_seqLayers');
//         var curComp = app.project.activeItem;
//         if ((curComp != null) || (curComp instanceof CompItem)) {
//             var frDur = curComp.frameDuration;
//             var selLayers = curComp.selectedLayers;
//             var numSelLayers = selLayers.length;
//             var offset = 2;
//             for (var iter = numSelLayers - 1; iter >= 0 ; iter--) {
//                 var curLayer = selLayers[iter];
//                 curLayer.startTime += iter*frDur*offset;
//             }
//         } else {
//             alert("Please select layers to offset");
//         }
//     app.endUndoGroup();
// }

// mds_seqLayers();

// function mds_seqLayers(){
//     app.beginUndoGroup('mds_seqLayers');
//         var curComp = app.project.activeItem;
//         var frDur=curComp.frameDuration;
//         var selLayers = curComp.selectedLayers;
//         var numSelLayers = selLayers.length;
//         var offset = 2;
//         for (var iter = 0; iter < numSelLayers ; iter++) {
//             var curLayer = selLayers[iter];
//             curLayer.startTime += iter*frDur*offset;
//         };
//     app.endUndoGroup();
// }

// mds_seqLayers();


// function mds_seqLayers(){
//     app.beginUndoGroup('mds_seqLayers');
//         var curComp = app.project.activeItem;
//         var selLayers = curComp.selectedLayers;
        
//         var offset = 3;
//         for (var iter=0; iter < selLayers.length ; iter++) {
            // var offRnd = Math.round(generateRandomNumber()*offset);
            // alert(offRnd);
            // var curLayer = selLayers[iter];
            // var frDur = curComp.frameDuration;
            // curLayer.startTime = offRnd*frDur;
//         };
//     app.endUndoGroup();
// }

// mds_seqLayers();