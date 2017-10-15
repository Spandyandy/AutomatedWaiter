
var bingClientTTS = new BingSpeech.TTSClient("1f09e238de7842b685c4d4a303ee58f9");

function prompt(message){
    startMic();
    bingClientTTS.synthesize(message);
    stopMic();
}

var startBtn = document.getElementById('start'), stopBtn = document.getElementById('stop'),
    hypothesisDiv, phraseDiv, statusDiv;
var key, formatOptions, recognitionMode, inputSource, filePicker;
var SDK;
var recognizer;
var previousSubscriptionKey;

function Initialize(onComplete) {
    require(["Speech.Browser.Sdk"], function(SDK) {
        onComplete(SDK);
    });
}

function RecognizerSetup(SDK, recognitionMode, language, format, subscriptionKey) {

    recognitionMode = SDK.RecognitionMode.Dictation;

    var recognizerConfig = new SDK.RecognizerConfig(
        new SDK.SpeechConfig(
            new SDK.Context(
                new SDK.OS(navigator.userAgent, "Browser", null),
                new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
        recognitionMode, language, format);

    var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);

    var files = document.getElementById('filePicker').files;
    if (!files.length) {
        return SDK.CreateRecognizer(recognizerConfig, authentication);
    } else {
        return SDK.CreateRecognizerWithFileAudioSource(recognizerConfig, authentication, files[0]);
    }
}

function startMic() {
    if (!recognizer || previousSubscriptionKey != '1f09e238de7842b685c4d4a303ee58f9') {
        previousSubscriptionKey = '1f09e238de7842b685c4d4a303ee58f9';
        Setup();
    }

    hypothesisDiv.innerHTML = "";
    phraseDiv.innerHTML = "";
    RecognizerStart(SDK, recognizer);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});



function stopMic() {
    RecognizerStop(SDK, recognizer);
    stopBtn.disabled = true;
}


Initialize(function (speechSdk) {
    SDK = speechSdk;
    startBtn.disabled = false;
});

// Start the recognition
function RecognizerStart(SDK, recognizer) {
    recognizer.Recognize(function(event) {
        switch (event.Name) {
    case "RecognitionTriggeredEvent" :
        UpdateStatus("Initializing");
        break;
    case "ListeningStartedEvent" :
        UpdateStatus("Listening");
        break;
    case "RecognitionStartedEvent" :
        UpdateStatus("Listening_Recognizing");
        break;
    case "SpeechStartDetectedEvent" :
        UpdateStatus("Listening_DetectedSpeech_Recognizing");
        console.log(JSON.stringify(event.Result));
        break;
    case "SpeechHypothesisEvent" :
        UpdateRecognizedHypothesis(event.Result.Text, false);
        console.log(JSON.stringify(event.Result));
        break;
    case "SpeechFragmentEvent" :
        UpdateRecognizedHypothesis(event.Result.Text, true);
        console.log(JSON.stringify(event.Result));
        break;
    case "SpeechEndDetectedEvent" :
        OnSpeechEndDetected();
        UpdateStatus("Processing_Adding_Final_Touches");

        console.log(JSON.stringify(event.Result));
        break;
    case "SpeechSimplePhraseEvent" :
        UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
        break;
    case "SpeechDetailedPhraseEvent" :
        UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
        break;
    case "RecognitionEndedEvent" :
        OnComplete();
        UpdateStatus("Idle");
        console.log(JSON.stringify(event));
        break;
    default:
        console.log(JSON.stringify(event));
    }
})
.On(function() {
        // The request succeeded. Nothing to do here.
    },
    function(error) {
        console.error(error);
    });
}

function RecognizerStop(SDK, recognizer) {
    recognizer.AudioSource.TurnOff();
}

function Setup() {
    recognizer = RecognizerSetup(SDK, recognitionMode.value, "en-US", SDK.SpeechResultFormat[formatOptions.value], key.value);
}

function UpdateStatus(status) {
    statusDiv.innerHTML = status;
}

function UpdateRecognizedHypothesis(text, append) {
    if (append)
        hypothesisDiv.innerHTML += text + " ";
    else
        hypothesisDiv.innerHTML = text;

    var length = hypothesisDiv.innerHTML.length;
    if (length > 403) {
        hypothesisDiv.innerHTML = "..." + hypothesisDiv.innerHTML.substr(length-400, length);
    }
}

function OnSpeechEndDetected() {
    stopBtn.disabled = true;
}

function UpdateRecognizedPhrase(json) {
    hypothesisDiv.innerHTML = "";
    phraseDiv.innerHTML += json + "\n";
    returnValue(json);
}

function returnValue(json) {
    var t = JSON.parse(json);
    return t['DisplayText'];
}

function OnComplete() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
}