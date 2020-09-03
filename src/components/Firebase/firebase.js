import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDmVeW_Gxrb_raw_uuhJ2Jz3Ak-otQiROA",
  authDomain: "projectprogress-6ac84.firebaseapp.com",
  databaseURL: "https://projectprogress-6ac84.firebaseio.com",
  projectId: "projectprogress-6ac84",
  storageBucket: "projectprogress-6ac84.appspot.com",
  messagingSenderId: "333931068449",
  appId: "1:333931068449:web:4ff802e98a5e5e6879b760",
  measurementId: "G-162KVE87MG",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}

export default Firebase;
