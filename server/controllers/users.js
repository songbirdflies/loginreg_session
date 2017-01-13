var User = require('mongoose').model('User');

module.exports = {
	register: function(req, res) {
		User.create(req.body)
		.then(function(user){
			res.json(user);
		})
		.catch(function(err){
			console.log(err);
			res.status(500).json(err);
		})
	},

	index: function(req, res) {

	},
	login: function(req, res) {
		User.find({ email: req.body.email})
	},
}