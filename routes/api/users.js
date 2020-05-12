// BASE SETUP
// ======================================
// CALL THE PACKAGES --------------------
//var http = require("http");
//fs = require('fs');
const PORT = process.env.PORT || 8080;

const config = require('config');

//const MongoClient = require('mongodb').MongoClient;
const uri = config.get('mongoURI');

//const client = new MongoClient(uri, { useNewUrlParser: true });
var mongoose = require('mongoose');

var express = require('express'); // call express
var app= express(); // define our app using express = require('body-parser'); // get body-parser

var bodyParser = require('body-parser');
var morgan = require('morgan'); // used to see requests = require('mongoose');
var User = require('../../models/user');


// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure our app to handle CORS requests
app.use(function(req, res, next) {
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
       next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
// mongoose.connect(uri, {useNewUrlParser: true});
// MongoClient.connect(uri, function (err, db) {
//    if(err) throw err;
//    //Write databse Insert/Update/Query code here..
//    console.log('Connect to the database');
//    //var dbo = db.db("mydb");
//    //var myobj = { firstInput: input1, secondInput: input2 };
//    //dbo.collection("users").insertOne(myobj, function(err, res) {
//    //  if (err) throw err;
//    //  console.log("1 user inserted");
//    //  db.close();
//    //});
// });


// ROUTES FOR OUR API 
// ============================= 
// basic route for the home page 
app.get('/', function(req, res) {
  res.send('Welcome to the home page!'); 
});
// get an instance of the express router 
var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
     // do logging
     console.log('Somebody just came to our app!');
     next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working 
// accessed at GET http://uri:port/api
apiRouter.get('/', function(req, res, next) { 
  res.json({ message: 'hooray! welcome to our api!' }); 
});

// more routes for our API will happen here
// on routes that end in /users
// ----------------------------------------------------
apiRouter.route('/')
       // create a user (accessed at POST http://localhost:8080/users)
       .post(function(req, res) {
         var user = new User(); // create a new instance of the User model
         user.name = req.body.name; // set the users name (comes from the request)
         user.username = req.body.username; // set the users username (comes from the request)
         user.password = req.body.password; // set the users password (comes from the request)

         console.log(req.body.name);
         console.log(req.body.username);
         user.save(function(err) {
           if (err) {
             // duplicate entry
             if (err.code == 11000)
              return res.json({ success: false, message: 'A user with that username already exists. '});
             else
              return res.send(err);
            }
            // return a message
            res.json({ message: 'User created!' });
          });
        })
       // get all the users (accessed at GET http://address/api/users)
       .get(function(req, res) {
         User.find(function(err, users) {
             if (err) return res.send(err);
             // return the users
             res.json(users);
         });
        });
// on routes that end in /users/:user_id
// ----------------------------------------------------
apiRouter.route('/:user_id')
     // get the user with that id
     .get(function(req, res) {
           User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);
                // return that user
                res.json(user);
           });
      })

      // update the user with this id
     .put(function(req, res) {
          User.findById(req.params.user_id, function(err, user) {
            if (err) return res.send(err);
            // set the new user information if it exists in the request
            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            // save the user
            user.save(function(err) {
              if (err) return res.send(err);
              // return a message
              res.json({ message: 'User updated!' });
            });
          });
        })

      // delete the user with this id
    	.delete(function(req, res) {
    		User.remove({
    			_id: req.params.user_id
    		}, function(err, user) {
    			if (err) return res.send(err);

    			res.json({ message: 'Successfully deleted' });
    		});
    	});

// REGISTER OUR ROUTES ------------------------------- 
// all of our routes will be prefixed with /api
app.use('/api', apiRouter); 
// START THE SERVER 
// =============================== 
app.listen(PORT);
console.log('Magic happens on port ' + PORT);
