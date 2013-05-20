// tasks for this ctf
// note that names are expected to be unique and contain no whitespaces
tasks = [
	{
		name: 'cow_level',
		category: 'Stegano',
		description: 'Secret <a href="moo">cow level</a>',
		value: 150,
		available: true,
		solved: 0,

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
		solved: 0,

		checkFlag: function(flag) {
			return (flag.toUpperCase() === 'HAVEYOUPLAYEDFOREZIO');
		}
	}
];

Meteor.methods({
	checkFlag: function(task_name, flag) {
		user = Meteor.user();
		if (!user) {
			return "Unauthozied!!11";
		}

		var curr_submit_time = Math.round(new Date().getTime() / 1000); // current time in seconds
		var last_submit_time = Meteor.user().profile.last_submit;
		if(last_submit_time == undefined) { last_submit_time = 0; }
		if(curr_submit_time < last_submit_time + 10) {
			return "Too many attempts, please wait " + (last_submit_time + 10 - curr_submit_time).toString() + " seconds.";
		}
		Meteor.users.update({_id: Meteor.user()._id}, {
			$set: { 'profile.last_submit': curr_submit_time }
		});

		task = _.where(tasks, {name: task_name, available: true});
		if (task.length === 0) { 
			return "Invalid task"; 
		}

		if (!task[0].checkFlag(flag)) {
			return "It's wrong :("; 
		}

		if(!(task_name in user.profile.solved_tasks)) {
			return "Task already solved :)";
		}

		Meteor.users.update({_id: Meteor.user()._id}, {
			$inc: { 'profile.score': task[0].value }, 
			$push: { 'profile.solved_tasks': task_name },
			$set: { 'profile.last_success': curr_submit_time }
		});
		//TODO: add to ok_count in tasks
		return 'Congratulations! +' + task[0].value.toString() + ' points ^_^';
	}
});

Meteor.publish(null, function() {
	return Tasks.find({'available': true}, {fields: {
		'name': 1,
		'category': 1,
		'description': 1,
		'value': 1
	}})
});

Meteor.startup(function() {
	// TODO: follow code can broke all stat when server crashed
	_.each(tasks, function(task) {
		if (Tasks.find({name: task.name}).count() === 0) {
			Tasks.insert(_.omit(task, 'checkFlag'));
		} else {
			Tasks.update({name: task.name}, _.omit(task, 'checkFlag'));
		}
	});
});

