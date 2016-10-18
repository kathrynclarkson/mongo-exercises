module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	Checkout.find({}, (err, data) => {
		// get all users
		var usersArray = [];
		usersArray = data.map(u => {
			if (usersArray.indexOf(u.userId) === -1) {
				return u.userId;
			}
		});
		usersArray = usersArray.sort((a,b) =>  a - b);
		var result = {};
		for (var i = 0; i < usersArray.length; i++) {
			var userId = usersArray[i];
			if (typeof result[userId] === 'undefined' ) {
				// we have not counted this user yet
				result[userId] = 1;
			} else {
				result[userId]++;
			}
		}
		var userIdOfMostOccurrence;
		var max = 0;
		for (var user in result) {
			if (result[user] > max) {
				// save the user id
				userIdOfMostOccurrence = user;
				// set the new max
				max = result[user];
			}
		}
		console.log("User " + userIdOfMostOccurrence + " has the most checkout. She has " + max + " checkouts");
		// see how many times each user appears in "data"
	});
};

// [
// { userId: 1, occurrences: 500},
// { userId: 2, occurrences: 4},
// { userId: 3, occurrences: 92},
// ]