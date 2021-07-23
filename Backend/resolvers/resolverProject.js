const {Project} = require('../models/Project.js');
const { GraphQLDateTime } = require('graphql-iso-date');

const resolverProject = {
    Query: {
        getProjects: (parent, args) => {
            return Project.find({});
        }
    },
    Mutation: {
        addProject: (parent, args) => {
            let e = new Project({
                project_name: args.project_name,
                start_date: args.start_date,
                planned_end_date: args.planned_end_date,
                description: args.description,
                project_code: args.project_code
            });
            return e.save();
        },
        updateProject: (parent, args) => {
            return Project.findOneAndUpdate(
                {
                  _id: args.id
                },
                {
                    $set: {
                        project_name: args.project_name,
                        start_date: args.start_date,
                        planned_end_date: args.planned_end_date,
                        description: args.description,
                        project_code: args.project_code
                    }
                }, 
                {
                    new: true
                }, 
                (err, Project) => {
                    if (err)
                        console.log('Error!!!');
                }
            );
        },
        deleteProject: (parent, args) => {
            return Project.findByIdAndDelete(args.id);
        }
    },
    ISODateTime: GraphQLDateTime
};

module.exports = {resolverProject};