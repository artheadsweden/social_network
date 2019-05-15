const Person = require('../models/person');
const mongoose = require('mongoose');

function connect2db() {
    mongoose.connect('mongodb://localhost:27017/social_network',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p) {
    connect2db();
    var p1 = new Person(p);
    p1.save();
}

module.exports = {
    savePersonFromJson: savePerson
};