<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>WebcamJS Test Page</title>
    <style type="text/css">
        body { font-family: Helvetica, sans-serif; }
        h2, h3 { margin-top:0; }
        form { margin-top: 15px; }
        form > input { margin-right: 15px; }
        #results { float:right; margin:20px; padding:20px; border:1px solid; background:#ccc; }
    </style>
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
    Webcam.attach( '#my_camera' );
</script>


<!-- Code to handle taking the snapshot and displaying it locally -->
<script language="JavaScript">

    var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";

    function take_snapshot() {
        // take snapshot and get image data
        Webcam.snap( function(data_uri) {
            // call detect from api on image
            getFaceId('detect',+data_uri+);
        } );
    }
</script>

</body>
</html>
