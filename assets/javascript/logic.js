

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
    var firstTrain = $("#first-train").val().trim();
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
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Prettify the employee start
    //var firstTrainPretty = moment.unix(firstTrain).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(firstTrain, "X"), "months");
    //console.log(empMonths);

    // Calculate the total billed rate
    //var empBilled = empMonths * frequency;
    //console.log(empBilled);

    // Add each train's data into the table
    $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        firstTrain + "</td><td> TBD </td><td>" + frequency + "</td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case