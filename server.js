require('dotenv').config();
const { connectToDatabase } = require('./lib/mongodb/mongodb');
const express = require('express');
require('./db/mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
// ROUTERS
const userRouter = require('./routers/userRoute');
const campingRouter = require('./routers/campignRoute');
const recurrringRouter = require('./routers/recurrringRoute');
const paymentRouter = require('./routers/paymentRoute');
const paymentsInterfaceRoute = require('./routers/paymentsInterfaceRoute');
const currenciesRoute = require('./routers/currenciesRoute');
const loggerRouter = require('./routers/loggerRouter');
const tasksRouter = require('./routers/tasksRouter');
const emailRouter = require('./routers/emailsRoute');
const { initialTasks, stopTask, tasks } = require('./TasksEngine/taskEngine');

const { addLogger } = require('./actions/loggerDBActions');

// payment interface routes
const benqestRoute = require('./routers/benqestRoute');
//  END ROUTERS
const cors = require('cors');
const { use } = require('express/lib/router');
const { decode, encode } = require('base-64');
const app = express();
const PORT = process.env.PORT;
const origin = process.env.ORIGIN;
process.on('uncaughtException', function (err) {});

app.use(
	cors({
		credentials: true,
		origin: origin,
	})
);

app.use(express.json());
app.use(cookieParser());
// let full = encode("ePVAHN0toEMQdU2h2wi18ENqLjDohPAA:123456");
// console.log(full);

// Loading routes
app.use('/benqest', benqestRoute);
app.use('/users', userRouter);
app.use('/users/get', userRouter);
app.use('/campaigns', campingRouter);
app.use('/recurring', recurrringRouter);
app.use('/payments', paymentRouter);
app.use('/payments-interface', paymentsInterfaceRoute);
app.use('/currencies/', currenciesRoute);
app.use('/logger/', loggerRouter);
app.use('/tasks/', tasksRouter);
app.use('/emails/', emailRouter);

app.listen(PORT, () => {
	console.log(`Listen the port ${PORT}`);
	addInitialLog();
	initialTasks();
});

const addInitialLog = async () => {
	await addLogger({
		loggerId: 0,
		statusCode: 200,
		descriptionId: 0,
		params: [PORT],
	});
};

// // connecting to db example
// const connectdb = async () => {
// 	try {
// 		const { db } = await connectToDatabase();
// 		console.log(db);
// 		const data = await db
// 			.collection('campaigns')
// 			.findOne({}, { projection: { campaignName: 1 } });
// 		console.log('data', data);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
// connectdb();
