Template.helper.isScoreboard = function() {
    return Session.equals('current_page', 'scoreboard');
};

var H34dRouter = Backbone.Router.extend({
    routes: {
        "":           "main",
        "scoreboard": "scoreboard"
    },

    main: function() {
        Session.set('current_page', 'main_page');
    },

    scoreboard: function() {
        Session.set('current_page', 'scoreboard');
    }
});

Router = new H34dRouter;

Meteor.startup(function() {
    Backbone.history.start({pushState: true});
    
    Session.setDefault('console_pointer', 0);
    Session.setDefault('console_history', []);
    Session.setDefault('console_results', []);
    Session.setDefault('scoreboard_teams', 'nsk');

    if (Meteor.user() && Session.equals('current_page', 'scoreboard')) {
        $('#console_input').focus();
    }

});
