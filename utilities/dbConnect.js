import mongoose from 'mongoose';

const connection = {};

async function dbConnect(req, res, next) {
  if (connection.isConnected) {
    return next();
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection failed:', err));

  connection.isConnected = mongoose.connection.readyState;
}

export default dbConnect;