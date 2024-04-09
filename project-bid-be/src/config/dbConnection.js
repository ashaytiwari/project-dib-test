const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {

    const connection = await mongoose.connect(config.dbConnectionString, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host} - ${connection.connection.port}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;