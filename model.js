Tasks = new Meteor.Collection('ctf_tasks');
// { name: 'bin100', description: 'Solve <a href="bin100.exe">this</a>!',
//   category: 'Binary', value: 100, available: false }

String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
};

if (Meteor.isServer) {
	Meteor.publish(null, function() {
		return Tasks.find({available: true});
	});
}