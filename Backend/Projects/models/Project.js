const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema Proiectelor
const projectSchema = new Schema({

    project_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    planned_end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project_code: {
        type: String,
        required: true
    }
});

const Project = mongoose.model(
    'Project',
    projectSchema,
    'projects'
);

module.exports = {Project};