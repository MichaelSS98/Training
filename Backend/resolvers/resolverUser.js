const {User} = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//JWT token options
const generalJWTOptions = {
    issuer: "Mihai Constantin",
    subject: "Authorization Token guaranteed by Mihai Constantin",
    audience: "Trainees",
    algorithm: "HS256"
};

const jwtKey = "we_rock";

//functie de criptare a parolei
const encrypt = async (plaintTextPassword) => {

    const salt = await bcrypt.genSalt(5);
    const encryption = await bcrypt.hash(plaintTextPassword, salt);
    
    return encryption;
};

//functie de comparare a parolei trimise de user cu cea din DB
const compare = async (plaintTextPassword, encryptedPassword) => {

    const isOk = await bcrypt.compare(plaintTextPassword, encryptedPassword);

    return isOk;
};

const resolverUser = {
    Query: {
        getUsingToken: async (parent, args, {user}) => {
            return User.findOne({_id: user.id});
        }
    },
    Mutation: {
        login: async (parent, args) => {

            //extragere informatii din DB
            const storedCredentials = await User.findOne({username: args.username});

            //verificare credentiale
            if (storedCredentials === null)
                return "Wrong Credentials!"
            
            const passwordCheck = await compare(args.password, storedCredentials.password);

            if (passwordCheck === false)
                return "Wrong Credentials!"

            //creare token
            const encodingOptions = {...generalJWTOptions, expiresIn: "1m"};
            const token = await jwt.sign({id: storedCredentials.id, role: storedCredentials.role}, jwtKey, encodingOptions);

            return token;
        },
        register: async (parent, args) => {

            //criptare parola
            const encryptedPassword = await encrypt(args.password);

            //adaugare nou utilizator
            let e = new User({
                username: args.username,
                email: args.email,
                password: encryptedPassword
            });
            await e.save();
            return "User created successfully!"
        },
        deleteAccount: async (parent, args, {user}) => {

            await User.findByIdAndDelete(user.id);
            return "User deleted successfully!";
        }
    }
};

module.exports = {resolverUser};