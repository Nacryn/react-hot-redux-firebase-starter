import React from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';

import RoomList from './RoomList'
import RoomChat from './RoomChat'

import '../../styles/chatx.css'

const ChatXPage = () => {
  return (
    <div>
      <h1>Chat X</h1>
      <div className="cx-container">
        <RoomList></RoomList>
        <RoomChat></RoomChat>
      </div>
      <p>Created by <a href="https://github.com/Nacryn">@someone</a></p>
      <Link to="/" activeClassName="active">Go to Home</Link>
    </div>
  );
};

export default checkAuth(ChatXPage);
