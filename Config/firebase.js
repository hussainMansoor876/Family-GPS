import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1Iy5G_gcjxM-Uumax8fcSjamApRhJwqo",
  authDomain: "final-hackathon-1318d.firebaseapp.com",
  databaseURL: "https://final-hackathon-1318d.firebaseio.com",
  projectId: "final-hackathon-1318d",
  storageBucket: "final-hackathon-1318d.appspot.com",
  messagingSenderId: "978845703836"
};
firebase.initializeApp(config);

export default firebase;