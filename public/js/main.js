function processImage() {
    var faceId = getFaceId('detect', imageUrl),
        faceIds = [];
    console.log(faceId);
    if(faceId === null) {
        // bad stuff with api call
    } else {
        faceIds.push(faceId);
    }
    var personId = null,
        personData = null;
    //todo Call API to check if we have seen this person
    personId = getPersonId('identify',faceId);
    if(!personId) {
        // Ask person for there name ....
        var name = "Obama";
        var personData = createPerson(name);
        console.log("Final: " + personData);
    }
    else {

    }
}