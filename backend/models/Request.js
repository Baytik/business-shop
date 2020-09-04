const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;