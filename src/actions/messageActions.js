import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function sendMessageInCurrentRoom(message) {
  return (dispatch, getState) => {
    const currentRoomId = getState().rooms.current;
    const newMessage = {
      sender: getState().user.uid,
      sender_name: getState().user.email,
      content: message,
      date: firebaseApi.TIMESTAMP_CONST,
    }
    return firebaseApi.databasePush('/messages/'+currentRoomId, newMessage)
      .then( () => {
        dispatch(messageSentSuccess());
      })
      .catch( error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      })
  }
}

export function purgePreviousMessages() {
  return {
    type: types.MESSAGES_PURGE_PREVIOUS
  };
}

export function messageSentSuccess() {
  return {
    type: types.MESSAGE_SENT_SUCCESS
  };
}

export function messageReceivedSuccess(message) {
  return {
    type: types.MESSAGE_RECEIVED_SUCCESS,
    message
  }
}