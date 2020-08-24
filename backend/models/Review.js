const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    pcName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    review: String
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;