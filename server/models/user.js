var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			minlength: 2,
			required: true,
			trim: true
		},
		lastname: {
			type: String,
			minlength: 2,
			required: true,
			trim: true
		},
		email: {
			type: String,
			minlength: 5,
			unique: true,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		}
	}
);

UserSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next();

	var self = this;

	bcrypt.hash(this.password, 10) //this will return a promise
	.then(function(hash) {
		self.password = hash;
		next(); //if pswd successfully hashed, go on to the next
	})
/*	.catch(function(err) {
		next(err); //will inform mongoose that an error has occurred
	});*/
	.catch(next); //sends err msg as above

	next();
})

UserSchema.methods.verifyPassword = function(password) {
	//password data comes from req.body
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);