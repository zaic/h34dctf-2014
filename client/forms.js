Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.login.events({
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
