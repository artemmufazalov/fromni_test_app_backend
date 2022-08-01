const { channelsMetaData, channelsNames } = require('./metaData');

const validateForms = (forms) => {
	const activeChannels = forms.activeChannels;

	const possibleOptions = channelsNames.map((tpl) => tpl[0]);

	activeChannels.forEach((ch) => {
		// Validate channel name
		if (!possibleOptions.includes(ch)) {
			throw Error('Some of provided channel names is not supported');
		}

		const chData = forms[ch],
			chMeta = channelsMetaData[ch];

		// Validate message length
		if (chMeta.maxLength && chData.message.length > chMeta.maxLength) {
			throw Error('Message length exeeds limit');
		}
		// Validate buttons
		if (!chMeta.buttons && chData.buttons) {
			throw Error(
				'Provided buttons for the channel, that does not support them'
			);
		}

		if (!chMeta.buttons) {
			return;
		}

		const qInline = chData.buttons.filter(
				(bt) => bt.type === 'inline'
			).length,
			qInlineLinks = chData.buttons.filter(
				(bt) => bt.type === 'inline' && bt.isLink
			).length,
			qStandart = chData.buttons.filter(
				(bt) => bt.type === 'standart'
			).length,
			qStandartLinks = chData.buttons.filter(
				(bt) => bt.type === 'standart' && bt.isLink
			).length;

		if (qInline > chMeta.buttons.inline.maxQuantity) {
			throw Error('Number of inline buttons exeeds limit');
		}

		if (qStandart > chMeta.buttons.standart.maxQuantity) {
			throw Error('Number of standart buttons exeeds limit');
		}

		if (
			(chMeta.buttons &&
				!chMeta.buttons.inline.isLinkAllowed &&
				qInlineLinks > 0) ||
			(chMeta.buttons.inline.maxWithLink &&
				qInlineLinks > chMeta.buttons.inline.maxWithLink)
		) {
			throw Error('Number of inline buttons with links exeeds limit');
		}

		if (
			(chMeta.buttons &&
				!chMeta.buttons.standart.isLinkAllowed &&
				qStandartLinks > 0) ||
			(chMeta.buttons.standart.maxWithLink &&
				qStandartLinks > chMeta.buttons.inline.maxWithLink)
		) {
			throw Error('Number of standart buttons with links exeeds limit');
		}
	});
};

module.exports = validateForms;
