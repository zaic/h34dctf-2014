// some hardcoded constants
SUBMIT_TIME_OUT = 10; // in seconds
CONTEST_START_TIME = Date.UTC(2014, 4, 21, 3, 30, 0); // UTC date
CONTEST_END_TIME = Date.UTC(2014, 4, 21, 9, 30, 0); // UTC date

Tasks = new Meteor.Collection('ctf_tasks');
Submits = new Meteor.Collection('submits');

String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
};

getTimeInNiceFormat = function(t) {
	var y = t.getFullYear().toString();
	var m = ('0' + (t.getMonth() + 1)).slice(-2);
	var d = ('0' + t.getDate()).slice(-2);
	var h = ('0' + t.getHours()).slice(-2);
	var i = ('0' + t.getMinutes()).slice(-2);
	var s = ('0' + t.getSeconds()).slice(-2);
	var res = "";
	if (y > 1970) {
		res = y + "-" + m + "-" + d + " ";
	}
	return res + h + ":" + i + ":" + s;
};
