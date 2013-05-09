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

Template.login.teams = function() {
    return Meteor.users.find({});
};

Template.login.created = function() {
	toggleAnimation();
};

Template.login.destroyed = function() {
	toggleAnimation();
};

Meteor.startup(function() {
    Meteor.subscribe("teams");
});

var handle = false;
var textBrightness = 50;
var fireCount = 6;
var fireDelta = [];
var step = 0;
var angle = 0;
var radius = 6;

function animate()
{
	fireDelta[fireCount - step] = Math.random() * 2 - 1;
	var e = $("#fire");
	var s = "";
	for (var i = 0; i < fireCount; i++)
	{
		if (s) s += ", ";
		s += Math.round(fireDelta[(i + fireCount - step) % fireCount] * i) + "px " + (-2 * i -1) + "px " + (2 + i) + "px ";
		s += "rgb(255, " + (255 - i * Math.floor(255 / (fireCount - 1))) + ", 0)";
	}
	e.css('textShadow', s);
	/* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
	e.css('color', "rgb(" +
		(textBrightness + step % 2) + ", " +
		textBrightness + ", " +
		textBrightness + ")");
	step = (step + 1) % fireCount;

	/* RGB */
	angle -= 0.4;
	if (angle <= 0) angle = Math.PI * 2;
	e = $("#rgb");
	s =
		Math.round(Math.sin(angle) * radius) + "px " +
		Math.round(Math.cos(angle) * radius) + "px 4px #33F, " +
		Math.round(Math.sin(angle + Math.PI * 4 / 3) * radius) + "px " +
		Math.round(Math.cos(angle + Math.PI * 4 / 3) * radius) + "px 4px #F00, " +
		Math.round(Math.sin(angle + Math.PI * 2 / 3) * radius) + "px " +
		Math.round(Math.cos(angle + Math.PI * 2 / 3) * radius) + "px 4px #0F0";
	e.css('textShadow', s);
	/* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
	e.css('color', "rgb(" + (255 - step % 2) + ", 255, 255)");
}

function toggleAnimation()
{
	for (var i = 0; i < fireCount; i++)
		fireDelta[i] = Math.random() * 2 - 1;
	if (handle)
	{
		Meteor.clearInterval(handle);
		handle = false;
	}
	else
		handle = Meteor.setInterval(function() { animate(); }, 100);
	return false;
}
