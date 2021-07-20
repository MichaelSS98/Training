const {Employee} = require('./models/Employee.js');

const resolvers = {
    Query: {
        getEmployees: (parent, args) => {
            return Employee.find({});
        },
        getEmployee: (parent, args) => {
            return Employee.find(args.name);
        }
    },
    Mutation: {
        addEmployee: (parent, args) => {
            let e = new Employee({
                name: args.name,
                adress: args.adress,
                email: args.email,
                //hire_date: args.hire_date,
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
    }
};

module.exports = {resolvers}