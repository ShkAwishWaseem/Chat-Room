const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")

const userSchema = new Schema({
     fullName: {
          type : String,
          required : true,
          unique : true
     },
     email:{
          type : String,
          required : true,
          unique : true
     },
     password : {
          type : String,
          required : true,
     }
} , {timestamps : true})

userSchema.pre("save" , async function(next) {
     const salt = await bcrypt.genSalt();
     const password= this.password
     const hashedPassword = await bcrypt.hash(password , salt) 
     this.password = hashedPassword
     next();
})

userSchema.statics.login = async function (email,password) {
          const user = await User.findOne({email});
          if(user) {
               const auth = await bcrypt.compare(password , user.password);
               if(auth) {
                    // console.log("user" , user)
                    return user;
               }
               throw Error("Incorrect password");
          }
          throw Error("Incorrect email");
          
}

const User = model("chatusers" , userSchema);
module.exports = User