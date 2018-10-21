import firebaseApi from '../api/firebase';
import { roomHasBeenCreated, roomUserConnected, roomUserLeft, purgeRoomList, purgeActiveUsersList } from '../actions/roomActions';
import * as triggers from '../constants/firebaseTriggers';

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
    firebaseApi.off(triggers.CHILD_ADDED, '/rooms')
    dispatch(purgeRoomList());
  }
}

export function watchRoomUserAdded(roomId) {
  return (dispatch) => {
    firebaseApi.onChildAdded(`/rooms/${roomId}/active_users`, (snap) => {
      console.log(snap.val());
      dispatch(roomUserConnected(snap.val()));
    })
  }
}

export function watchRoomUserRemoved(roomId) {
  return (dispatch) => {
    firebaseApi.onChildRemoved(`/rooms/${roomId}/active_users`, (snap) => {
      dispatch(roomUserLeft(snap.val()));
    })
  }
}

export function unwatchRoomUsers(roomId) {
  return (dispatch) => {
    firebaseApi.off(triggers.CHILD_ADDED, `/rooms/${roomId}/active_users`);
    firebaseApi.off(triggers.CHILD_REMOVED, `/rooms/${roomId}/active_users`);
    dispatch(purgeActiveUsersList());
  }
}