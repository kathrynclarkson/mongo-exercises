module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?
	var lordOfTheRingsIdArray = [];
	Movie.find({}, (err, data) => {
		for (var i = 0; i < data.length; i++) {
			if (data[i].title.toLowerCase().indexOf('lord of the rings') !== -1) {
				// If the title of the movie contains 'lord of the rings'
				// Then add it's ID to our array
				lordOfTheRingsIdArray.push(data[i]._id);

			}
		}
		// Find all _id's of movies that contain the string:
		// "lord of the rings" (ignore case)
		// store in a var
	});
	Checkout.find({}, (err, data) => {
		// Find all users, who checked out a movie whose _id 
		// is contained in the array created above
		var nerds = [];
		for (var i = 0; i < data.length; i++) {
			var currentCheckout = data[i];
			if (lordOfTheRingsIdArray.indexOf(currentCheckout.movieId) !== -1) {
				if (nerds.indexOf(currentCheckout.userId) === -1) {
					nerds.push(parseInt(currentCheckout.userId, 10));
				}
			}
		}
		// sort numerically
		nerds = nerds.sort( (a,b) =>  a - b);
		console.log("Lord of the Rings fans: " + nerds);

	});
};

// lordOfTheRingsIdArray = [ 1, 23, 12]

// data = [
// 	{_id: 123, title: "Lord of the rings return of the king", rating: 9000},
// 	{_id: 13, title: "Pocahontas", rating: 10000},
// 	{_id: 12, title: "Little Rascals", rating: 123},
// ]

// data = [
// {userId: 123, movieID: 123, month: 'jan'},
// {userId: 234, movieID: 43, month: 'jan'},
// {userId: 234, movieID: 43, month: 'jan'},
// {userId: 234, movieID: 43, month: 'jan'},
// {userId: 234, movieID: 43, month: 'jan'},
// ]

