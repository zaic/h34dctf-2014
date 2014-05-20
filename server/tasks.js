// tasks for this ctf
// note that names are expected to be unique and contain no whitespaces
tasks = [
	{
		name: 'lvm',
		category: 'Admin',
		description: '<a href="bfc3f01a37bbb2dce6f611bc71cb35ef">Task</a>.',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'flag_is_zfs_better_lvm' || flag === 'zfs_better_lvm');
		}
	},
    {
		name: 'passwd',
		category: 'Binary',
		description: 'This tool ask me for a password! Hack <a href="a6fb82b4cf21ef7a51a3e606127a93e7">it</a>!.',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'flag_is_wonderful_binary_task' || flag === 'wonderful_binary_task');
		}
	},
    {
		name: 'love',
		category: 'Binary',
		description: 'All you need is love. And some star wars. <a href="04e08f6b9fa76abdfdb5fb2baee58dc2">Here</a>.',
		value: 300,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '=======M@ke_1oVe_n0t_VV@r=======');
		}
	},
    {
		name: 'windows',
        category: 'Stegano',
		description: 'Windows 8 is amazing, <a href="0deb22024281d7d7b1aec9829ed2f598">right</a>?',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'flag_is_least_significant_bit' || flag === 'least_significant_bit');
		}
	},

	{
		name: 'cow_level',
		category: 'Stegano',
		description: 'Secret <a href="79805faac89d408d0c4c73b465cac3ce" target="_blank">cow level</a>',
		value: 150,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag.replace('O', '0') === '4ND_n07_a_5iNgl3_c0w_wa5_GIv3n_7h@t_Day');
		}
	},
	{
		name: 'suit',
		category: 'Stegano',
		description: 'I\'ve purchased a ticket to this film, but to get a ticket I need a password from my account.</br> I store it in this <a href="https://www.dropbox.com/s/wb0qcc370eh7r1v/steg-200-1b860c12edb1e5b8d1e46a9ddc87a09a.jpg" target="_blank">picture</a>.</br> Unfortunately, I forgot what should I do to extract the password from this picture. Help me!',
		value: 200,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'd0eS_th3_m4n_makE_t4e_suit');
		}
	}
];

Meteor.methods({
	checkFlag: function(task_name, flag) {
		user = Meteor.user();
		if (!user) {
			return "Unauthorized!!11";
		}


		var curr_submit_time = Math.round(new Date().getTime() / 1000); // current time in seconds
		var last_submit_time = Meteor.user().profile.last_submit;
		if(typeof(last_submit_time) === 'undefined') { last_submit_time = 0; }
		if(curr_submit_time < last_submit_time + SUBMIT_TIME_OUT) {
			return "Too many attempts, please wait " + (last_submit_time + SUBMIT_TIME_OUT - curr_submit_time).toString() + " seconds.";
		}
		Meteor.users.update({_id: Meteor.user()._id}, {
			$set: { 'profile.last_submit': curr_submit_time }
		});

		task = _.where(tasks, {name: task_name, available: true});
		if (task.length === 0) {
			return "Invalid task";
		}

		Submits.insert({'team': user.username, 'task': task_name, 'flag': flag, 'time': curr_submit_time});
		if (typeof(flag) !== 'string' || !task[0].checkFlag(flag)) {
			return "It's wrong :(";
		}

		if(user.profile.solved_tasks.indexOf(task_name) !== -1) {
			return "Task already solved :)";
		}

		if (new Date() > CONTEST_END_TIME) {
			return "The flag is correct but our contest is finished.";
		}

		Meteor.users.update({_id: Meteor.user()._id}, {
			$inc: { 'profile.score': task[0].value },
			$push: { 'profile.solved_tasks': task_name },
			$set: { 'profile.last_success': curr_submit_time }
		});
		Tasks.update({name: task_name}, {$inc: { solved: 1} });
		return 'Congratulations! +' + task[0].value.toString() + ' points ^_^';
	},

	getEndTime: function() {
		var curDate = new Date();
		if (curDate > CONTEST_END_TIME) {
			return new Date(0);
		}
		return (CONTEST_END_TIME - curDate);
	}
});

Meteor.publish(null, function() {
	return Tasks.find({'available': true}, {fields: {
		name: 1,
		category: 1,
		description: 1,
		value: 1,
		available: 1,
		solved: 1,
		hints: 1
	}});
});

Meteor.startup(function() {
	_.each(tasks, function(task) {
		if (Tasks.find({name: task.name}).count() === 0) {
			Tasks.insert(_.omit(task, 'checkFlag'));
		} else {
			var omitFields = ['checkFlag', 'solved'];
			if (!task.hints || task.hints.length === 0) {
				omitFields.push('hints');
			}
			Tasks.update({name: task.name}, {$set: _.omit(task, omitFields)});
		}
	});

	// fix fields names
	Meteor.users.update(
		{ 'profile.solved_tasks': { $exists: false}},
		{ $set: {
			'profile.solved_tasks': [],
			'profile.last_submit': 0,
			'profile.last_success': 0 }
		},
		{ multi: true }
	);

	Submits.find({}).forEach(function(t) {
		console.log(t);
	});
});

