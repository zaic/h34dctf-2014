Meteor.publish(null, function() {
    return Meteor.users.find({}, {fields: {'username': 1,
                                           'profile.from_novosib': 1,
                                           'profile.country': 1,
                                           'profile.score': 1,
                                           'profile.last_success': 1
                                          } });
});
