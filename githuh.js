const request = require('request');
const program = require('commander');
const baseUri = "https://api.github.com/users/";

//Wrapper

class GitHuh {
	constructor(user) {
	this.user = user
}

repos(callback) {
	this._sendRequest('repos', callback);
}

stars (callback) {	
	this._sendRequest('starred', callback);
}

profile(callback) {
	this._sendRequest('profile', callback);
}

followers(callback) {
	this._sendRequest('followers', callback);
}

 _sendRequest(type, callback) {
 	var url = ""; 
 	if (type === "profile") {
 		url = `${baseUri}/${this.user}`
 	} else {
 		url = `${baseUri}/${this.user}/${type}`;
 	}

 

 var baseRequest = request.defaults({
  headers: {'User-Agent': 'my-githuh'}
});

 baseRequest(url, function(error,response, body) {
 	if (!error && response.statusCode === 200) {
 		callback(JSON.parse(body))
 	} else {
 		console.log("ERROR", error);
 	}
 });

  }
}

//Usage

program
    .version('0.0.1')
    .usage('repos <user>\n\t githuh stars <user> \n\t githuh profile <user>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    var command = program.args[0];
    var user = program.args[1];
    const githuh = new GitHuh(user);

    if (command === "repos") {
        console.log(user + 'repos:');
        githuh.repos(function(repos){
        	repos.forEach((repo) => {console.log(repos)});
        });
        
    } else if (command === "stars") {
    	console.log(user + 'Starred repos');
    	githuh.stars(function(stars){
    		stars.forEach((star) => {console.log(stars)});
    	})
        
    } else if (command === "profile") {
    	console.log(user + 'Profile:');
    	githuh.profile(function(profile){
    		stars.forEach((profile) => {console.log(profile)});
        })
        
    } else if (command === "followers") {
        console.log(user + 'Followers:');
    	githuh.stars(function(followers){
    		stars.forEach((follower) => {console.log(follower)});
        })
    } else {
        program.help();
    }
}