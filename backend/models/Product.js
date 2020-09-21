const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    box: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    ram: {
      type: String,
      required: true
    },
    hdd: {
      type: String,
      required: true
    },
    cooler: {
      type: String,
      required: true
    },
    power: {
      type: String,
      required: true
    },
    motherBoard: {
      type: String,
      required: true
    },
    pcName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    gpu: String,
    ssd: String,
    monitor: String,
    category: {
        type: String,
        required: true,
        enum: ['office', 'budget-gaming', 'gaming']
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Post', ProductSchema);

module.exports = Product;