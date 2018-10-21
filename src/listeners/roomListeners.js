import firebaseApi from '../api/firebase';
import { roomHasBeenCreated } from '../actions/roomActions';

/* LISTENERS */

export function watchRoomCreatedEvent() {
  return (dispatch) => {
    firebaseApi.onChildAdded('/rooms', (snap) => {
      dispatch(roomHasBeenCreated(snap.val()));
    })
  }
}

export function unwatchRoomCreatedEvent() {
  return (dispatch) => {
    firebaseApi.off('/rooms');
  }
}