import React from 'react';
import {Link} from 'react-router';

import RoomList from './RoomList'
import RoomChat from './RoomChat'

const ChatXPage = () => {
  return (
    <div>
      <h1>Chat X</h1>
      <div>
        <RoomList></RoomList>
        <RoomChat></RoomChat>
      </div>
      <p>Created by <a href="https://github.com/Nacryn">@someone</a></p>
      <Link to="/" activeClassName="active">Go to Home</Link>
    </div>
  );
};

export default ChatXPage;
