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

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="{{asset('js/api.js')}}"></script>
    <script src="{{asset('js/main.js')}}"></script>

</head>
<body>
<div id="results">Your captured image will appear here...</div>

<h1>Image Capture Test Page</h1>

<div id="my_camera"></div>

<!-- First, include the Webcam.js JavaScript Library -->
<script type="text/javascript" src="{{asset('js/webcam.js')}}"></script>

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

<button onclick="stopInterval()">Stop your automated waiter</button>
<button onclick="startInterval()">Start your automated waiter</button>
<!-- Code to handle taking the snapshot and displaying it locally -->
<script language="JavaScript">
    var isInterval = false;
    var myInterval = null;

    var stopInterval = function () {
        clearInterval(myInterval);
    };
    var startInterval = function () {
        myInterval = setInterval(function () {
            var faceID, switch_var;
            // take snapshot and get image data
            Webcam.snap(function (data_uri) {
                var cloudUrl = uploadToCloudinary(data_uri);
                var faceId = getFaceIdByImage(cloudUrl);
                var personId = identify(faceId);
                if(personId === null) {
                    // Prompt user for their name
                    var name = "my name";
                    createPerson(name)
                }

            });

            if (faceID == null) {
                switch_var = 0;
            }
            else if (identify(faceID)) {
                switch_var = 1;
            }
            else {
                switch_var = 2;
            }

            switch (switch_var) {
                case 0: // No person, resume taking pix every 5 seconds

                case 1: // Person found but already in database

                case 2: // Person found, no recorded entry

            }
        }, 5000);
    };
    var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";


</script>

</body>
</html>
