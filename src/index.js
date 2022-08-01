const express = require('express');
const bodyParser = require('body-parser');

require('./db.js');

const CampaignController = require('./campaignController');

const controller = new CampaignController();

const app = express();

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
