var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
	process.env.EMAIL_API_KEY;

const { getTemplate } = require('./templates/templates');

sendEmail = ({ template, options, to }) => {
	console.log('in sending email', template);
	const { subject, html } = getTemplate(template, options);

	new SibApiV3Sdk.TransactionalEmailsApi()
		.sendTransacEmail({
			sender: { email: 'site@worldoftzedaka.org', name: 'world of tzedaka' },
			subject: `${subject}`,
			htmlContent: `${getTemplate(template, options).html}`,
			messageVersions: [
				{
					to: [
						{
							email: 'motiphone2003@gmail.com',
							name: 'Moti elmakies',
						},
					],
					htmlContent: `${getTemplate('header', options).html}${html}`,
					subject: `${subject}`,
				},
			],
		})
		.then(
			function (data) {
				console.log(data);
			},
			function (error) {
				console.error(error);
			}
		);
};

module.exports = { sendEmail };
