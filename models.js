
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
  user_id:   		String,
  user_mate: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user_displayName: String,
  user_familyName:  String,
  user_givenName: 	String,
  user_emails: 		String,
  user_picture: String,
  date_created:    	{ type: Date, default: Date.now }
});

var eventSchema = new Schema({
  title:          {type: String, default: null},
});


exports.User     = User     = mongoose.model('User', userSchema);
exports.Event    = Event    = mongoose.model('Event', eventSchema);

exports.newUser = function(userData, callback) {
	var new_user = new User({
		user_id:   			userData.id,
  		user_displayName:   userData.displayName,
  		user_familyName:   	userData.name.familyName,
  		user_givenName: 	  userData.name.givenName,
  		user_emails: 		    userData.emails[0].value,
      user_picture:       userData._json['picture'], 
  		date_created:   	{ type: Date, default: Date.now }
	});
	new_user.save(function(err, new_user) {
	  if (err) return console.error(err);
	  console.dir(new_user);
	});
}




