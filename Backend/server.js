/*
this file will have all the server configuration,
DB connection, part settings etc
*/
//ssconst  routes  = require("express/lib/router");
const mongoose = require("mongoose");
//const app = require("../app");
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Logger
app.use(logger('dev'));

// body parsers
app.use(bodyParser.json());
app.use(express.json());
//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// import our routes
//const routes = require('./Routes/PostsRoutes');
// middleware to use our routes
//app.use('/', routes);

// export the app
//module.exports = app;

require('dotenv').config({ path: '.env'});

//database connectiions
mongoose.connect('mongodb+srv://pawanrai:12345@cluster0.ppegs.mongodb.net/myproject?retryWrites=true&w=majority',
    {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    },
    console.log('database connected')
);

mongoose.Promise = global.Promise; //tell mongoose to use Esg promises
mongoose.connection.on('error',(err) => {
    console.error(`Database Connection Error -> ${err.massage}`);
});
// require our models here so that it can be accessed throughtout the application
 require('./Models/Posts');
 
//require app.js
const routes = require('./Routes/PostsRoutes')
//const posts = require('./Controllers/PostController')

app.use('/v1',routes)



//start the server on port 3000
const server = app.listen(3000, () => {
    console.log(`Express running   PORT ${server.address().port}`);
})
//module.exports = app;

