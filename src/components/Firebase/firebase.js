import app from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

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

    this.auth = app.auth();

    this.database = app.database();
  }

  // Auth Functions
  createUser = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password).catch(err => console.error(err));
  }

  signInUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOutUser = () => this.auth.signOut();

  // Stretch Goals

  // resetPassword = email => this.auth.sendPasswordResetEmail(email);

  // updatePassword = password =>
  //   this.auth.currentUser.updatePassword(password);

  // Project Functions
  getProjects = (userId) => {
    const dbRef = this.database.ref("projects");

    return dbRef.orderByChild("userId").equalTo(userId).once('value').then(snap => {
      return snap.val();
    });
  }

  getProject = (projectId) => {
    const dbRef = this.database.ref(`/projects/${projectId}`);
    
    return dbRef.once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  createProject = (projectName, userId, category, projectImage = null) => {
    const dbRef = this.database.ref("projects");
    return dbRef.push({ projectName: projectName, timeStamp: Date.now(), userId: userId, category: category, projectImage: projectImage });
  }

  getUpdates = (projectId) => {
    const dbRef = this.database.ref("updates");

    return dbRef.orderByChild("projectId").equalTo(projectId).once('value').then(snap => {
      return snap.val();
    });
  }

  createUpdate = (title, description, category, projectId) => {
    const dbRef = this.database.ref("updates");

    return dbRef.push({ title, description, projectId, timestamp: Date.now() });
  }
}

export default Firebase;
