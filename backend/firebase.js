// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quizchamp-c9a1c-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = db;