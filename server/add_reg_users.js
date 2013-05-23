Meteor.startup(function() {
	if (Meteor.users.find({username: 'macox'}).count() === 0) {
		Accounts.createUser({
			username: 'macox',
			email: 'macox@macox.com',
			password: 'lololo',
			profile: {
				from_novosib: true,

				// for teams from Nsk
				team_size: 1,
				notebooks: 0,

				// for other teams
				country: 'Russia',

				// contest info
				solved_tasks: [], //< list of ids of solved tasks
				score: 0, // score :)
				last_success: 0, //< date of last successfully solved task
				last_submit:  0  //< date of last submit
			}
		});
	}
	if (Meteor.users.find({username: 'deema'}).count() === 0) {
		Accounts.createUser({
			username: 'deema',
			email: 'deema@deema.com',
			password: '1q2w3e',
			profile: {
				from_novosib: true,

				// for teams from Nsk
				team_size: 1,
				notebooks: 0,

				// for other teams
				country: 'Russia',

				// contest info
				solved_tasks: [], //< list of ids of solved tasks
				score: 0, // score :)
				last_success: 0, //< date of last successfully solved task
				last_submit:  0  //< date of last submit
			}
		});
	}
});