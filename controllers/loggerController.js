const {
	addLogger,
	getAll,
	deleteLogsByFilter,
} = require('../actions/loggerDBActions');

const addLog = async (req, res) => {
	try {
		const newLog = await addLogger(req.body);
		res.status(201).send(newLog);
	} catch (err) {
		console.log('err', err);
		res.send(err);
	}
};

const getLogs = async (req, res) => {
	try {
		const lst = await getAll(req.body);
		res.send(lst);
	} catch (err) {
		res.s;
	}
};

const deleteLogs = async (req, res) => {
	try {
		const lst = await deleteLogsByFilter(req.body);
		res.send(lst);
	} catch (err) {
		res.s;
	}
};
// const getPaymentsInterface = async (req, res) => {
//   try {
//     const lst = await getAll(req.body);
//     res.send(lst);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const UpdatePaymentsInterfaceById = async (req, res) => {
//   try {
//     const response = await updateById(req.body);
//     res.status(201).send(response);
//   } catch (err) {
//     console.log("err", err);
//     res.send(err);
//   }
// };
module.exports = {
	addLog,
	getLogs,
	deleteLogs,
	//   UpdateCampingById,
};
