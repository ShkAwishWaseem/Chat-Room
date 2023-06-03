const express = require("express");
const app = express();
const path  = require("path");
const {connectDb} = require("./config");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

// middlewares
app.use(express.static(__dirname +"/public"))
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())



// connection
connectDb("mongodb://localhost:27017/Application")
.then(() => console.log("mongo Connected"))
.catch((err) => console.log(`Error is Caught ${err}`))


// ejs
app.set("view engine" , "ejs" );
app.set("views" , path.resolve("./views"))



// routes
app.use("/", userRouter)

// Socket.io Connection : 

// intializing Socket.io Server
const io = new Server(server);

io.on("connection" , (socket) => {
     // console.log("A new user is  registered " , socket.id);
     socket.on("message" , (msg) => {
          // console.log(`A new message is here . ${msg.message}`);
          socket.broadcast.emit('message', msg);
     })
})

// Port
server.listen(8000 , () => console.log("Server started"))