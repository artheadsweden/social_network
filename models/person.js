const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const PersonSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    street_address: String,
    zip_code: String,
    city: String
}, { collection: 'persons' });

// Create model
const Person = mongoose.model('person', PersonSchema);

module.exports = Person;