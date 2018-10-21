import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.MESSAGE_SENT_SUCCESS:
      return state;
    case types.MESSAGE_RECEIVED_SUCCESS:
      return [...state, action.message];
    case types.MESSAGES_PURGE_PREVIOUS:
      return [];
    default:
      return state;
  }
}
