import React from 'react'

import '../../styles/chatx.css'

class MessagesDisplay extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="rc-md-content">
        <div className="cx-md-message">Ceci est un message de test de début</div>
        <div className="cx-md-message">Ceci est un message de test</div>
        <div className="cx-md-message">Ceci est un message de test</div>
        <div className="cx-md-message">Ceci est un message de test</div>
        <div className="cx-md-message">Ceci est un message de test de fin</div>
      </div>
    )
  }
}

export default MessagesDisplay