const moment = require('moment');
const {
	addNewRecurring,
	getAll,
	updateById,
	DBGetRecurringById,
	DBGetRecurringTaskList,
	getDBRecurringCount,
} = require('../actions/recurringDBActions');
const { sendEmail } = require('../emails/email');
const { addNewPayments } = require('../actions/paymentsDBActions');
const { getNewPayment } = require('../utils/payments');
const { apiSelector } = require('../apis/apiSelector');
const Rrecurrings = require('../models/Rrecurrings');
// const getAll = async (filters = {}) => {
//   console.log(' here');
//   console.log(filters);
//   const users = await User.find(filters);
//   console.log(users);
//   return users;
// };

const getRecurringById = async (req, res) => {
	const recurring = await DBGetRecurringById(req.body);
	res.send(recurring);
};

const getRecurringTaskList = async (req, res) => {
	const recurring = await DBGetRecurringTaskList(req.body);
	res.send(recurring.filter((x) => x.paymentInterface !== null));
};

const addRecurring = async (req, res) => {
	try {
		const { recurring, privateRecurring } = req.body;
		if (recurring.isImmediatePayment) {
			// increasing recurring count
			recurring.currentRecurringCount = 1;
			recurring.isByEngine = false;
		}
		const newRecurring = await addNewRecurring(recurring);
		// checking for API
		console.log('newRecurring', newRecurring);
		console.log('Calling API  Selector'.green);
		const results = await apiSelector(newRecurring._id);
		console.log('returnning', results);

		if (results.isApproved || 1 == 1) {
			newRecurring.reference_id = results.data.reference_number;
		} else {
			console.log('failed');
		}

		addImmediatePayment(newRecurring);
		const newPrivateRecurring = null;
		if (privateRecurring.sum > 0) {
			privateRecurring.displayName = recurring.displayName;

			if (newPrivateRecurring?.isImmediatePayment) {
				privateRecurring.currentRecurringCount = 1;
				recurring.isByEngine = false;
			}

			const newPrivateRecurringResult = await addNewRecurring(privateRecurring);
			// addImmediatePayment(newPrivateRecurringResult);
		}

		res.status(201).send(newRecurring);
	} catch (err) {
		console.log('err', err);
		res.send(err);
	}
};

// adding new payment if
const addImmediatePayment = async (recurring) => {
	if (!recurring?.isImmediatePayment) return;
	let payment = await getNewPayment(recurring);

	// console.log("new payment", payment);
	try {
		addNewPayments(payment);
		console.log('sending email', recurring);
		// sending email for the campaign manager

		sendEmail({
			title: 'Donations Recived',
			template: 'donationApproved',
			options: {
				name: recurring.displayName,
				campginName:
					'they woke yp at 2 am on sabos to see and smeel that their ap was filed wit smoke on fire ',
				title: 'Donation Recived.',
				donationAmount: recurring.sum,
				feeAmount: recurring.isCompleteFee ? 0 : recurring.fee,
				paymentMethod: 'Creditcard',
				currentDate: moment().format('DD-MM-YYYY'),
				transactionID: recurring._id,
			},
			to: [
				{
					email: 'motiphone2003@gmail.com',
					name: 'Moti elmakies',
				},
			],
		});
	} catch (err) {
		console.log('error:', err);
	}
};

const getDonations = async (req, res) => {
	try {
		const donations = await getAll(req.body);
		res.send(donations);
	} catch (e) {
		console.log(e);
		res.send(e);
	}
};

const updateRecurringById = async (req, res) => {
	const recurring = await updateById(req.body);
	res.status(201).send(recurring);
};

const getRecurringCount = async (req, res) => {
	try {
		console.log('body', req.body);
		const recurringCount = await getDBRecurringCount(req.body);
		console.log(recurringCount);
		res.status(200);
		res.send(recurringCount);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

// const updateById = async (filters = {}) => {
//   try {
//     const { _id } = filters;
//     console.log(_id, filters);
//     delete filters._id;
//     const user = await User.updateOne({ _id }, filters);
//     return user;
//   } catch (err) {
//     console.log("err", err);
//   }
// };

module.exports = {
	addRecurring,
	getDonations,
	updateRecurringById,
	getRecurringById,
	getRecurringTaskList,
	addImmediatePayment,
	getRecurringById,
	getRecurringCount,
};
// module.exports = { login, getAll, addNewUser, updateById, DBgetUserById };
