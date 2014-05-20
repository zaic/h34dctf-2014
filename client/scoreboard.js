Template.scoreboard.teams = function() {
    var accepted_nsk = Session.equals('scoreboard_teams', 'nsk') ? [true, false] : [true, false];
    var teams = Meteor.users.find({'profile.from_novosib': {$in: accepted_nsk}}, {sort: [['profile.score', 'desc'], ['profile.last_success', 'asc']]});

    var last_score   = -1;
    var last_time    = -1;
    var last_rank    = -1;
    var current_rank =  1;
    return teams.map(function (team) {
        if(last_score != team.profile.score || last_time != team.profile.last_success) {
            last_score = team.profile.score;
            last_time  = team.profile.last_success;
            last_rank  = current_rank;
        }
        current_rank += 1;
		var t = new Date(0);
		if (team.profile.last_success > 0) {
			t.setUTCSeconds(team.profile.last_success);
			t = getTimeInNiceFormat(t);
		} else {
			t = "-";
		}
        return {
            rank: last_rank,
            team: team.username,
            country: team.profile.country,
            score: team.profile.score,
            last_success: t
        };
    });
};

Template.scoreboard.isNskOnly = function() {
    return Session.equals('scoreboard_teams', 'nsk');
};

Template.scoreboard.events({
	// TODO set checkbox to need
	'change #nsk_only': function(event) {
	    Session.set('scoreboard_teams', $('#nsk_only').is(':checked') ? 'nsk' : 'all');
	}
});
