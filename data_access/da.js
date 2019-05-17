const Person = require('../models/person');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    bcrypt.hash('myPassword', 10, function(err, hash) {
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log('Error creating user' + err);
            }
            cb(err);
        });
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

    Person.find({$or:[ {"first_name": { $regex: '.*' + name + '.*' }}, { "last_name": { $regex: '.*' + name + '.*' }}]} ,
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


function login(cb, username, password) {
    connect2db();
    Person.findOne({"username": username}, function(err, res){
        bcrypt.compare(password, res.password, function(err, res) {
            if(res) {
                cb(err, username);
            } else {
                cb(err, '');
            }
        });
    });
}

module.exports = {
    savePersonFromJson: savePerson,
    findPersons: getAllPersons,
    search: searchPersons,
    deleteUser: deleteUser,
    login: login
};