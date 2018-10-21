import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

  static get TIMESTAMP_CONST() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {
    return firebase
      .database()
      .ref(path)
      .set(value);
  }

  static getValuesOnce(path) {
    return firebase
      .database()
      .ref(path)
      .once('value')
      .then( rooms => {
        return new Promise( (resolve) => {
          const res = [];
          rooms.forEach(data => {
            let result = data.val();
            res.push(result)
          })
          resolve(res);
        })
      })
  }

  static onChildAdded(path, callback) {
    firebase
      .database()
      .ref(path)
      .limitToLast(10)
      .on('child_added', callback)
  }

  static off(path, callback) {
    firebase
      .database()
      .ref(path)
      .off('child_added')
  }
}

export default FirebaseApi;
