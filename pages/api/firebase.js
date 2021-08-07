const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyD5FnqKbqs1JJguZ6ZkcY4OyMX2jATlZjY",
  authDomain: "phoneadmin-2157f.firebaseapp.com",
  databaseURL: "https://phoneadmin-2157f-default-rtdb.firebaseio.com",
  projectId: "phoneadmin-2157f",
  storageBucket: "phoneadmin-2157f.appspot.com",
  messagingSenderId: "195011375714",
  appId: "1:195011375714:web:dab33cbc0290a5d7bc573b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseRef = firebase.database();

module.exports = firebaseRef;
