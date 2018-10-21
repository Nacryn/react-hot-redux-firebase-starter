import firebaseApi from '../api/firebase';
import { messageReceivedSuccess } from '../actions/messageActions';

export function watchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.onChildAdded('/messages/'+roomId, (snap) => {
      let message = snap.val();
      message._id = snap.getKey();
      dispatch(messageReceivedSuccess(message));
    })
  }
}

export function unwatchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.off('/messages/'+roomId);
  }
}