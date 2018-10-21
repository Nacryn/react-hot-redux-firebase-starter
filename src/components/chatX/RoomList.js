import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// TODO : pick the good actions
import {createRoom, loadRooms, } from '../../actions/roomActions';
import { watchRoomCreatedEvent, unwatchRoomCreatedEvent } from '../../listeners/roomListeners';
// --
import toastr from 'toastr';

import '../../styles/chatx.css'

class RoomList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      new_room_name: '',
      saving: false,
    };

    this.updateNewRoomName = this.updateNewRoomName.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
  }

  componentWillMount() {
    this.props.actions.watchRoomCreatedEvent();
  }

  componentWillUnmount() {
    this.props.actions.unwatchRoomCreatedEvent();
  }

  updateNewRoomName(event) {
    this.setState({new_room_name: event.target.value});
  }

  saveRoom(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.actions.createRoom(this.state.new_room_name)
      .then(room => toastr.success(`Room "${this.state.new_room_name}" has been created.`))
      .catch(error => toastr.error(error.message))
      .finally(() => this.setState({saving: false, new_room_name: ''}))
  }

  render() {
    return (
      <div className="rl-container">
        <div className="rl-list">
          { 
            this.props.rooms.map( elem => {
              return <div key={elem.slug} className="rl-element">{elem.name}</div>
            })
          }
        </div>
        <div className="rl-create-room">
          <form>
            <input type="text" value={this.state.new_room_name} onChange={this.updateNewRoomName} placeholder="new room name" />
            <input
              type="submit"
              disabled={this.state.saving}
              value={this.state.saving ? 'Creating...' : 'Create'}
              className="btn btn-primary"
              onClick={this.saveRoom}/>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createRoom, loadRooms, watchRoomCreatedEvent, unwatchRoomCreatedEvent}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);