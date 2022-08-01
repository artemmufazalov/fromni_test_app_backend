const mongoose = require('mongoose');

const mongoURI = 'mongodb://0.0.0.0:27017/fromni';

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log(
			'MongoDB connection was established successfully: ' + mongoURI
		);
	})
	.catch((error) => {
		console.log('Cannot connect to the MongoDB, ' + error);
	});
