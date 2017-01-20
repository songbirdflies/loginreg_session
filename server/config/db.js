var mongoose = require('mongoose');
var path = require('path');

var models_path = path.join(__dirname, '../models');
require(models_path + '/user');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/login_session');

mongoose.connection.on('connected', function() {
	console.log('database connected');
})

mongoose.connection.on('error', function(err) {
	console.error(err);
});