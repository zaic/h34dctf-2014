// tasks for this ctf
// note that names are expected to be unique and contain no whitespaces
tasks = [
	{
		name: 'cow_level',
		category: 'Stegano',
		description: 'Secret <a href="moo">cow level</a>',
		value: 150,
		available: true,

		checkFlag: function(flag) {
			return (flag.replace('O', '0') === '4ND_n07_a_5iNgl3_c0w_wa5_GIv3n_7h@t_Day');
		}
	},
	{
		name: 'templars',
		category: 'Crypto',
		description: 'We got <a href="1fd6cd66ae5c983793914eae882ec942.JPG">this</a> ' +
						'from Knights Templar hideout. What are they planning?',
		value: 100,
		available: true,

		checkFlag: function(flag) {
			return (flag.toUpperCase() === 'HAVEYOUPLAYEDFOREZIO');
		}
	}
];

Meteor.methods({
	checkFlag: function(task_name, flag) {
		task = _.where(tasks, {name: task_name});

		user = Meteor.user();
		if (!user) { return false; }

		if (task.length !== 0) {
			if (task[0].checkFlag(flag) && !(Tasks.findOne({name: task[0].name})._id in user.profile.solvedTasks)) {
				//TODO: add to solved tasks, update lastSuccess
			}
		}
		return false;
	}
});

Meteor.startup(function() {
	_.each(tasks, function(task) {
		if (Tasks.find({name: task.name}).count() === 0) {
			Tasks.insert(_.omit(task, 'checkFlag'));
		} else {
			Tasks.update({name: task.name}, _.omit(task, 'checkFlag'));
		}
	});
});