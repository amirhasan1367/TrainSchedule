

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB32MXU_44DJ9vZzT0DxZP1lwyiLYFmevs",
    authDomain: "trainschedule-hw.firebaseapp.com",
    databaseURL: "https://trainschedule-hw.firebaseio.com",
    projectId: "trainschedule-hw",
    storageBucket: "",
    messagingSenderId: "706935555899"
};
firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#submit-train").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: destination,
        start: firstTrain,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.role);
    // console.log(newTrain.start);
    // console.log(newTrain.rate);



    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var tFrequency = parseInt(childSnapshot.val().frequency);

    //var nextArrival = firstTrain;



    // Employee Info
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(tFrequency);

    // Prettify the next arrival
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    //console.log (firstTrainConverted);
    
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var minAway = moment().diff(moment(firstTrainConverted), "minutes");
   // var minAwayPretty = moment(minAway).format ("hh:mm");

    //console.log("Minutes Away: " + minAway);

    var tRemainder = minAway % tFrequency;
    //console.log(tRemainder);

    
    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextArrival = moment().add (tMinutesTillTrain, "minutes").format("HH:mm");

    // Add each train's data into the table
    $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        tFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td>");
});

