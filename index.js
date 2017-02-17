var express = require("express");

var app = express();



// set up req.body
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


var messages = [{username: "sarah", message: "hello", date: 1}];

var username = ["username"];

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/user.html");
});

app.get("/talk", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// get /chat
app.get("/chat", function(req, res) {
	res.send(JSON.stringify(messages));
});	

// post /chat
app.post("/chat", function(req, res) {
	// see above for body-parser
	var user = {
		message: req.body.message,
	    date: req.body.date,
	    username: username
	}

	// {username: "sarah", message: "hello"}
	if(req.body.message && req.body.date) {
		messages.push(user);
		res.send("success");
	} else{
		res.send("error");
	}
});

app.get("/username", function(req, res){
	res.send(JSON.stringify(username));
})


app.post("/username", function(req, res) {
	if(req.body.username) {
		username = req.body.username;
		res.send("success " + username);
	} else{
		res.send("error");
	}
});


// Middleware goes here!

app.use(function(req, res, next) {
	res.status(404);
	res.send("404 File Not Found");
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Inernal Server Error");
});

app.listen(8080, function(){
	console.log("Server started!");
});