const jwt       = require('jsonwebtoken');
const crypto = require("crypto");
const accessTokenSecret = 'piloudoudou';
const mdp = "password";
const admin = {type:"Admin", "email":"sendinee.marday05@gmail.com",
               firstname:"Sendinee", lastname:"Marday"}

exports.getDefaultPassword= ()=>{
    return crypto.createHash("sha512").update(mdp).digest("base64");
}

exports.getDefaultAdmin= ()=>{
    return admin;
}

exports.service= (req, res, next)=>{
    if( req.method === "GET" || req.url === '/login'){
        next();
        return;
    }else{
        authenticateJWT(req, res, next);
    }
};

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try{
            let user= jwt.verify(token, accessTokenSecret)
            req.user = user;
            next();
        }catch(e){
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};

exports.generateToken= ()=>{
    return jwt.sign(admin, 
                    accessTokenSecret);
}