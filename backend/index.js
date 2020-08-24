const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const products = require('./app/products');
const reviews = require('./app/reviews');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.use('/computers', products);
    app.use('/reviews', reviews);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});