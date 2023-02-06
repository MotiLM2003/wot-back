const accountApproved = ({ name, lastName }) => {
	return {
		subject: 'Great News…Your Account has been Approved!',
		html: `<p>Dear ${name},</p>
            <p>Your account has been approved and is ready to build a campaign.</p>
            <p>You can now sign in to edit your campaign and add pictures, videos, and anything that you would like to say in your campaign.</p>
            <p>If you need assistance or would like us to build your campaign, please email us at  <span style='font-weight:bold'>support@worldoftzedaka.org</span>.</p>
           <p style='font-weight:bold'>Thank you,<br />
            World of Tzedaka Management
            </p>`,
	};
};

module.exports = { accountApproved };
