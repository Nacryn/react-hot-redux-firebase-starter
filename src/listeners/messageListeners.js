import firebaseApi from '../api/firebase';
import * as triggers from '../constants/firebaseTriggers';
import { messageReceivedSuccess } from '../actions/messageActions';

export function watchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.onLastChildsAdded('/messages/'+roomId, 11, (snap) => {
      let message = snap.val();
      message._id = snap.getKey();
      dispatch(messageReceivedSuccess(message));
    })
  }
}

export function unwatchIncomingMessage(roomId) {
  return (dispatch) => {
    firebaseApi.off(triggers.CHILD_ADDED, '/messages/'+roomId);
  }
}