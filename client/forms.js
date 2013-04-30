Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.login.events({
	'click #submit_register': function(event) {
		var $form = $('#create>fieldset');

		Accounts.createUser({
			username: $form.find('input[name=team]').val(),
			email: $form.find('input[name=email]').val(),
			password: $form.find('input[name=password]').val(),
			profile: {
				from_novosib: $form.find('input[name=from_novosib]').val(),
				team_size: $form.find('input[name=team_size]').val(),
				notebooks: $form.find('input[name=notebooks]').val(),

				solvedTasks: [], //< list of ids of solved tasks
				lastSuccess: 0 //< date of last successfully solved task
			}
		}, function(error) {
			if (error) {
				alert(error); //TODO: beautiful error
			}
		});
		return false;
	},

	'click #submit_login': function(event) {
		var $form = $('#login>fieldset');
		Meteor.loginWithPassword(
			$form.find('input[name=team]').val(),
			$form.find('input[name=password]').val(),
			function(error) {
				if(error) {
					alert(error); //TODO: beautiful error
				}
			}
		);
		return false;
	}
});