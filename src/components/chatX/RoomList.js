import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {createRoom, joinRoom, purgeRoomList, leaveRoom } from '../../actions/roomActions';
import {
  watchRoomCreatedEvent, unwatchRoomCreatedEvent,
  watchRoomUserAdded, watchRoomUserRemoved, unwatchRoomUsers } from '../../listeners/roomListeners';

import '../../styles/chatx.css';

class RoomList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      new_room_name: '',
      saving: false
    };

    this.updateNewRoomName = this.updateNewRoomName.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
  }

  // Watch all new rooms event as soon as the list is mounted
  componentWillMount() {
    this.props.actions.watchRoomCreatedEvent();
  }

  // Watch new room user based on the current room (and update when it changes)
  componentDidUpdate(oldProps) {
    if (oldProps.current !== this.props.current) {
      this.props.actions.unwatchRoomUsers(oldProps.current);
      this.props.actions.watchRoomUserAdded(this.props.current);
      this.props.actions.watchRoomUserRemoved(this.props.current);
    }
  }

  // Stop listening to new rooms event when component is dismounted + purge the list + leave the current room
  componentWillUnmount() {
    this.props.actions.unwatchRoomCreatedEvent();
    this.props.actions.leaveRoom(this.props.current);
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
      .finally(() => this.setState({saving: false, new_room_name: ''}));
  }

  selectRoom(event) {
    this.props.actions.joinRoom(event.target.getAttribute('data-id'));
  }

  render() {
    return (
      <div className="rl-container">
        <div className="rl-list">
          { 
            this.props.rooms.map( elem => {
              if (elem._id === this.props.current) {
                return (<div key={elem._id} className="active">
                  <div data-id={elem._id} className="room-name" onClick={this.selectRoom}>{elem.name}</div>
                  <div className="active_users">
                    {this.props.active_users.map( elem => {
                      return <div key={elem}>{elem}</div>;
                    })}
                  </div>
                </div>);
              }
              else {
                return <div key={elem._id} data-id={elem._id} className="room-name" onClick={this.selectRoom}>{elem.name}</div>;
              }
            })
          }
        </div>
        <div className="rl-create-room">
          <form className="rl-form">
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
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.list,
    current: state.rooms.current,
    active_users: state.rooms.active_users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createRoom,
      joinRoom,
      leaveRoom,
      purgeRoomList,
      watchRoomCreatedEvent,
      unwatchRoomCreatedEvent,
      watchRoomUserAdded,
      watchRoomUserRemoved,
      unwatchRoomUsers
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);