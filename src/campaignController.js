const validateForms = require('./validate.js');
const campaignModel = require('./campaignModel');

class CampaignController {
	getAll(_, res) {
		campaignModel.find((err, items) => {
			if (err) {
				return res.status(500).json({
					message: 'Some error occured',
					error: err,
				});
			}

			return res.status(200).json({
				message: 'Success',
				items: items,
			});
		});
	}

	get(req, res) {
		const id = req.params.id;

		campaignModel.findOne({ _id: id }, (err, item) => {
			if (err) {
				return res.status(404).json({
					message: 'Campaign with provided id was not found',
					error: err,
				});
			}

			return res.status(200).json({
				message: 'Success',
				item: item,
			});
		});
	}

	create(req, res) {
		try {
			validateForms(req.body.forms);
			const newCampaign = new campaignModel(req.body.forms);
			newCampaign.save((err, item) => {
				if (err) {
					return res.status(500).json({
						message: 'Some error occured',
						error: err,
					});
				}
				return res.status(200).json({
					message: 'Success',
					item: item,
				});
			});
		} catch (err) {
			return res.status(400).json({
				message: 'Validation error',
				error: err,
			});
		}
	}

	edit(req, res) {
		const id = req.params.id;

		try {
			validateForms(req.body.forms);

			campaignModel.updateOne(
				{ _id: id },
				{ ...req.body.forms },
				(err, _) => {
					if (err) {
						return res.status(500).json({
							message: 'Some error occured',
							error: err,
						});
					}

					campaignModel.findOne({ _id: id }, (_, item) => {
						return res.status(200).json({
							message: 'Updated',
							item: item,
						});
					});
				}
			);
		} catch (err) {
			return res.status(400).json({
				message: 'Validation error',
				error: err,
			});
		}
	}

	remove(req, res) {
		const id = req.params.id;

		campaignModel.deleteOne({ _id: id }, (err, item) => {
			if (err) {
				return res.status(404).json({
					message: 'Campaign with provided id was not found',
					error: err,
				});
			}

			return res.status(200).json({
				message: 'Deleted',
			});
		});
	}
}

module.exports = CampaignController;
