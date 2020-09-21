const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Analytics = require('./models/Analytics');
const {nanoid} = require('nanoid');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'admin',
        password: '123',
        role: 'admin',
        displayName: 'Админ',
        token: nanoid()
    }, {
        username: 'seller',
        password: '123',
        role: 'seller',
        displayName: 'Аноним',
        token: nanoid()
    }, {
        username: 'operator',
        password: '123',
        role: 'operator',
        displayName: 'Руся',
        token: nanoid()
    });

    await Analytics.create({
        assembly: [],
        price: [],
        newPrice: []
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});
