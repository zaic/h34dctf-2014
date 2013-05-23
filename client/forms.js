Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.login.events({
	'click #submit_register': function(event) {
		var $form = $('#create>fieldset');
		$('#register-error').hide();
		try {
			Accounts.createUser({
				username: $form.find('input[name=team]').val(),
				email: $form.find('input[name=email]').val(),
				password: $form.find('input[name=password]').val(),
				profile: {
					from_novosib: $form.find('input[name=from_novosib]').is(':checked'),

					// for teams from Nsk
					team_size: $form.find('input[name=team_size]').val(),
					notebooks: $form.find('input[name=notebooks]').val(),

					// for other teams
					country: $form.find('input[name=country]').val(),

					// contest info
					solved_tasks: [], //< list of ids of solved tasks
					score: 0, // score :)
					last_success: 0, //< date of last successfully solved task
					last_submit:  0  //< date of last submit
				}
			}, function(error) {
				if (error) {
					setRegisterError(error);
				}
			});
		} catch(e) {
			setRegisterError(e);
		}
		return false;
	},

	'click #submit_login': function(event) {
		var $form = $('#login>fieldset');
		$('#login-error').hide();
		Meteor.loginWithPassword(
			$form.find('input[name=team]').val(),
			$form.find('input[name=password]').val(),
			function(error) {
				if(error) {
					setLoginError(error);
				}
			}
		);
		return false;
	},

	'change #from_novosib': function(event) {
		if ($('#from_novosib').is(':checked')) {
			$('#team_size').css('display','block');
			$('#notebooks').css('display', 'block');
		} else {
			$('#team_size').css('display', 'none');
			$('#notebooks').css('display', 'none');
		}
	}
});

function setRegisterError(error) {
	$('#registerError').html(error.toString());
	$('#register-error').show();
}

function setLoginError(error) {
	$('#loginError').html(error.toString());
	$('#login-error').show();
}

Template.login.teams = function() {
var i = 1;
    return Meteor.users.find({}).map(function(user) {
        return _.extend(user, {number: i++});
    });
};
