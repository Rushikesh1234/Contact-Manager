
/* 

We used below dependencies in package.json
1. Nodemon - whenever me will make any changes in our code, it will restart our server with new changes.
2. Express - is a back end web application framework for building RESTful APIs with Node.js.


We use app - 'server.js', will work as Server. But, we need to test our API, we need a HTTP client.
For this, we have Thunder client. (We can use external application like Postman)


*/

const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnections");
const env  = require("dotenv").config();


connectDb();

const app = express();

const port = process.env.PORT || 3000;

// Create a middleware for JSON body
// This will provide one parser, which will help us to parse that data string (from client side) to JSON format
app.use(express.json());

// Call different contact APIs - Get, Post, Delete, Put
app.use("/api/contacts", require("./routes/contactRoutes"));

// Call User route for user registration, creation
app.use("/api/users", require("./routes/userRoutes"));

// Call middlesware
app.use(errorHandler)

app.listen(port, () => {
    console.log('Server is running on '+ port);
})