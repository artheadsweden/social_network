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

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    p1.save(function(err){
        if(err) {
            console.log('Error creating user' + err);
        }
        cb(err);
    });
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

function searchPersons(cb, name) {
    connect2db();
    Person.find({ "name": { $regex: '.*' + name + '.*' } },
        function(err,users){
            cb(err, users);
        });
}

function deleteUser(cb, id) {
    connect2db();
    Person.deleteOne({"_id": id}, function(err, res){
       cb(err);
    });
}

module.exports = {
    savePersonFromJson: savePerson,
    findPersons: getAllPersons,
    search: searchPersons,
    deleteUser: deleteUser,
};