const { getHeader } = require('./header.js');
const { accountApproved } = require('./accountApproved');
const { register } = require('./registerition');
const { donationApproved } = require('./donationApproved');
const {
	donationApprovedForCampaignOwner,
} = require('./donationApprovedForCampaignOwner');
const { donorDonationDeclined } = require('./donorDonationDeclined');

const getTemplate = (templateName, options) => {
	switch (templateName) {
		case 'header': {
			return getHeader(options);
		}
		case 'accountApproved': {
			return accountApproved(options);
		}
		case 'register': {
			return register(options);
		}
		case 'donationApproved': {
			return donationApproved(options);
		}
		case 'donationApprovedForCampaignOwner': {
			return donationApprovedForCampaignOwner(options);
		}
		case 'donorDonationDeclined': {
			return donorDonationDeclined(options);
		}
		case 'free-text': {
			return {
				subject: options.title,
				html: options.content,
			};
		}
	}
};

module.exports = { getTemplate };
