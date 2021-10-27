const MongoClient = require('mongodb').MongoClient;
const state = {
    db: null
}
/* Data Base Connetion */

module.exports.connect = (done) => {
    const string = 'mongodb://localhost:27017';

    MongoClient.connect(string, (err, client) => {
        if (err) return done(err);
        state.db = client.db('form1') // This form1 is my Data base name
        done();
    })
}

module.exports.get = () => {
    return state.db
}
