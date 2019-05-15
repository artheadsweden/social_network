const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const PersonSchema = new Schema({
    name: String,
    street_address: String,
    zip_code: String,
    city: String,
    age: Number
}, { collection: 'persons' });

// Create model
const Person = mongoose.model('person', PersonSchema);

module.exports = Person;