import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import { sendMessageInCurrentRoom } from '../../actions/messageActions';

import '../../styles/chatx.css';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      saving: false
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  sendMessage(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.sendMessageInCurrentRoom(this.state.message)
      .then(message => {})
      .catch(error => toastr.error(error.message))
      .finally(() => this.setState({saving: false, message: ''}));
  }

  render() {
    return (
      <div className="rc-ci-content">
        <form className="message-sender-form">
          <input className="message-sender-input" type="text" value={this.state.message} onChange={this.updateMessage} placeholder="Type your message here !" />
          <input
            type="submit"
            disabled={this.state.saving}
            value={this.state.saving ? 'Sending...' : 'Send'}
            className="btn btn-primary message-sender-submit"
            onClick={this.sendMessage}/>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sendMessageInCurrentRoom
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);