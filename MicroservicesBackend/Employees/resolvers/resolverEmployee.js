const {Employee} = require('../models/Employee.js');
const mongoose = require('mongoose');
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');

//bucata de resolvers realizeaza actiunile efective venite de la client
//partea de Query din cate inteleg este pentru geturi(selecturi din baza de date)
//partea de mutations se ocupa de restul operatiilor(adaugare, stergere, update)
//de asemenea aici definim tipurile declarate cu scalar la typeDefs

const resolverEmployee = {
    EmployeeWithProject: {
        _resolveReference(object) {
            return Employee.find({id: object.id});
        }
        // project(e) {
        //     return {__typename: "Project", e.project};
        // }
    },
    Employee: {
        _resolveReference(object) {
            return Employee.find({id: object.id});
        }
    },
    Query: {
        getEmployees: (parent, args) => {
            return Employee.find({});
        },
        getEmployee: (parent, args) => {
            return Employee.findOne({name: args.name});
        },
        getEmployeeAndProject: async (parent, args) => {

            //extragem intrarea cautata si facem agregare dupa project_id
            const complete_query = await Employee.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(args.id)}},
                {
                    $lookup: {
                        from: "projects",
                        localField: "project_id",
                        foreignField: "_id",
                        as: "project"
                    }
                }
            ]);

            //ar trebui sa fie intors un singur rezultat in array pe care il transformam in obiect de sine statator
            const result = JSON.parse(JSON.stringify(complete_query[0]));
            
            //daca nu are un proiect atunci ii puntem null la proiect
            if (result.project.length === 0)
            {
                result.project = null;
                result.project_id = "This project has either been finished, deleted or revoked!";
                result.id = result._id;

                return result;
            }

            //la partea de proiect copiem tot ce se afla in project[0], proiectul angajatului si ii setam id
            // ca fiind _id din moment ce cheia noastra principala este id
            //La fel si pentru employee in sine
            result.project = JSON.parse(JSON.stringify(result.project[0]));
            result.id = result._id;
            result.project.id = result.project._id;

            return result;
        }
    },
    Mutation: {
        addEmployee: (parent, args) => {
            let e = new Employee({
                name: args.name,
                project_id: args.project_id,
                adress: args.adress,
                email: args.email,
                hire_date: args.hire_date,
                salary: args.salary,
                job_title: args.job_title
            });
            return e.save();
        },
        updateEmployee: (parent, args) => {
            return Employee.findOneAndUpdate(
                {
                  _id: args.id
                },
                {
                    $set: {
                        name: args.name,
                        project_id: args.project_id,
                        adress: args.adress,
                        email: args.email,
                        salary: args.salary,
                        hire_date: args.hire_date,
                        job_title: args.job_title
                    }
                }, 
                {
                    new: true
                }, 
                (err, Employee) => {
                    if (err)
                        console.log('Error!!!');
                }
            );
        },
        deleteEmployee: (parent, args) => {
            return Employee.findByIdAndDelete(args.id);
        }
    },
    ISODate: GraphQLDate,
    ISODateTime: GraphQLDateTime
};

module.exports = {resolverEmployee};