const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const express = require("express");
const app = express();
const cors = require("cors");
app.use( cors({ origin: true}));

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello world');
});



exports.app = functions.https.onRequest(app);