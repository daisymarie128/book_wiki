var context,
    source,
    buffer,
    url = "";

// Initialise the Audio Context
function init() {
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        throw new Error('Sorry, AudioContext is not supported.');
    }
}

var sounds = {};

var soundFiles = 'I_Have_A_Dream johnson_King MLK_Selma'.split(' ');
for (var i = 0; i < soundFiles.length; i++) {
    playSound(soundFiles[i], true);
}

// Load the Sound with XMLHttpRequest
function playSound(sound, silent) {

    if (! sounds[sound]) {
        var request = new XMLHttpRequest();
        request.open("GET", "sounds/" + sound + ".mp3", true);
        request.responseType = "arraybuffer";

        // Asynchronous callback
        request.onload = function() {
            var data = request.response;
            sounds[sound] = data;
            if (! silent) {
                audioRouting(sounds[sound]);
            }
        };

        request.send();
    } else {
        if (! silent) {
            audioRouting(sounds[sound]);
        }
    }
}

function audioRouting(data) {
    context.decodeAudioData(data, function(buffer){
        source = context.createBufferSource(2, 22050, 44100);
        myBuffer = buffer
        source.buffer = myBuffer;
        source.connect(context.destination);
        source.start(0);
    });
}

function pauseSound(){
    source.stop(context.currentTime)
}

init();

