const { getHeader } = require('./header.js');
const { accountApproved } = require('./accountApproved');
const { register } = require('./registerition');
const { donationApproved } = require('./donationApproved');
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
	}
};

module.exports = { getTemplate };
