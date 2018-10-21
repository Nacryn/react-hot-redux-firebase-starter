import React from 'react'

import MessagesDisplay from './MessagesDisplay'
import ChatInput from './ChatInput'

import '../../styles/chatx.css'

class RoomChat extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="rc-content">
        <MessagesDisplay></MessagesDisplay>
        <ChatInput></ChatInput>
      </div>
    )
  }
}

export default RoomChat