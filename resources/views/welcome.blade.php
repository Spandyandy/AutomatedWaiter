<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>WebcamJS Test Page</title>
    <style type="text/css">
        body {
            font-family: Helvetica, sans-serif;
        }

        h2, h3 {
            margin-top: 0;
        }

        form {
            margin-top: 15px;
        }

        form > input {
            margin-right: 15px;
        }

        #results {
            float: right;
            margin: 20px;
            padding: 20px;
            border: 1px solid;
            background: #ccc;
        }
    </style>

    <script type="text/javascript" src="{{asset('js/webcam.js')}}"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="{{asset('js/api.js')}}"></script>
    <script src="{{asset('js/main.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.min.js"></script>
    <script src="{{asset("js/BingSpeech.js")}}"></script>
    <script src="{{asset("js/speech.browser.sdk.js")}}"></script>
    <script src="{{asset('js/Sample.js')}}"></script>


</head>
<body>
<div id="results">Your captured image will appear here...</div>

<h1>Image Capture Test Page</h1>

<div id="my_camera"></div>

<!-- First, include the Webcam.js JavaScript Library -->

<!-- Configure a few settings and attach camera -->
<script language="JavaScript">
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
    Webcam.attach('#my_camera');
</script>

<button onclick="stopInterval()" id="stop">Stop your automated waiter</button>
<button onclick="startInterval()" id="start">Start your automated waiter</button>
<!-- Code to handle taking the snapshot and displaying it locally -->
<script language="JavaScript">
    var isInterval = false;
    var seconds = 5;
    var myInterval = null;

    // TODO: onDetectFace, stop the camera and prompt user
    var stopInterval = function () {
        clearInterval(myInterval);
    };

    var startInterval = function () {
        myInterval = setInterval(function () {
            Webcam.snap(function (data_uri) {
                var cloudUrl = uploadToCloudinary(data_uri);
                var faceId = getFaceIdByImage(cloudUrl);
                var personId = identify(faceId);
                alert(personId);
                if(personId === null) {
                    prompt('Welcome new customer to our restaurant. Please tell us your name.');
                    returnValue();
                    // Prompt user for their name
                    var name = getName();
                    createPerson(name)
                }

            });

        }, 1000 * seconds);
    };
    var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";


</script>

</body>
</html>
