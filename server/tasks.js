// some hardcoded constants
SUBMIT_TIME_OUT = 10; // in seconds
CONTEST_END_TIME = Date.UTC(2013, 4, 23, 10, 0, 0); // UTC date

// tasks for this ctf
// note that names are expected to be unique and contain no whitespaces
tasks = [
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
	},
	{
		name: 'mount',
		category: 'Forensics',
		description: 'I store my flag in this <a href="https://www.dropbox.com/s/xeu61pija9t9mcn/for-50-08a4743c2e4a99d20af95f8c642a4697" target="_blank">file</a>, please find it.',
		value: 50,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'This_was_S0000_simPL3!');
		}
	},
	{
		name: 'excel',
		category: 'Forensics',
		description: 'I got this <a href="https://www.dropbox.com/s/v4yr70wsxfph6zx/for-50-2-9d77207b9490d5e9d43197be98d8608b" target="_blank">file</a> from my enemy.</br> Can you check it for viruses and other evil staff?',
		value: 50,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '3vil_maKKKr0s_I5_v3333rY_3vIl');
		}
	},
	{
		name: 'excel_returns',
		category: 'Forensics',
		description: 'Wow, I\'ve seen a person editing this <a href="https://www.dropbox.com/s/r8vrtre3vr1a4jo/for-100-05eaeaada3940223fc2a56d592e3df2c" target="_blank">file</a>,<br> but it is kind of empty now. Can you check it out?',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '3xc3l_|s_s0_serious');
		}
	},
	{
		name: 'forest',
		category: 'Forensics',
		description: 'Please, find my key in this <a href="https://www.dropbox.com/s/8x12p8m11zg3yri/for-200-55db916996935e45ffe4f2459ddeeea2" target="_blank">forest</a>! PS: 0 - left, 1 - right.',
		value: 200,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'deEp_s3aRCh-m4St#r');
		}
	},
	{
		name: 'order',
		category: 'Forensics',
		description: 'Hi! I want to replace something in my notebook, but I forgot order of these <a href="https://www.dropbox.com/s/oiq9gjian357pjm/for-300-af5d6f419893659a042229419cbc470f" target="_blank">photos</a>,</br> could you help me?',
		value: 300,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'pl34sE_don_t_use_scr3wdr|v3r_i_do_not_d3s3rvE_it');
		}
	},
	{
		name: 'resurrection',
		category: 'Forensics',
		description: 'Our <a href="https://www.dropbox.com/s/xidi9achphm2s1j/for-400-f5918a911f23118812e5f8d9fc67f366.rar" target="_blank">database</a> was badly damaged by unknown hackers.</br> It looks like they are playing with us, because they haven\'t deleted all files</br> and encrypted some files names of the rest.</br> See if you can find anything that wasn\'t corrupted.<br> Send the flag in uppercase letters without any whitespaces.',
		value: 400,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return(flag === 'NOTHINGTODOHERE11');
		}
	},
	{
		name: 'bindata',
		category: 'Crypto',
		description:'Get a <a href="https://www.dropbox.com/s/r3iu5ilhwbg42hp/cry-100-40ca18537878a487df2d8adcac34b82c" target="_blank">flag</a>.',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'x0r_XoR_xO_x0');
		}
	},
	{
		name: 'templars',
		category: 'Crypto',
		description: 'We got <a href="https://www.dropbox.com/s/8zqx1wkchyugmek/cry100-844e2f93c36a0ae2c92038b1d5333665.JPG" target="_blank">this</a> ' +
						'from Knights Templar hideout. What are they planning?',
		value: 200,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag.toUpperCase() === 'HAVEYOUPLAYEDFOREZIO');
		}
	},
	{
		name: 'moveit',
		category: 'Crypto',
		description: 'Classical cipher like l33t ' +
				'<a href="https://www.dropbox.com/sh/2wll8vvwy4hf23c/KeNdXRDPUc/crypto200_encrypted.txt" target="_blank">task</a>',
		value: 150,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'cryptool_0r_manu4l');
		}
	},
	{
		name: 'kryptozz',
		category: 'Crypto',
		description: 'Give sequence of digits in geolocation from <a href="https://www.dropbox.com/s/rjf7kmzgy5zw9jq/crypto50.jpg" target="_blank">part2</a> of plaintext.',
		value: 50,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '38576577844');
		}
	},
	{
		name: 'keyasker',
		category: 'Binary',
		description: 'Get a key, pleeeeeeease! <a href="/aa2b3d769140c440e44fcfeba3757081" target="_blank">file</a>',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '69ccc0dd616f12d151525fc9f753ec9f');
		}
	},
	{
		name: 'greeter1',
		category: 'Binary',
		description: 'This service just says hello to everyone! I hate it! Do something with it!<br>ssh user@ctf.h34dump.com -p22200<br>pass: user',
		value: 200,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '0v3rfl0wn_buff3r_1s_s0_cu7e');
		}
	},
	{
		name: 'greeter2',
		category: 'Binary',
		description: 'Another damned service!<br>ssh user@ctf.h34dump.com -p22201<br>pass: user',
		value: 300,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'c4r3ful_w1th_f0rm4t');
		}
	},
	{
		name: 'misa_encoding',
		category: 'Crypto',
		description: 'misa sent me this <a href="/bd72715c3eeb690fee8cdd4642d61c1e" target="_blank">letter</a> recently. Does it mean anything?<br>(flag is md5(decoded_letter))',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === '474e9b1cf54cd2581bbdabe111fff13c');
		}
	},
	{
		name: 'qrcode',
		category: 'Stegano',
		description: 'No, it\'s not what you think. Get a <a href="https://www.dropbox.com/s/9j50suo5v9jrsji/qrcode.png" target="_blank">flag</a>',
		value: 100,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'U_R_r3333333333333Ly_$T360_m4St4');
		}
	},
	{
		name: 'h4x0r_library',
		category: 'Web',
		description: '<a href=\'/web1/\'>link</a>',
		value: 200,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'l0c4l_c0d3_3x3cut10n_1s_f1n3');
		}
	},
	{
		name: 'h4x0rs_food',
		category: 'Web',
		description: '<a href=\'/web0/\'>link</a>',
		value: 50,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'c00k13s_4r3_t4sty_4nd_h34lthy');
		}
	},
	{
		name: 'gnp',
		category: 'Stegano',
		description: 'Another stupid stegano task. Here, <a href="/3ba2b0efa06a6423c6dd513259bfd900" target="_blank">get it</a>.',
		value: 300,
		available: true,
		solved: 0,
		hints: [],

		checkFlag: function(flag) {
			return (flag === 'f1r5T_l4dy_0f_t3h_1nT3rn3t');
		}
	},
	{
		name: 'virtual',
		category: 'Admin',
		description: 'Get a flag from <a href="https://www.dropbox.com/s/j1s64xszrxqu75f/admin.zip" target="_blank">this</a>.',
		value: 300,
		available: true,
		solved: 0,
		hints: [],
		
		checkFlag: function(flag) {
			return (flag === 'L1ttL3_th1ngz_4ff3ct_l1ttL3_m1ndz');
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
			Tasks.update({name: task.name}, {$set: _.omit(task, 'checkFlag', 'solved')});
		}
	});

	// fix fields names
	Meteor.users.update(
		{ 'profile.solved_tasks': { $exists: false}},
		{ $set: {
			'profile.solved_tasks': [],
			'profile.last_submit': 0,
			'profile.last_success': 0 }
		}
	);

	Submits.find({}).forEach(function(t) {
			console.log(t);
		}
	);
});

