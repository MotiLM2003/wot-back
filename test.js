const { sendEmail } = require('./emails/email');
const { connectToDatabase } = require('./lib/mongodb/mongodb');
const { db } = connectToDatabase();
const moment = require('moment');
// sendEmail({
// 	title: 'Donation Recived',
// 	template: 'donationApproved',
// 	options: {
// 		name: `Moti Elmakyes`,
// 		campginName:
// 			'they woke yp at 2 am on sabos to see and smeel that their ap was filed wit smoke on fire ',
// 		title: 'Donation Recived.',
// 		donationAmount: '$100',
// 		feeAmount: '$2.5',
// 		paymentMethod: 'Creditcard',
// 		currentDate: moment().format('DD-MM-YYYY'),
// 		transactionID: '1234',
// 	},
// 	to: [
// 		{
// 			email: 'motiphone2003@gmail.com',
// 			name: 'Moti elmakies',
// 		},
// 	],
// });
