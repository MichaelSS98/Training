const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default: Date.now
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

const Employee = mongoose.model(
    'Employee', 
    employeeSchema,
    'employees'
);

module.exports = {Employee};