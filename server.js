var express = require('express'), 
app = express(),
path = require('path'),
port = 8000;
bodyParser = require('body-parser'), 
session = require('express-session');

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//console.log(session);

var sessionInfo = {
	secret: "CookieMonster",
	resave: false, //checks to see if anything has changed in session
	saveUninitialized: true, //must specify. If nothing added, nothing saved
	name: 'myCookie',
	cookie: {
		secure: false,
		httpOnly: false,
		maxAge: 3600000
	}
}
app.use(session(sessionInfo));

//MongoDB
require('./server/config/db');

//Routes
require('./server/config/routes')(app);

app.listen(port, function(){ 
	console.log('listening on 8000')
});

//reference: Lecture Videos Week 8, Session 1