const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definirea schemei de date pentru colectia users din mongo
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "standard"
    }
});

//definirea modelului folosit pentru a interactiona cu baza de date
const User = mongoose.model(
    'User', 
    userSchema,
    'users'
);

module.exports = {User};