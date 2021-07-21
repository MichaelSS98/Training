const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definirea schemei de date pentru colectia din mongo
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    adress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hire_date: {
        type: Date,
        //default: Date.now //aici era mai mult ca sa obserc comportamentul
        required: true
    },
    salary: {
        type: Number,
        required: true, 
        validate: {
            validator: Number.isInteger,
            message: "Must be int!"
        }
    },
    job_title: {
        type: String,
        required: true
    }
});

//definirea modelului folosit pentru a interactiona cu baza de date
const Employee = mongoose.model(
    'Employee', 
    employeeSchema,
    'employees'
);

module.exports = {Employee};