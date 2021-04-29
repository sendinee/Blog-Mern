'use strict';
const auth = require("../../services/AuthService");

exports.login= async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try{
        let user=auth.getDefaultAdmin();
        if(req.body.email=== user.email&&
           req.body.password===auth.getDefaultPassword()){
            let accessToken= auth.generateToken();
            return res.send(JSON.stringify({"status": 200, "error": null, 
                                            "response": {token:accessToken,
                                                         user:user}}));  
        }else{
            return res.sendStatus(401);
        }
    }catch(e){
        res.send(JSON.stringify({"status": 502, "error": "Internal Error", "response": []}));
    }
};