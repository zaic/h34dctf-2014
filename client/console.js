var commands = {
	tasks: {
		processFunc: function(callback) {
            if (new Date() < CONTEST_START_TIME) {
                return "The contest hasn't started yet.";
            }

			var categories = {};
			//{ Binary: { objects: [taskName], maxLength: 10 } }
			var maxTasksPerCategory = 0;
			var result = '';
			Tasks.find({}, {sort: [["value", "asc"], ["name", "asc"]]}).forEach(function(task) {
				var displayName = task.name + ' (' + task.value.toString() + '/' + task.solved.toString() + ')';
				var realLength = displayName.length;
				var user = Meteor.user();
				if (user && _.contains(user.profile.solvedTasks, task.name)) {
					displayName = '<s>' + displayName + '</s>';
				}
				var obj = {displayName: displayName, realLength: realLength};
				if (task.category in categories) {
					categories[task.category].objects.push(obj);
					if (categories[task.category].maxLength < obj.realLength) {
						categories[task.category].maxLength = obj.realLength;
					}
					if (categories[task.category].objects.length > maxTasksPerCategory) {
						maxTasksPerCategory = categories[task.category].objects.length;
					}
				} else {
					categories[task.category] = {
						objects: [obj],
						maxLength: Math.max(task.category.length, obj.realLength)
					};
					if (maxTasksPerCategory === 0) { ++maxTasksPerCategory; }
				}
			});

			var categoryPairs = _.pairs(categories);
			categoryPairs = _.sortBy(categoryPairs, function(pair) {
				return pair[0];
			});

			var table = '';

			var delimeter = '';
			_.each(categoryPairs, function(pair) {
				delimeter += '+' + '-'.repeat(pair[1].maxLength + 2);
			});
			delimeter += '+<br>';

			table += delimeter;
			//Header names
			_.each(categoryPairs, function(pair) {
				var category = pair[1];
				var categoryName = pair[0];
				table += '|' + '&nbsp;' + categoryName + '&nbsp;'.repeat(category.maxLength - categoryName.length + 1);
			});
			table += '|<br>';
			table += delimeter;

			var addCategory =
				function(categoryPair) {
					var categoryName = categoryPair[0];
					var category = categoryPair[1];
					if (i < category.objects.length) {
						table += '|' + '&nbsp;' + category.objects[i].displayName +
								'&nbsp;'.repeat(category.maxLength - category.objects[i].realLength + 1);
					} else {
						table += '|' + '&nbsp;'.repeat(category.maxLength + 2);
					}
				};
			for (var i = 0; i < maxTasksPerCategory; ++i) {
				_.each(categoryPairs, addCategory);
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
			Meteor.call('checkFlag', task_name, flag, function(error, result) {
				callback(result);
			});
			return "";
		},

		isAvailable: function() {
			return (new Date() > CONTEST_START_TIME);
		},

		help: '<task_name> <flag> - tries to submit given flag'
	},

	show: {
		processFunc: function(task_name, callback) {
			var task = Tasks.findOne({name: task_name});
			if (typeof(task) !== 'undefined') {
				var result = '';
				result = task.description;
				if (task.hints && task.hints.length !== 0) {
					result += '<br><br><b>Hints for this task:</b>';
					_.each(task.hints, function(hint) {
						result += '<br>- ' + hint;
					});
				}
				return result;
			}
			return 'There is no such task';
		},

		isAvailable: function() {
			return (new Date() > CONTEST_START_TIME);
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

	timeleft: {
		processFunc: function(callback) {
			var getDistanceInNiceFormat = function(t) {
				t = Math.round(t / 1000);
				var h = ('0' + (Math.round(t / 3600))).slice(-2);
				t %= 3600;
				var i = ('0' + (Math.round(t / 60))).slice(-2);
				var s = ('0' + (t % 60)).slice(-2);
				return h + ":" + i + ":" + s;
			};
			Meteor.call('getEndTime', function(error, result) {
				callback(getDistanceInNiceFormat(result));
			});
			return "...";
		},

		isAvailable: function() {
			return true;
		},

		help: ' - shows how much time left until competition ends'
	},

	hints: {
		processFunc: function() {
			var tasks = Tasks.find({});
			var hintsStr = '';
			tasks.forEach(function(task) {
				if (task.hints && task.hints.length !== 0) {
					if (hintsStr.length !== 0) {
						hintsStr += '<br>';
					}
					_.each(task.hints, function(hint, index) {
						if (index === 0) {
							hintsStr += '<b>' + task.name + '</b> - ';
						} else {
							hintsStr += '<br>' + '&nbsp;'.repeat(task.name.length + 3);
						}
						hintsStr += hint;
					});
				}
			});
			if (hintsStr.length === 0) {
				return 'No hints available yet :(';
			}
			return hintsStr;
		},

		isAvailable: function() {
			return true;
		},

		help: ' - shows full list of available hints'
	},

	help: {
		processFunc: function(callback) {
			var result = '';
			var availableCommands = _.filter(_.pairs(commands), function(commandPair) {
				return commandPair[1].isAvailable();
			});
			availableCommands = _.sortBy(availableCommands, function(commandPair) {
				return commandPair[0];
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
	var words = command.split(/\s+/);
	commandName = words[0];
	commandArgs = words.slice(1);

	var result = '';

	if (!(commandName in commands) || !commands[commandName].isAvailable()) {
		result = 'Unknown command. Try help.';
	} else if (commandArgs.length < commands[commandName].processFunc.length - 1) {
		result = 'Not enough arguments. Try help.';
	} else {
		var argsCnt = commands[commandName].processFunc.length;
		if (commandName == 'show') argsCnt = 2;
		commandArgs = _.first(commandArgs, argsCnt - 1);
		commandArgs.push(callback);
		result = commands[commandName].processFunc.apply(this, commandArgs);
	}

	return result;
};

Template.console.rendered = function() {
	$('#console_input').focus();

	var $resultsWrapper = $('.results_wrapper');
	$resultsWrapper.scrollTop($resultsWrapper.prop("scrollHeight"));
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
