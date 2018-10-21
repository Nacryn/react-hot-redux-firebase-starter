import React from 'react'
import TextField from '@material-ui/core/TextField'

import '../../styles/chatx.css'

class RoomList extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="rl-container">
        <div className="rl-list">
          <div className="rl-roomname">Lambda</div>
          <div className="rl-roomname">Test</div>
          <div className="rl-roomname">Dive</div>
        </div>
        <div className="rl-create-room">
          <TextField
            id="create-action"
            label="Nouveau salon"
            style={{ margin: 8 }}
            placeholder="Entrez un nom"
            helperText="Choisissez un nom et valider pour créer un nouveau salon"
            fullWidth
            margin="dense"
          />
        </div>
      </div>
    )
  }
}

export default RoomList