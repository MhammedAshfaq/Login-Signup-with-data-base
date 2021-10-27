const db = require('../config/connection');
const collectionName = require('../config/collection-name')
const bcrypt = require('bcrypt');

module.exports = {
    // doSignup: ((userData, callback) => {
    //     // console.log(userData);
    //     db.get().collection(collectionName.User_collection_name).insertOne(userData).then((data) => {
    //         callback(data)
    //     })
    // }),

    /*Signup Function */

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10);    // 10 is salt round
            db.get().collection(collectionName.User_collection_name).insertOne(userData).then((data) => {
                resolve(data.insertedId); //this insertedId is 40 letter key in data
            })
        })
    },

    /* Login Function */

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            // console.log(userData);
            let loginStatus = false;
            let response = {}
            let user = await db.get().collection(collectionName.User_collection_name).findOne({ username: userData.username })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('Login Success');
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('Login Failed');
                        resolve(false);
                    }
                })
            }
            else {
                console.log('User Not Found');
                resolve(false)
            }
        })
    }



}