const JWT = require("jsonwebtoken");
const secretKey = "Batman$upermanIronmanMarvelAllCharacters";

function generateToken(fullName,id) {
     const payload = {
        fullName : fullName,
        id : id
     }
     const token =  JWT.sign(payload , secretKey);
     return token;
}


module.exports = {
     generateToken
}