import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import { watchIncomingMessage, unwatchIncomingMessage } from '../../listeners/messageListeners';

import '../../styles/chatx.css'

class MessagesDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(oldProps) {
    console.log("am i updating ?");
    if (oldProps.currentRoomId !== this.props.currentRoomId) {
      this.props.actions.unwatchIncomingMessage(oldProps.currentRoomId);
      this.props.actions.watchIncomingMessage(this.props.currentRoomId);
    }
  }

  render() {
    return (
      <div className="rc-md-content">
        {
          this.props.messages.map( (elem) => {
            return <div className="cx-md-message">{elem.content}</div>
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    messages: state.messages,
    currentRoomId: state.rooms.current,
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