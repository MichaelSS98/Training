const {Employee} = require('../models/Employee.js');
const { GraphQLDate } = require('graphql-iso-date');

//bucata de resolvers realizeaza actiunile efective venite de la client
//partea de Query din cate inteleg este pentru geturi(selecturi din baza de date)
//partea de mutations se ocupa de restul operatiilor(adaugare, stergere, update)
//de asemenea aici definim tipurile declarate cu scalar la typeDefs

const resolverEmployee = {
    EmployeeWithProject: {
        _resolveReference(object) {
            return Employee.find({id: object.id});
        }
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

            //umplem campul project_id cu obiectul Project corespunzator
            const complete_query = await Employee.findOne({_id: args.id}).populate("project_id");
            
            //ii facem o copie deep. In project_id punem id-ul proiectului inapoi
            const result = JSON.parse(JSON.stringify(complete_query));

            //daca nu exista proiectul (e.g a fost sters) se va intoarce un mesaj custom in loc de project_id
            if (complete_query.project_id === null)
            {
                result.project_id = "This project has either been finished, deleted or revoked!";
                result.id = result._id;
                result.project = null;
                
                return result;
            }

            //Punem obiectul de tip Project in project din result daca exista proiectul respectiv
            //project se numeste campul din typedefs
            result.project_id = complete_query.project_id._id;
            result.project = JSON.parse(JSON.stringify(complete_query.project_id));
            result.id = result._id;

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
    ISODate: GraphQLDate
};

module.exports = {resolverEmployee};