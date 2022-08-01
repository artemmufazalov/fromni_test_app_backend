const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema(
	{
		activeChannels: [
			{
				type: String,
			},
		],
		vk: {
			type: Object,
		},
		whatsApp: {
			type: Object,
		},
		telegram: {
			type: Object,
		},
		sms: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

const CampaignModel = mongoose.model('Campaign', CampaignSchema);

module.exports = CampaignModel;
