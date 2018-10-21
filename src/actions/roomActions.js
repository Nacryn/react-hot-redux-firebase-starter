import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import { authLoggedIn } from './authActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function createRoomProperties(roomName, loggedUserUid) {
  return {
    name: roomName,
    slug: roomName.replace(/ /gi, '-').toLowerCase(),
    private: false,
    creator: loggedUserUid,
    created_at: new Date(),
  };
}

export function createRoom(roomName) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush('/rooms', createRoomProperties(roomName, getState().user.uid))
      .then(
        () => {
          dispatch(roomCreatedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function loadRooms() {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return firebaseApi.getValuesOnce('/rooms')
      .then( rooms => {
        dispatch(roomLoadedSuccess(rooms))
      })
      .catch( error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      })
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