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
    uploadToCloudinary('data:image/jpeg;base64,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');
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
    var url = null;
    $.ajax({
        async: false,
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
        url = data.url;
    });
    return url;
}

/*
 https://[location].api.cognitive.microsoft.com/face/v1.0/detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes]
 */
function getFaceIdByImage(faceUrl) {
    var faceId = null;
    var params = {
        returnFaceId: 'true'
    };
    $.ajax({
        async: false,
        crossDomain: true,
        url: uriBase + 'detect/' + '?' + $.param(params),
        beforeSend: beforeSend,
        type: 'POST',
        data: JSON.stringify({
            url: faceUrl
        })
    }).done(function (data) {
        console.log(data);
        faceId = data.faceId;
    }).fail(failure);
    return faceId;
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
