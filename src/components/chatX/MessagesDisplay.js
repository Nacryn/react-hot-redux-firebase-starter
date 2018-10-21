import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { watchIncomingMessage, unwatchIncomingMessage } from '../../listeners/messageListeners';

import '../../styles/chatx.css';

class MessagesDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  // This component can be mounted when a room is already selected
  // If so, start waching right away
  componentWillMount() {
    if (this.props.currentRoomId) {
      this.props.actions.watchIncomingMessage(this.props.currentRoomId);
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.currentRoomId !== this.props.currentRoomId) {
      this.props.actions.unwatchIncomingMessage(oldProps.currentRoomId);
      this.props.actions.watchIncomingMessage(this.props.currentRoomId);
    }
  }

  // Stop listening to messages when component is unmounted
  componentWillUnmount() {
    this.props.actions.unwatchIncomingMessage(this.props.currentRoomId);
  }

  render() {
    return (
      <div className="rc-md-content">
        {
          this.props.messages.map( (elem) => {
            return (<div key={elem._id} className="cx-md-message">
              <div className="md-message-author">{elem.sender_name}</div>
              <div className="md-message-content">{elem.content}</div>
            </div>);
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentRoomId: state.rooms.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      watchIncomingMessage,
      unwatchIncomingMessage
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesDisplay);