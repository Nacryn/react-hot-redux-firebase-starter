import firebaseApi from '../api/firebase';
import { messageReceivedSuccess } from '../actions/messageActions';

export function watchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.onChildAdded('/messages/'+roomId, (snap) => {
      console.log(snap.val());
      dispatch(messageReceivedSuccess(snap.val()));
    })
  }
}

export function unwatchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.off('/messages/'+roomId);
  }
}