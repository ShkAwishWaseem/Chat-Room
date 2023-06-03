const User = require("../models/user");
const {generateToken} = require("../services/userAuth")

async function handleSignUpPostRequest (req,res) {
     const {fullName , email , password} = req.body;
     try {
               const user = await User.create({
                    fullName,
                    email,
                    password
               })
               const token = generateToken(user.fullName , user._id);
               res.cookie("jwt" , token);
               res.cookie("name" , user.fullName);
               return res.render("chat-room" , {
                    fullName : user.fullName
               });

     } catch (error) {
        return res.render("signupError")
     }
}

async function handleLogInPostRequest (req,res) {
     const {email,password} = req.body;
     try {
          const user = await User.login(email,password);
          const  token = generateToken(user.fullName , user._id)
          res.cookie("jwt" , token);
          res.cookie("name" , user.fullName)
          return res.render("chat-room" , {
               fullName : user.fullName
          })
     } catch (error) {
          return res.render("loginError")
     }
} 
module.exports = {
     handleSignUpPostRequest,
     handleLogInPostRequest
}