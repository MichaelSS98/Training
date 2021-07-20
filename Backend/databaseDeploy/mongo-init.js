db = db.getSiblingDB('employees');

db.createUser({
    user: "mihai",
    pwd: "root",
    roles: [
        {
            role: "readWrite",
            db: "employees"
        }
    ] 
});

db.createCollection('employees');