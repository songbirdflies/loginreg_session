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
		User.findOne({ email: req.body.email })
		.then(function(user) {
			return user.verifyPassword(req.body.password)
			.then(function() {
				req.session.userID = user._id;
				res.json({success: true});
			})
		})
		.catch(function(err){
			res.status(500).json(err);
		});
	}

}