var subscriptionKey = "33ae7357b50b4045a712bc8c56d1f600";
var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/";
var imageUrl = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg";
var personGroupId = "automated-waiter-group-id";
var cloudinaryName = 'drauibq1c',
    cloudinaryImageUploadUrl = 'https://api.cloudinary.com/v1_1/' + cloudinaryName + '/image/upload',
    cloudinaryUploadKey = '925295814447944';

//training URL's
var grelda = "Grelda";
var grelda1 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady1.jpg";
var grelda2 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady2.jpg";
var grelda3 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Lady/Family2-Lady3.jpg";
var tom = "Tom";
var tom1 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Man/Family2-Man1.jpg";
var tom2 = "https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family2-Man/Family2-Man2.jpg";


(function () {

    //createPersonGroup();
    //createTrainingPersons();
    //trainPersonGroup(personGroupId);
    console.log('sdlkfjdslkfj');
    uploadToCloudinary('');
})();

function createTrainingPersons() {
    var a = createPerson(grelda);
    console.log(a);
    addFace(grelda1, a.personId);
    addFace(grelda2, a.personId);
    addFace(grelda3, a.personId);

    var b = createPerson(tom);
    console.log(b, a);
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
 file - The file to upload. Can be the actual data (byte array buffer), the Data URI (Base64 encoded), a remote FTP, HTTP or HTTPS URL of an existing file, or an S3 URL (of a whitelisted bucket).
 api_key - The unique API Key of your Cloudinary account.
 timestamp - Unix time in seconds of the current time (e.g., 1315060076).
 signature - A signature of all request parameters including the 'timestamp' parameter but excluding the 'api_key' and 'file' parameters, based on the API Secret of your Cloudinary account. The signature is valid for 1 hour. See Creating API authentication signatures for more details.
 // https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload
 */
function uploadToCloudinary(file) {
    $.ajax({
        url: '/api/sendImage',
        type: 'POST',
        data: {
            url: file
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json'
    }).done(function (data) {
        console.log('success');
    })
}

/*
 https://[location].api.cognitive.microsoft.com/face/v1.0/detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes]
 */
function getFaceIdByImage(faceUrl) {
    var params = {
        returnFaceId: 'true'
    };
    $.ajax({
        crossDomain: true,
        url: uriBase + 'detect/' + '?' + $.param(params),
        beforeSend: beforeSend,
        type: 'POST',
        data: JSON.stringify({
            url: faceUrl
        })
    }).done(function (data) {

    }).fail(failure);
}

/*
 https://[location].api.cognitive.microsoft.com/face/v1.0/identify
 Query params:
 personGroupId string Specifying the target person group to create the person.

 Req Headers:
 Content-Type and Sub Key i.e. call beforeSend

 */
function identify(faceId) {
    $.ajax({
        async: false,
        url: uriBase + 'identify/',
        beforeSend: beforeSend,
        type: 'POST',
        data: JSON.stringify({
            faceIds: [faceId],
            personGroupId: personGroupId,
            maxNumOfCandidatesReturned: 1,
        })
    }).done(function (data) {

    }).fail(failure);
}
// Need to parse personId from JSON response
function createPerson(personName) {
    var jsonObj;
    $.ajax({
        async: true,
        url: uriBase + 'persongroups/' + personGroupId + '/persons',
        type: 'POST',
        data: JSON.stringify({
            name: personName
        }),

    }).done(function (data) {
        // TODO: Retrieve the users personId and store it in database w/
        // the rest of his/her info. We need to make a post request to our server here
        jsonObj = data;
        return jsonObj;
    })
}

/*
 https://[location].api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}
 personGroupId string
 personId string
 */

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
