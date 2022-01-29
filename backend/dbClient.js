const mongoose = require("mongoose");

async function dbConnect() {
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection
}

async function dbClose() {
    return await mongoose.disconnect();
}

module.exports = {dbConnect, dbClose}