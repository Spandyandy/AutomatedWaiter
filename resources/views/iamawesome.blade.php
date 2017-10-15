<!DOCTYPE html>
<html>
<head>
    <title>Detect Faces Sample</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>
<body>

<script type="text/javascript">
    var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";
    var imageUrl = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg";


    function processImage() {
        var faceId = getFaceId('detect', imageUrl);
        //var personId = getPersonId('identify',faceId);
        console.log(faceId)
        /*if(!personId) {
            // Ask person for there name ....
            var name = "Obama";
            var personData = createPerson(name);
            console.log("Final: " + personData);
        }*/
    }

    /*function getPersonId(api, faceId) {
        var baseUri = uriBase + api;
        $.ajax({
            async: false,
            url: baseUri,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: JSON.stringify({
                faceIds: [faceId],
                personGroupId: "person_group"
            })
        }).done(function(data) {
            console.log(" Gocha"+data);
        })
            .fail(function(jqXHR, textStatus, errorThrown) {
                return null;
            });
    }*/

    function getFaceId(api, faceUrl) {
        var baseUri = uriBase + api;
        var params = {
            returnFaceId: "true"
        };
        var faceid = -1;
        $.ajax({
            url: baseUri + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: '{"url": ' + '"' + faceUrl + '"}'
        })
            .done(function(data) {
                faceid = $.parseJSON('{');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("Failed", textStatus);
            });
            return faceid;
    }

    function createPerson(nameOfPerson) {
        var api = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/person_group/persons';

        $.ajax({
            async: false,
            url: api,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: JSON.stringify({
                name: nameOfPerson
            })
        }).done(function(data) {
                console.log(data);
            })
            .fail(function(errorThrown) {
                console.log(errorThrown);
            });
    }
</script>

<h1>Detect Faces:</h1>
Enter the URL to an image that includes a face or faces, then click the <strong>Analyze face</strong> button.
<br><br>
Image to analyze: <input type="text" name="inputImage" id="inputImage" value="https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg" />
<button onclick="processImage()">Analyze face</button>
<br><br>
<div id="wrapper" style="width:1020px; display:table;">
    <div id="jsonOutput" style="width:600px; display:table-cell;">
        Response:
        <br><br>
        <textarea id="responseTextArea" class="UIInput" style="width:580px; height:400px;"></textarea>
    </div>
    <div id="imageDiv" style="width:420px; display:table-cell;">
        Source image:
        <br><br>
        <img id="sourceImage" width="400" />
    </div>
</div>
</body>
</html>