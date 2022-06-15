import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      checked: this.props.checked
    }
  }

  onChange() {
    this.setState({ checked: !this.state.checked }, () =>
      this.props.onChange({
        checked: this.state.checked,
        value: this.props.value
      })
    )
  }

  render() {
    return (
      <label className={classNames('checkbox', this.props.className)}>
        <input
          type="checkbox"
          className="checkbox__input"
          value={this.props.value}
          name={this.props.name}
          checked={this.state.checked}
          disabled={this.props.disabled}
          style={{ marginRight: this.props.children ? '7px' : '0px' }}
          onChange={this.onChange}
        />
        {this.props.children ? (
          <span className="checkbox__text">
            {/* @slot Текст для чекбокса */}
            {this.props.children}
          </span>
        ) : null}
      </label>
    )
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  widthTitle: PropTypes.string
}

Checkbox.defaultProps = {
  /**
   * Атрибут name для чекбокса
   */
  name: null,
  /**
   * Атрибут value для чекбокса
   */
  value: '',
  /**
   * v-model
   */
  checked: false,
  /**
   * Задизейбленный чекбокс
   * @values true, false
   */
  disabled: false,
  onChange: () => {}
}

export default Checkbox
