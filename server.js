var express = require("express");
var app = express();
var port = 8000;
var users_array = [];

var session = require('express-session');
app.use(session({secret: 'thisissecret:P'}));  // string for encryption

// require body-parser for using forms
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');


app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});

app.get("/users", function (request, response){
    response.render('users', {users: users_array});
})

// route to process new user form data:
app.post('/users', function (req, res){
  // console.log("POST DATA \n\n", req.body);
  req.session.name = req.body.name;
  // console.log(req.session.name);
  users_array.push(req.body);
  res.redirect('/users');
})

app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});


app.listen(port, function(){
	console.log(`listening on port ${port}`);
})
