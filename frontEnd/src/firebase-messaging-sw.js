importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyA-VhhxaTRKaLORwbkliTZy7-GdS49rHHc",
    authDomain: "expenseout-fcm.firebaseapp.com",
    databaseURL: "expenseout-fcm",
    projectId: "expenseout-fcm",
    storageBucket: "expenseout-fcm.appspot.com",
    messagingSenderId: "1038768521260",
    appId: "1:1038768521260:web:33d6313540855b3f635189",
    measurementId: "G-C54PFRKTNP"
});
const messaging = firebase.messaging();