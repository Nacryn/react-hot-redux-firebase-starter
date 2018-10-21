import * as firebase from 'firebase/firebase-browser';
import * as triggers from '../constants/firebaseTriggers';
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
      .on(triggers.CHILD_ADDED, callback)
  }

  static onChildRemoved(path, callback) {
    firebase
      .database()
      .ref(path)
      .on(triggers.CHILD_REMOVED, callback)
  }

  static onLastChildsAdded(path, number, callback) {
    firebase
      .database()
      .ref(path)
      .limitToLast(number)
      .on(triggers.CHILD_ADDED, callback)
  }

  static off(trigger, path, callback) {
    firebase
      .database()
      .ref(path)
      .off(trigger)
  }
}

export default FirebaseApi;
