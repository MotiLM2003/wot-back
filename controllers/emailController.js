const { sendEmail: send } = require('../emails/email');

const sendEmail = async (req, res) => {
	const { title, template, options, to, content = '' } = req.body;
	try {
		send({
			title: title,
			template: template,
			options: {
				name: options.firstName,
				title: title,
				content: content,
			},
			to: to,
		});
		res.status(201).send({ message: 'Ok' });
	} catch (err) {
		console.log('err', err);
		res.send(err);
	}
};

module.exports = {
	sendEmail,
};
