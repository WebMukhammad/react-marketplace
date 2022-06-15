import React from 'react'
import hoverintent from 'hoverintent'
import classNames from 'classnames'

export default class ToggleHover extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.toggleParent = React.createRef()
    this.state = { isParentActive: false }
    this.$hoverintent = null
  }

  onMouseOver() {
    this.setState({ isParentActive: true })
  }

  onMouseOut() {
    this.setState({ isParentActive: false })
  }

  componentDidMount() {
    this.$hoverintent = hoverintent(this.toggleParent.current, this.onMouseOver, this.onMouseOut)
  }

  componentWillUnmount() {
    this.$hoverintent?.remove()
  }

  render() {
    return (
      <div
        ref={this.toggleParent}
        className={classNames([this.props.className, { [this.props.toggleParentClassName]: this.state.isParentActive }])}
      >
        {this.props.children}
      </div>
    )
  }
}
