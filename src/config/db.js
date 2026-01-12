const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketbooking';

        await mongoose.connect(uri)
        .then(() => {
            console.log('Database connected successfully');
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = dbConnect;