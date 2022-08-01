const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db.js');

const CampaignController = require('./campaignController');

const controller = new CampaignController();

const app = express();

const corsOptions = {
	origin: true,
	methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
	allowedHeaders: [
		'Content-Type',
		'Access-Control-Allow-Origin',
		'Authorisation',
		'x-access-token',
	],
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/campaign/all', controller.getAll);
app.get('/campaign/:id', controller.get);
app.post('/campaign/create', controller.create);
app.put('/campaign/update/:id', controller.edit);
app.delete('/campaign/:id', controller.remove);

const port = process.env.PORT | 3001;

app.listen(port, () => {
	console.log(`App started at port ${port}`);
});
