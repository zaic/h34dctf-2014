Meteor.publish("teams", function() {
    return Meteor.users.find({}, {fields: {username: 1, 'profile.from_novosib': 1} });
});
