
var bingClientTTS = new BingSpeech.TTSClient("1f09e238de7842b685c4d4a303ee58f9");

function prompt(message){
    bingClientTTS.synthesize(message);
}


var startBtn, stopBtn, hypothesisDiv, phraseDiv, statusDiv;
var key, languageOptions, formatOptions, recognitionMode, inputSource, filePicker;
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

document.addEventListener("DOMContentLoaded", function () {
    createBtn = document.getElementById("createBtn");
    startBtn = document.getElementById("startBtn");
    stopBtn = document.getElementById("stopBtn");
    phraseDiv = document.getElementById("phraseDiv");
    hypothesisDiv = document.getElementById("hypothesisDiv");
    statusDiv = document.getElementById("statusDiv");
    key = document.getElementById("key");
    languageOptions = document.getElementById("languageOptions");
    formatOptions = document.getElementById("formatOptions");
    inputSource = document.getElementById("inputSource");
    recognitionMode = document.getElementById("recognitionMode");
    filePicker = document.getElementById('filePicker');

    languageOptions.addEventListener("change", Setup);
    formatOptions.addEventListener("change", Setup);
    recognitionMode.addEventListener("change", Setup);

    startBtn.addEventListener("click", function () {
        if (key.value == "" || key.value == "YOUR_BING_SPEECH_API_KEY") {
            alert("Please enter your Bing Speech subscription key!");
            return;
        }
        if (!recognizer || previousSubscriptionKey != key.value) {
                previousSubscriptionKey = key.value;
                Setup();
            }

        hypothesisDiv.innerHTML = "";
        phraseDiv.innerHTML = "";
        RecognizerStart(SDK, recognizer);
        startBtn.disabled = true;
        stopBtn.disabled = false;
                   
    });

    key.addEventListener("focus", function () {
       if (key.value == "YOUR_BING_SPEECH_API_KEY") {
           key.value = "";
       }
    });

    key.addEventListener("focusout", function () {
       if (key.value == "") {
           key.value = "YOUR_BING_SPEECH_API_KEY";
       }
    });

    filePicker.addEventListener("change", function () {
    });

    stopBtn.addEventListener("click", function () {
        RecognizerStop(SDK, recognizer);
        stopBtn.disabled = true;
    });

    Initialize(function (speechSdk) {
        SDK = speechSdk;
        startBtn.disabled = false;
    });
});

// Start the recognition
function RecognizerStart(SDK, recognizer) {
    recognizer.Recognize((event) => {
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
    .On(() => {
        // The request succeeded. Nothing to do here.
    },
    (error) => {
        console.error(error);
    });
}

// Stop the Recognition.
function RecognizerStop(SDK, recognizer) {
    recognizer.AudioSource.TurnOff();
}



function Setup() {
    recognizer = RecognizerSetup(SDK, recognitionMode.value, languageOptions.value, SDK.SpeechResultFormat[formatOptions.value], key.value);
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