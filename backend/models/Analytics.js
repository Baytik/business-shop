const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    assembly: {
        type: [String],
    },
    price: {
        type: [String],
    },
    newPrice: {
        type: [String],
    }
});

const Analytics = mongoose.model('Analytics', AnalyticsSchema);

module.exports = Analytics;