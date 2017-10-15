var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";
var imageUrl = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg";
var personGroupId = "automated-waiter-group-id";

//training URL's
var grelda  = "Grelda";
var grelda1 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady1.jpg";
var grelda2 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady2.jpg";
var grelda3 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady3.jpg";
var tom     = "Tom";
var tom1    = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Man/Family2-Man1.jpg";
var tom2    = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Man/Family2-Man2.jpg";


(function () {

    //createPersonGroup();
    createTrainingPersons();
    trainPersonGroup(personGroupId);

})();

function createTrainingPersons() {
    var a = createPerson(grelda);
    console.log(a);
    addFace(grelda1, a.personId);
    addFace(grelda2, a.personId);
    addFace(grelda3, a.personId);

    var b = createPerson(tom);
    console.log(b,a);
    addFace(tom1, b.personId);
    addFace(tom2, b.personId);
    addFace(tom3, b.personId);
}

function trainPersonGroup(personGroupId) {

    $.ajax({
        async: false,
        url: uriBase + 'persongroups/' + personGroupId + '/train',
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: 'POST',
    })
}


/*
 PUT REQUEST

 Request parameters
 personGroupId
 string User-provided personGroupId as a string.

 Req Headers:
 Subscription key (Ocp-Apim-Subscription-Key)
 Content-Type

 Request Body:
 name display name of person group
 https://[location].api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}
 */
function createPersonGroup() {
    $.ajax({
        async: false,
        url: uriBase + 'persongroups/' + personGroupId,
        beforeSend: beforeSend,
        type: 'PUT',
        data: JSON.stringify({
            name: 'Automated Waiter Friends'
        })
    }).fail(failure);
}

/*
 https://[location].api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons
 Query params:
 personGroupId string Specifying the target person group to create the person.

 Req Headers:
 Content-Type and Sub Key i.e. call beforeSend

 */

// Need to parse personId from JSON response
function createPerson(personName) {
    var jsonObj;
    $.ajax({
        async: true,
        url: uriBase + 'persongroups/' + personGroupId + '/persons',
        beforeSend: beforeSend,
        type: 'POST',
        data: JSON.stringify({
            name: personName
        })
    }).done(function (data) {
        // TODO: Retrieve the users personId and store it in database w/
        // the rest of his/her info. We need to make a post request to our server here
        jsonObj = data;
    }).fail(failure);
    return jsonObj;
}


function addFace(imgUrl, personId) {
    $.ajax({
        async: false,
        url: uriBase + '/persongroups' + personGroupId + '/persons' + personId + '/persistedFaces',
        beforeSend: beforeSend,
        type: 'POST',
        data: JSON.stringify({
            url: imgUrl
        })
    })
}


function getPersonId(faceId) {
    var baseUri = uriBase;
    $.ajax({
        async: false,
        url: baseUri,
        beforeSend: beforeSend,
        type: "POST",
        data: JSON.stringify({
            faceIds: [faceId],
            maxNumOfCandidatesReturned: 1,
            confidenceThreshold: 0.5
        })
    }).done(function (data) {
        console.log(" Gocha" + data);
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            return null;
        });
}

function getFaceId(api, faceUrl) {
    var baseUri = uriBase + api;
    var params = {
        returnFaceId: "true"
    };
    var faceid = -1;
    $.ajax({
        async: false,
        url: baseUri + "?" + $.param(params),
        beforeSend: beforeSend,
        type: "POST",
        data: '{"url": ' + '"' + faceUrl + '"}'
    })
        .done(function (data) {
            console.log(data);
            faceid = data[0].faceId;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Failed", textStatus);
        });
    return faceid;
}


function beforeSend(xhrObj) {
    xhrObj.setRequestHeader("Content-Type", "application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
}

function failure(requestObj, textError, exactError) {
    console.log(exactError);
}
