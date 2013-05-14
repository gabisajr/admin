//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

/// <reference path="base-sdk.js" />


(function () {
    var audtag = null;
    var mediaControl;
    var isPlaying;

    function id(elementId) {
        return document.getElementById(elementId);
    }

    function scenario1DoSomething() {
        // Create new audio tag for "media" class
        if(!audtag) {
          audtag = document.createElement('audio');
          audtag.setAttribute("id", "audtag");
          audtag.setAttribute("controls", "true");
          audtag.setAttribute("msAudioCategory", "backgroundcapablemedia");
          audtag.setAttribute("src", "folk_rock.mp3");
          document.getElementById("scenario1Output").appendChild(audtag);
          audtag.load();
        }
    }

    function scenario2DoSomething() {
        // Create new audio tag for "communication" class
        if(!audtag) {
          audtag = document.createElement('audio');
          audtag.setAttribute("id", "audtag");
          audtag.setAttribute("controls", "true");
          audtag.setAttribute("msAudioDeviceType", "communications");
          audtag.setAttribute("msAudioCategory", "communications");
          audtag.setAttribute("src", "folk_rock.mp3");
          document.getElementById("scenario2Output").appendChild(audtag);
          audtag.load();
        }
    }

    function initialize() {
        // Add any initialization code here

        id("scenario1Open").addEventListener("click", scenario1DoSomething, false);
        id("scenario2Open").addEventListener("click", scenario2DoSomething, false);
        id("scenarios").addEventListener("change", onScenarioChanged, false);


        // Create the media control.
        var mediaControl = Windows.Media.MediaControl;
        // Add event listeners for PBM notifications to illustrate that app is
        // losing/gaining focus, and then pass the audio tag along to the function
        mediaControl.addEventListener("soundlevelchanged", soundLevelChanged, false);
    }


    function onScenarioChanged() {
        // Do any necessary clean up on the output, the scenario id
        // can be obtained from sdkSample.scenarioId.
        sdkSample.displayStatus("");

        if (audtag) {          
            parentNode = document.getElementById("audtag").parentNode;
            parentNode.removeChild(document.getElementById("audtag"));
        }
        audtag = null;
    }

    function getTimeStampedMessage(eventCalled) {
        var timeformat = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("longtime");
        var time = timeformat.format(new Date());    

        message = eventCalled + "\t\t" + time;
        return message;
    }

    function soundLevelChanged() {
        var soundLevel = Windows.Media.MediaControl.soundLevel;

        statusMessagesFunc(soundLevel);
        if (soundLevel !== Windows.Media.SoundLevel.muted) {
            appUnmuted();
        } else {
            appMuted();
        }
    }

    function appMuted() {
        var Focus = 1;

        if (audtag) {
            if (!audtag.paused) {
                isPlaying = true;
                audtag.pause();
            } else {
                isPlaying = false;
            }

            statusMessagesFunc(Focus);
        }
    }

    function appUnmuted() {
        var Focus = 2;
        
        if (audtag) {
            if (isPlaying) {
                audtag.play();
            }

          statusMessagesFunc(Focus);
        }
    }

    document.addEventListener("DOMContentLoaded", initialize, false);
    
})();
