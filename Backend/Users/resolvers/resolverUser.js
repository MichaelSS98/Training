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

const jwtAccessKey = "we_rock";
const jwtRefreshKey = "we_rock_on_repeat";

//function that generates a new access token
const createAccessToken = async (id, role) => {

    const encodingOptions = {...generalJWTOptions, expiresIn: "1h"};
    const token = await jwt.sign({id, role}, jwtAccessKey, encodingOptions);
    
    return token;
};

//function that generates a new refresh token
const createRefreshToken = async (id, role) => {

    const encodingOptions = {...generalJWTOptions, expiresIn: "1d"};
    const token = await jwt.sign({id, role}, jwtRefreshKey, encodingOptions);
    
    return token;
};

//function that checks the refresh token and extracts the information from it
const verifyRefreshToken = async (token) => {

    try 
    {
        const decodingOptions = {...generalJWTOptions, ignoreExpiration: false};
        const decoded = await jwt.verify(token, jwtRefreshKey, decodingOptions);

        const userInDB =  await User.findOne({_id: decoded.id});

        if (userInDB === null)
            throw new Error('Refresh Token is deprecated!');

        return {data: decoded, refreshToken: token};
    }
    catch(e)
    {
        if (e.message === 'jwt expired')
        {
            const decodingOptions = {...generalJWTOptions, ignoreExpiration: true};
            const decoded = await jwt.verify(token, jwtRefreshKey, decodingOptions);

            const userInDB =  await User.findOne({_id: decoded.id});

            if (userInDB === null)
                throw new Error('Refresh Token is deprecated!');
            
            const refreshToken = await createRefreshToken(decoded.id, decoded.role);

            return {data: decoded, refreshToken: refreshToken};
        }
        else if (e.message === 'jwt malformed')
        {
            throw new Error('Refresh token is malformed!');
        }
        else
        {
            throw new Error('Refresh token is compormised!');
        }
    }
};

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

            //creare tokens
            const accessToken = await createAccessToken(storedCredentials.id, storedCredentials.role);
            const refreshToken = await createRefreshToken(storedCredentials.id, storedCredentials.role);

            return {accessToken, refreshToken};
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
        refreshToken: async (parent, args) => {
            
            const {data, refreshToken} = await verifyRefreshToken(args.token);
            const accessToken = await createAccessToken(data.id, data.role);

            return {accessToken, refreshToken};
        },
        deleteAccount: async (parent, args, {user}) => {

            await User.findByIdAndDelete(user.id);
            return "User deleted successfully!";
        }
    }
};

module.exports = {resolverUser};