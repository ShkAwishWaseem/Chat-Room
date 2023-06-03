const express = require("express");
const router = express.Router();
const {checkAuthentication} = require("../middlewares/userAuth")
const {handleSignUpPostRequest , handleLogInPostRequest} = require("../controllers/user")


router.post("/post-signup", handleSignUpPostRequest )
router.post("/post-login"  , handleLogInPostRequest)





// ejs routers

router.get("/login" , (req,res) => {
     return res.render("login")
})
router.get("/" , (req,res) => {
     return res.render("login")
})
router.get("/signup" , (req,res) => {
     return res.render("signup")
})

router.get("/chat" , checkAuthentication , (req,res) => {
     const fullName = req.cookies.name
     return res.render("chat-room" , {
          fullName
     })
})

router.get("/logout" , (req,res) => {
     res.cookie("jwt" , " " , {maxAge : 1}); 
     res.cookie("name" , " " , {maxAge : 1}); 
     return res.redirect("/")
})


module.exports = router