process.env.DOTENV_CONFIG_QUIET = 'true';
const mongoose = require('mongoose');

beforeAll(async () => {
  const uri = process.env.MONGO_URI;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}, 30000);

afterEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.disconnect();
}, 30000);