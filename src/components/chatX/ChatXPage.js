import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import checkAuth from '../requireAuth';
import RoomList from './RoomList';
import MessagesDisplay from './MessagesDisplay';
import ChatInput from './ChatInput';

import '../../styles/chatx.css';

const ChatXPage = ({currentRoom}) => {
  return (
    <div>
      <h1>Chat X</h1>
      <div className="cx-container">
        <div className="cx-left-panel">
          <RoomList />
        </div>
        {
          (currentRoom) ?
            <div className="cx-right-panel">
              <MessagesDisplay />
              <ChatInput />
            </div>
          :
            <div className="no-room">Please pick a room (or create one) on the left !</div>
        }
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentRoom: state.rooms.current
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(ChatXPage));
