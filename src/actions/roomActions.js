import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import { purgePreviousMessages } from './messageActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function createRoomProperties(roomName, loggedUserUid) {
  return {
    name: roomName,
    slug: roomName.replace(/ /gi, '-').toLowerCase(),
    private: false,
    creator: loggedUserUid,
    created_at: firebaseApi.TIMESTAMP_CONST,
  };
}

export function createRoom(roomName) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush('/rooms', createRoomProperties(roomName, getState().user.uid))
      .then( () => {
        dispatch(roomCreatedSuccess());
      })
      .catch( error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function joinRoom(roomId) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    // Leave previous room
    dispatch(leaveRoom(getState().rooms.current))
    // Join the new one
    firebaseApi.databaseSet(`/rooms/${roomId}/active_users/${getState().user.uid}`, getState().user.email)
      .then( () => {
        dispatch(roomJoinedSuccess(roomId));
      })
      .catch( error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  }
}

export function leaveRoom(roomId) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    // Purge messages state
    dispatch(purgePreviousMessages());
    // Remove user from room
    firebaseApi.databaseSet(`/rooms/${roomId}/active_users/${getState().user.uid}`, null)
      .then( () => {
        dispatch(roomLeftSuccess(roomId, getState().user.uid));
      })
      .catch( error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  }
}

export function purgeRoomList() {
  return {
    type: types.ROOMS_PURGE_LIST
  };
}

export function purgeActiveUsersList() {
  return {
    type: types.ROOMS_PURGE_ACTIVE_USERS
  };
}

export function roomCreatedSuccess() {
  return {
    type: types.ROOM_CREATED_SUCCESS
  };
}

export function roomLoadedSuccess(rooms) {
  return {
    type: types.ROOM_LOADED_SUCCESS,
    rooms,
  }
}

export function roomJoinedSuccess(room) {
  return {
    type: types.ROOM_JOINED_SUCCESS,
    room
  }
}

export function roomLeftSuccess(room, userId) {
  return {
    type: types.ROOM_LEFT_SUCCESS,
    room,
    userId
  }
}

export function roomHasBeenCreated(room) {
  return {
    type: types.ROOM_HAS_BEEN_CREATED,
    room
  }
}

export function roomHasBeenDeleted(room) {
  return {
    type: types.ROOM_HAS_BEEN_DELETED,
    room
  }
}

export function roomUserConnected(user) {
  return {
    type: types.ROOM_NEW_USER_CONNECTED,
    user
  }
}

export function roomUserLeft(user) {
  return {
    type: types.ROOM_NEW_USER_LEFT,
    user
  }
}