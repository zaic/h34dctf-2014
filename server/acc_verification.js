var lateUsers = {
    "zaic": "pass",
	"guest": "guest",
	"test": "test"
};

Meteor.startup(function() {

	_.each(_.pairs(lateUsers), function(userPair){
		var login = userPair[0];
		var pass = userPair[1];
		var email = login + '@' + login + '.com';

		if (Meteor.users.find({username: login}).count() === 0) {
			Accounts.createUser({
				username: login,
				email: email,
				password: pass,
				profile: {
					from_novosib: true,

					// for teams from Nsk
					team_size: 1,
					notebooks: 0,

					// for other teams
					country: 'Russia',

					// contest info
					solvedTasks: [], //< list of ids of solved tasks
					score: 0, // score :)
					last_success: 0, //< date of last successfully solved task
					last_submit:  0  //< date of last submit
				}
			});
		}
	});
});

Accounts.validateNewUser(function(user) {
/*
	if (!user.username || !(user.username in lateUsers)) {
		return false; // registration is disabled during ctf
	}
*/

	if (!user.profile) {
		throw new Meteor.Error(403, 'Profile required');
	}

	var username = user.username;
	if (!username || typeof(username) !== 'string' || username.length < 0 || username === 'h34dump') {
		throw new Meteor.Error(403, 'Bad username');
	}

	if (!user.emails || user.emails.length < 1 || !user.emails[0].address) {
		throw new Meteor.Error(403, 'Email required');
	}

	var email = user.emails[0].address;
	var emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRe.test(email) && email !== 'stub') {
		throw new Meteor.Error(403, 'Bad email');
	}

	var fromNovosib = user.profile.from_novosib;
	if (typeof(fromNovosib) !== 'boolean') {
		throw new Meteor.Error(403, 'Bad checkbox value');
	}

	if (fromNovosib) {
		if (!(parseInt(user.profile.team_size, 10) > 0)) {
			throw new Meteor.Error(403, 'Team size cannot be less than 1');
		}
	}

	return true;
});
