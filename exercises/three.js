module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?
	Checkout.find({}, (err, data) => {
		var movieId = '';
		var results = {};
		for (var i = 0; i < data.length; i++) {
			var num = data[i].movieId;
			if (typeof results[num] === 'undefined') {
				results[num] = 1;
			} else {
				results[num]++;
			}
		}
		// console.log(results);
		var movieWithMostCheckouts;
		var maxNumCheckouts = 0;
		for (var result in results) {
			if (results[result] > maxNumCheckouts) {
				maxNumCheckouts = results[result];
				movieWithMostCheckouts = result;
			}
		}
		// console.log(movieWithMostCheckouts + " has " + maxNumCheckouts + " checkouts");
		Movie.findOne({_id: movieWithMostCheckouts}, (err, data) => {
			console.log(data.title + " has the most checkouts. It has " + maxNumCheckouts);
		});
	});
};
