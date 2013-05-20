var commands = {
	tasks: {
		processFunc: function(callback) {
			var categories = {};
			//{ Binary: { objects: [taskName], maxLength: 10 } }
			var maxTasksPerCategory = 0;
			var result = '';
			Tasks.find({}, {sort: {'value': 1}}).forEach(function(task) {
				var dispalyName = task.name + ' (' + task.value.toString() + ')';
				if (task.category in categories) {
					categories[task.category].objects.push(dispalyName);
					if (categories[task.category].maxLength < dispalyName.length) {
						categories[task.category].maxLength = dispalyName.length;
					}
					if (categories[task.category].objects.length > maxTasksPerCategory) {
						maxTasksPerCategory = categories[task.category].objects.length;
					}
				} else {
					categories[task.category] = {
						objects: [dispalyName],
						maxLength: Math.max(task.category.length, dispalyName.length)
					};
					if (maxTasksPerCategory === 0) { ++maxTasksPerCategory; }
				}
			});

			var table = '';

			var delimeter = '';
			_.each(categories, function(category) {
				delimeter += '+' + '-'.repeat(category.maxLength + 2);
			});
			delimeter += '+<br>';

			table += delimeter;
			//Header names
			_.each(categories, function(category, categoryName) {
				table += '|' + '&nbsp;' + categoryName + '&nbsp;'.repeat(category.maxLength - categoryName.length + 1);
			});
			table += '|<br>';
			table += delimeter;

			var addCategory =
				function(category, categoryName) {
					if (i < category.objects.length) {
						table += '|' + '&nbsp;' + category.objects[i] +
								'&nbsp;'.repeat(category.maxLength - category.objects[i].length + 1);
					} else {
						table += '|' + '&nbsp;'.repeat(category.maxLength + 2);
					}
				};
			for (var i = 0; i < maxTasksPerCategory; ++i) {
				_.each(categories, addCategory);
				table += '|<br>';
			}
			table += delimeter;

			return table;
		},

		isAvailable: function() {
			return true;
		},

		help: '- displays list of tasks'
	},

	flag: {
		processFunc: function(task_name, flag, callback) {
			var task = Tasks.findOne({name: task_name});
			if (!task) {
				return 'There is no such task';
			}
			//TODO: check if flag was already passed
			Meteor.call('checkFlag', task_name, flag, function(error, isCorrect) {
				if (error) {
					callback('Some error has occured :(');
				} else if (isCorrect) {
					callback('Congratulations! +' + task.value.toString() + ' points');
				} else {
					callback('It\'s wrong :(');
				}
			});
			return '<Checking...>';
		},

		isAvailable: function() {
			return true;
		},

		help: '<task_name> <flag> - tries to submit given flag'
	},

	show: {
		processFunc: function(task_name, callback) {
			var task = Tasks.findOne({name: task_name});
			if (typeof(task) !== 'undefined') {
				return task.description;
			}
			return 'There is no such task';
		},

		isAvailable: function() {
			return true;
		},

		help: '<task_name> - shows task description'
	},

	logout: {
		processFunc: function() {
			Meteor.logout();
			return 'OK';
		},

		isAvailable: function() {
			return true;
		},

		help: ' - logs out from current session'
	},

	scoreboard: {
		processFunc: function() {
            var win = window.open('/scoreboard', '_blank');
            win.focus();

			return "opened";
		},

		isAvailable: function() {
			return true;
		},

		help: ' - shows scoreboard'
	},

	myrank: {
		processFunc: function() {
			return 'Not implemented'; //TODO
		},

		isAvailable: function() {
			return false; //TODO: true
		},

		help: ' - shows your team rank'
	},

	timeleft: {
		processFunc: function() {
			return 'Not implemented'; //TODO
		},

		isAvailable: function() {
			return false; //TODO: true
		},

		help: ' - shows how much time left until competition ends'
	},

	help: {
		processFunc: function(callback) {
			var result = '';
			var availableCommands = _.filter(_.pairs(commands), function(commandPair) {
				return commandPair[1].isAvailable();
			});
			_.each(availableCommands, function(commandPair, commandName) {
				result += _.escape(commandPair[0]) + ' ' +
							_.escape(commandPair[1].help) + '<br>';
			});
			return result;
		},

		isAvailable: function() {
			return true;
		},

		help: '- displays list of available commands'
	}
};

var processCommand = function(command, callback) {
	//TODO: better parsing (quoted strings etc.)
	var words = command.split(/\s+/);
	commandName = words[0];
	commandArgs = words.slice(1);


	var result = '';

	if (!(commandName in commands) || !commands[commandName].isAvailable()) {
		result = 'Unknown command. Try help.';
	} else if (commandArgs.length < commands[commandName].processFunc.length - 1) {
		result = 'Not enough arguments. Try help.';
	} else {
		commandArgs = _.first(commandArgs, commands[commandName].processFunc.length - 1);
		commandArgs.push(callback);
		result = commands[commandName].processFunc.apply(this, commandArgs);
	}

	return result;
};

Template.console.rendered = function() {
	$('#console_input').focus();
};

Template.console.outputs = function() {
	return Session.get('console_results');
};

Template.console.events({
	'keyup #console_input': function(event) {
		var $input = $('#console_input');
		var history;
		if (event.which === 13 || event.which === 10) { //Enter
			var command = $input.val();
			command = command.trim();

			//Ignore empty input
			if (command.length === 0) { return; }

			var results = Session.get('console_results');

			var resultIndex = results.length;

			// Some commands may return intermediate result when command
			// needs to be processed on server side asynchronously.
			// To handle this we provide a callback which will update result
			// when client gets response
			var result = processCommand(command, function(updatedResult) {
				var results = Session.get('console_results');
				results[resultIndex].result = updatedResult;
				Session.set('console_results', results);
			});

			results.push({
				command: command,
				result: result
			});
			Session.set('console_results', results);

			history = Session.get('console_history');
			history.push(command);
			Session.set('console_history', history);

			Session.set('console_pointer', Session.get('console_history').length);

			$input.val('');
		} else if (event.which === 38) { //Up
			currentPointer = Session.get('console_pointer');

			if (currentPointer > 0) {
				history = Session.get('console_history');
				if (currentPointer < history.length) {
					history[currentPointer] = $input.val();
				} else {
					history.push($input.val());
				}
				Session.set('console_history', history);
				Session.set('console_pointer', currentPointer - 1);
				$input.val(history[currentPointer - 1]);
			}
		} else if (event.which === 40) { //Down
			currentPointer = Session.get('console_pointer');

			if (currentPointer < Session.get('console_history').length) {
				history = Session.get('console_history');
				history[currentPointer] = $input.val();
				Session.set('console_history', history);
				if (currentPointer + 1 < history.length) {
					$input.val(history[currentPointer + 1]);
				} else {
					$input.val('');
				}
				Session.set('console_pointer', currentPointer + 1);
			}
		}
	}
});
