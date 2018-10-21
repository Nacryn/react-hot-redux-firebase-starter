import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.ROOM_CREATED_SUCCESS:
      return state
    case types.ROOM_HAS_BEEN_CREATED:
      return Object.assign({}, state, { list: [...state.list, action.room] });
    case types.ROOM_JOINED_SUCCESS:
      return Object.assign({}, state, { current: action.room });
    case types.ROOMS_PURGE_LIST:
      return Object.assign({}, state, { current: undefined, list: [] })
    default:
      return state;
  }
}
