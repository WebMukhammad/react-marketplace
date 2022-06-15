import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import classNames from 'classnames'

class Note extends React.Component {
  render() {
    return <div className={classNames(['note', `note_${this.props.size}-size`, `note_${this.props.theme}`])}>{this.props.children}</div>
  }
}

Note.propTypes = {
  theme: PropTypes.string,
  size: PropTypes.string
}

Note.defaultProps = {
  theme: 'yellow',
  size: 's'
}

export default Note
