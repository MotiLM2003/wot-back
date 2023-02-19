const { MongoClient } = require('mongodb');

const { MONGODB_URI2, MONGODB_DB } = process.env;

if (!MONGODB_URI2) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside env'
	);
}

let cached = global.cached;

if (!cached) {
	cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,

			keepAlive: true,
			connectTimeoutMS: 10000,
			socketTimeoutMS: 45000,
			family: 4, // Use IPv4, skip trying IP
		};

		cached.promise = MongoClient.connect(MONGODB_URI2, opts).then((client) => {
			return {
				client,
				db: client.db(MONGODB_DB),
			};
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

module.exports = { connectToDatabase };
