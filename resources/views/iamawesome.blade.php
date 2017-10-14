<!DOCTYPE html>
<html>
<head>
    <title>Detect Faces Sample</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>
<body>

<script type="text/javascript">
    var subscriptionKey = "dc19f1be9e0c405abee841815bca1aa7";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";
    var imageUrl = "http://www.goldenglobes.com/sites/default/files/styles/portrait_medium/public/people/cover_images/leonardo_dicaprio-gt.jpg?itok=uZBLZv3X";
    var personGroupId = "person_group";
    function processImage() {
        createPersonGroup();
        var faceId = getFaceId('detect', imageUrl),
            faceIds = [];
        if(faceId === null) {
            // bad stuff with api call
        } else {
            faceIds.push(faceId);
        }
        // Call API to check if we have seen this person
        var personId = null,
            personData = null;
        if(!personId) {
            // Ask person for there name ....
            var name = "Daniel Evans";
            var personData = createPerson(name);
        }
        //personId = personData.personId;

    };

    function getFaceId(api, faceUrl) {
        var baseUri = uriBase + api;
        var params = {
            returnFaceId: "true"
        };
        $.ajax({
            url: baseUri + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: '{"url": ' + '"' + faceUrl + '"}',
        })
            .done(function(data) {
                return data.faceId;
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                return null;
            });
    }

    function createPersonGroup() {
        var api = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/person_group';
        $.ajax({
            url: api,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "PUT"
        })
            .done(function(data) {
                console.log('person group created (success)')
            })
            .fail(function(errorThrown) {
                console.log(errorThrown);
            });
    }

    function createPerson(nameOfPerson) {
        var api = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId + '/persons';
        $.ajax({
            url: api,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: {
                name: nameOfPerson
            }
        })
            .done(function(data) {
                console.log(data);
            })
            .fail(function(errorThrown) {
                console.log(errorThrown);
            });
    }

    function createPerson(name, faceIds) {
        var params = {
            faceIds: faceIds,
            personGroupId: personGroupId
        };
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: {
                name: name
            }
        })
            .done(function(data) {
                console.log(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Fuck something went wrong :(
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