
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
  user_displayName: String,
  user_familyName:  String,
  user_givenName: 	String,
  user_emails: 		String,
  date_created:    	{ type: Date, default: Date.now }//,
  //eventList:     [{ type: ObjectId, ref: 'Event' }] // need to push quiz on to user upon quiz creation)
});

var eventSchema = new Schema({
  // _user:          {type: ObjectId, ref: 'User', default: null},
  title:          {type: String, default: null},
});


exports.User     = User     = mongoose.model('User', userSchema);
exports.Event    = Event    = mongoose.model('Event', eventSchema);

exports.newUser = function(userData, callback) {
	var new_user = new User({
		user_id:   			userData.id,
  		user_displayName:   userData.displayName,
  		user_familyName:   	userData.name.familyName,
  		user_givenName: 	userData.name.givenName,
  		user_emails: 		userData.emails[0].value,
  		date_created:   	{ type: Date, default: Date.now }
	});
	new_user.save(function(err, new_user) {
	  if (err) return console.error(err);
	  console.dir(new_user);
	});
}

/*{ provider: 'google',
  id: '101541471042384052316',
  displayName: 'WENTING ZHANG',
  name: { familyName: 'ZHANG', givenName: 'WENTING' },
  emails: [ { value: 'zhangwenting111@gmail.com' } ],
  _raw: '{\n "id": "101541471042384052316",\n "email": "zhangwenting111@gmail.com",\n "verified_email": true,\n "name": "WENTING ZHANG",\n "given_name": "WENTING",\n "family_name": "ZHANG",\n "link": "https://plus.google.com/101541471042384052316",\n "picture": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",\n "gender": "female"\n}\n',
  _json: 
   { id: '101541471042384052316',
     email: 'zhangwenting111@gmail.com',
     verified_email: true,
     name: 'WENTING ZHANG',
     given_name: 'WENTING',
     family_name: 'ZHANG',
     link: 'https://plus.google.com/101541471042384052316',
     picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
     gender: 'female' },
  accessToken: 'ya29.1.AADtN_Xm96tVcOdAV2tBC6kTWJTHVW-Ha19lRmZSLR0s5Ja6Uowk7CuQTehJkPs' }
*/



