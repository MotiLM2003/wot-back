const moment = require('moment');
var mongoose = require('mongoose');
const { connectToDatabase } = require('../lib/mongodb/mongodb');
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

const getRecurringById = async (req, res) => {
	const recurring = await DBGetRecurringById(req.body);
	res.send(recurring);
};

const getRecurringTaskList = async (req, res) => {
	const recurring = await DBGetRecurringTaskList(req.body);
	res.send(recurring.filter((x) => x.paymentInterface !== null));
};

// getting campaign details
const getCampaignDetails = async (db, id) => {
	const campaign = await db
		.collection('campaigns')
		.findOne({ _id: id }, { projection: { shortDescription: 1, owner: 1 } });
	return campaign;
};

const getCurrency = async (db, id) => {
	const c = await db
		.collection('currencies')
		.findOne({ _id: id }, { projection: { symbol: 1 } });

	return c;
};

const getCampaignOwner = async (db, id) => {
	const user = await db
		.collection('users')
		.findOne(
			{ _id: id },
			{ projection: { firstName: 1, lastName: 1, email: 1 } }
		);
	return user;
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

		if (results?.isApproved || 1 === 1) {
			newRecurring.reference_id = results.data.reference_number;
		} else {
			console.log('failed');
			const { db } = await connectToDatabase();
			const campaign = await getCampaignDetails(
				db,
				mongoose.Types.ObjectId(recurring.campaign)
			);

			sendEmail({
				title: 'Your Donation was Declined',
				template: 'donorDonationDeclined',
				options: {
					name: recurring.displayName,
					campignName: campaign.shortDescription,
				},
				to: [
					{
						email: recurring.email,
						name: recurring.displayName,
					},
				],
			});
			return;
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
	let payment = getNewPayment(recurring);
	try {
		addNewPayments(payment);

		// getting database reference
		const { db } = await connectToDatabase();
		const campaign = await getCampaignDetails(db, recurring.campaign);
		const currency = await getCurrency(db, recurring.currency);
		const campignOwner = await getCampaignOwner(db, campaign.owner);
		console.log('owner', campignOwner);
		// sending email for the campaign manager
		sendEmail({
			title: 'Thank you for your donation!',
			template: 'donationApproved',
			options: {
				name: recurring.displayName,
				campginName: campaign.shortDescription,
				title: 'Donation Recived.',
				donationAmount: `${currency.symbol}${recurring.sum}`,
				feeAmount: recurring.isCompleteFee
					? `${currency.symbol}0`
					: `${currency.symbol}${recurring.fee}`,
				paymentMethod: 'Creditcard',
				currentDate: moment().format('DD-MM-YYYY'),
				transactionID: recurring._id,
			},
			to: [
				{
					email: recurring.email,
					name: recurring.displayName,
				},
			],
		});

		sendEmail({
			title: 'Donation received for your campaign',
			template: 'donationApprovedForCampaignOwner',
			options: {
				ownerName: `${campignOwner.firstName} ${campignOwner.lastName}`,
				donorsName: recurring.displayName,
				campginName: campaign.shortDescription,
				title: 'Donation Recived.',
				donationAmount: `${currency.symbol}${recurring.sum}`,
				feeAmount: recurring.isCompleteFee
					? `${currency.symbol}0`
					: `${currency.symbol}${recurring.fee}`,
				paymentMethod: 'Creditcard',
				currentDate: moment().format('DD-MM-YYYY'),
				transactionID: `${campignOwner.firstName} ${campignOwner.lastName}`,
			},
			to: [
				{
					email: campignOwner.email,
					name: recurring.displayName,
				},
			],
		});
	} catch (err) {
		console.log('error:', err);
	}
};

const getDonations = async (req, res) => {
	try {
		const data = req.body;
		const donations = await getAll(data.filters, data.selectedFields);
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
