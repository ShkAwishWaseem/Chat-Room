const {verify} = require("jsonwebtoken");
const secretKey = "Batman$upermanIronmanMarvelAllCharacters";

function checkAuthentication(req,res,next) {
     const token = req.cookies.jwt;
     if (token) {
          verify(token, secretKey , (err , decode) => {
               if(err) {
                    res.redirect("/");
               }
               else{
                    next();
               }
          })
     }
     else{
          res.redirect("/");
     }

}
module.exports ={
     checkAuthentication
}