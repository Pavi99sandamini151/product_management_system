const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const app = express();
const cors = require("cors");
const {async} = require("@firebase/util");
const {QuerySnapshot} = require("firebase-admin/firestore");
console.log(async, QuerySnapshot);
app.use( cors({origin: true}));
const db = admin.firestore();

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello world");
});

app.post("/api/create", (req, res) => {
  ( async () => {
    try {
      await db.collection("books").doc("/"+ req.body.id+ "/")
          .create({
            name: req.body.name,
            isbn: req.body.isbn,
            author: req.body.author,
            link: req.body.link,
          });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/read", (req, res) => {
  ( async () => {
    try {
      const query = db.collection("books");
      const response = [];
      await query.get().then((QuerySnapshot) => {
        const docs = QuerySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().name,
            isbn: doc.data().isbn,
            author: doc.data().author,
            link: doc.data().link,
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/read/:id", (req, res) => {
  ( async () => {
    try {
      const document = db.collection("books").doc(req.params.id);
      const book = await document.get();
      const response = book.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/update/:id", (req, res) => {
  ( async () => {
    try {
      const document = db.collection("books").doc(req.params.id);
      await document.update({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author,
        link: req.body.link,
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.delete("/api/delete/:id", (req, res) => {
  ( async () => {
    try {
      const document = db.collection("books").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
