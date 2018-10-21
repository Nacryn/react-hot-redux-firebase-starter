import firebaseApi from '../api/firebase';
import { roomHasBeenCreated } from '../actions/roomActions';

/* LISTENERS */

export function watchRoomCreatedEvent() {
  return (dispatch) => {
    firebaseApi.onChildAdded('/rooms', (snap) => {
      let room = snap.val();
      room._id = snap.getKey();
      dispatch(roomHasBeenCreated(room));
    })
  }
}

export function unwatchRoomCreatedEvent() {
  return (dispatch) => {
    firebaseApi.off('/rooms');
  }
}

