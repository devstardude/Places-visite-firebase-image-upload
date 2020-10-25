import firebase from "firebase";
import "firebase/storage";
import { v1 as uuidv1 } from "uuid";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5pRMKTyRwIi6BPhFOq-r8H6gw7Stg75s",
  authDomain: "myplaces009.firebaseapp.com",
  databaseURL: "https://myplaces009.firebaseio.com",
  projectId: "myplaces009",
  storageBucket: "myplaces009.appspot.com",
  messagingSenderId: "268979546537",
  appId: "1:268979546537:web:f8ea6da7081ffd502afcb8",
  measurementId: "G-8PESH1CD1H",
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const storage = firebaseApp.storage();

async function uploadImage(file) {
  const id = uuidv1();
  const uploadTask = storage.ref(`images/${file.name}-${id}`).put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("image uploading", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${id}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
}

export { uploadImage };
