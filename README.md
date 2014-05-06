How to run:
if you don't have ngrok (ngrok is for testing on mobile phone), change the code below touse the localhost in server.js
    
    callbackURL: "http://p.ngrok.com/auth/callback",
    // callbackURL: "http://localhost:8082/auth/callback",
and in config.js 

	// p.ngrok.com
	/*module.exports = {
	   consumer_key  : '616771634088-as0vudjombrv2a56ap4l77epd3dniv6o.apps.googleusercontent.com',
	   consumer_secret : 'eTnghypGpkoi7a3-SmWpG94p'
	}*/

	// localhost:8082
	module.exports = {
	   consumer_key  : '616771634088-7gtdairls5goq258ng85j24eqle7iisn.apps.googleusercontent.com',
	   consumer_secret : 'k8vhpp9R85F9sUQJZBWlD1oM'
	}

if you do have ngrok, use subdomain p.ngrok.com to broadcast port 8082, change server.js and config.js accordingly

run the server
	noder server.js

