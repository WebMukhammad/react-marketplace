import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import classNames from 'classnames'

class Button extends React.Component {
  getClasses() {
    return [
      'button',
      `button_${this.props.theme || 'red'}`,
      `button_h-${this.props.size}`,
      this.props.className,
      {
        button_loading: this.props.loading,
        button_fluid: this.props.fluid,
        [`button_icon-${this.props.iconPosition}`]: this.props.iconPosition
      }
    ]
  }

  getIconClass() {
    if (this.props.disabled) {
      return `icon-${this.props.icon} icon-${this.props.icon}_disabled`
    } else {
      return this.props.theme === 'white' || this.props.theme === 'transparent'
        ? `icon-${this.props.icon} icon-${this.props.icon}_black`
        : `icon-${this.props.icon} icon-${this.props.icon}_white`
    }
  }

  render() {
    return (
      <button
        style={{ borderRadius: this.props.borderRadius }}
        className={classNames(this.getClasses())}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <span v-if="icon" className={classNames('button__icon', this.getIconClass())} />
        {this.props.children || 'Текст на кнопке'}
      </button>
    )
  }
}

Button.propTypes = {
  theme: PropTypes.string,
  size: PropTypes.string,
  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  borderRadius: PropTypes.string
}

Button.defaultProps = {
  /**
   * Стиль кнопки
   * @values red, white, blue, green, submited
   */
  theme: 'red',
  /**
   * Размер кнопки, цифра отображает высоту, но поддерживается ограниченное кол-во
   * @values 33, 39, 49
   */
  size: '39',
  /**
   * Ширина кнопки
   * @values true, false
   */
  fluid: false,
  /**
   * Кнопка с лоайдером вместо текста
   * @values true, false
   */
  loading: false,
  /**
   * Задизейбленая кнопка
   * @values true, false
   */
  disabled: false,
  /**
   * Иконка
   * @values add, close, book, arrow-right
   */
  icon: null,
  /**
   * С какого края отображать иконку в кнопке
   * @values left, right
   */
  iconPosition: 'left',
  /**
   * Кастомный border-radius у кнопки
   */
  borderRadius: null
}

export default Button
