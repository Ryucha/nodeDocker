const mongoose = require('mongoose')

module.exports = () => {
    const db = mongoose.connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log("MongoDB connectgd ....");
    }).catch(err => {
        console.log('Failed to connect to MongoDbB', err);
    });

    require("./cat");
    require("./user");
    return db;
};