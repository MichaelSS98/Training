const {Employee} = require('./models/Employee.js');
const { GraphQLDate } = require('graphql-iso-date')

//bucata de resolvers realizeaza actiunile efective venite de la client
//partea de Query din cate inteleg este pentru geturi(selecturi din baza de date)
//partea de mutations se ocupa de restul operatiilor(adaugare, stergere, update)
//de asemenea aici definim tipurile declarate cu scalar la typeDefs

const resolvers = {
    Query: {
        getEmployees: (parent, args) => {
            return Employee.find({});
        },
        getEmployee: (parent, args) => {
            return Employee.findOne({name: args.name});
        }
    },
    Mutation: {
        addEmployee: (parent, args) => {
            let e = new Employee({
                name: args.name,
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

module.exports = {resolvers}