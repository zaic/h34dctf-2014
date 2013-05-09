Meteor.publish("teams", function() {
<<<<<<< HEAD
    return Meteor.users.find({}, {fields: {'username': 1, 
                                           'profile.from_novosib': 1,
                                           'profile.country': 1,
                                           'profile.score': 1
                                          } });
=======
    return Meteor.users.find({}, {fields: {username: 1, 'profile.country': 1, 'profile.from_novosib': 1} });
>>>>>>> fc2b1cc72c2c386f15f65f8967d24caefa43fa0a
});
