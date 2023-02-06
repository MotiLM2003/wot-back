const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema(
	{
		createdDate: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		isPrivateDonation: {
			type: Boolean,
			default: false,
			required: true,
		},
		currency: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Currencies',
			required: true,
		},
		sum: {
			type: Number,
			default: 0,
			required: true,
		},
		fee: {
			type: Number,
			default: 0,
			required: true,
		},
		isRecurring: {
			type: Boolean,
			default: true,
		},
		isCompletedPayment: {
			type: Boolean,
			default: true,
		},
		completedPaymentDate: {
			type: Date,
		},
		paymentResponseDetails: {
			type: Object,
		},
		recurringCount: {
			type: Number,
			default: 0,
			required: true,
		},
		status: {
			type: Number,
			default: 0,
			required: true,
		},
		isAnonymous: {
			type: Boolean,
			default: false,
		},

		reference_id: {
			type: String,
			default: '',
			required: true,
		},
		isCompleteFee: {
			type: Boolean,
			default: false,
			required: true,
		},

		paymentType: {
			type: Number,
			default: 0,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		isByEngine: {
			type: Boolean,
			default: false,
			required: true,
		},
		recurring: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recurrings',
			required: true,
		},
		paymentInterface: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PaymentsInterface',
			required: true,
		},
		campaign: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Campaigns',
			required: true,
		},
	},

	{
		timestamps: true,
	}
);

const Payments = mongoose.model('Payments', paymentsSchema);
module.exports = Payments;
