Accounts.validateNewUser(function(user) {
	// username, password, email, country are required
	if (!(user.username && user.username.length > 0)) {
		throw new Meteor.Error(501, 'Username required');
	}
	if (!(user.emails && user.emails[0].address.length > 0)) {
		throw new Meteor.Error(502, 'Email required');
	}
	if (!(user.profile && user.profile.country.length > 0)) {
		throw new Meteor.Error(503, 'Country required');
	}
	if (user.profile.from_novosib == 'on') {
		if (!(parseInt(user.profile.team_size, 10) > 0)) {
			throw new Meteor.Error(504, 'Team size cannot be less 1');
		}
	}
	//console.log(JSON.stringify(user));
	return true;
});