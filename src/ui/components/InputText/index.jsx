import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import classNames from 'classnames'

class InputText extends React.Component {
  constructor(props) {
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.toggleInnerType = this.toggleInnerType.bind(this)
    this.input = React.createRef()
    this.state = {
      isFocus: false,
      innerType: this.props.type
    }
  }
  onFocus(e) {
    /**
     * Срабатывает при фокусе поля
     * @property { event } - стандартный объект Event из обычного обработчика
     */
    this.setState({
      isFocus: true
    })
    this.props.onFocus?.(e.target.value)
  }
  onBlur(e) {
    /**
     * Срабатывает при расфокусе поля
     * @property { event } - стандартный объект Event из обычного обработчика
     */
    this.setState({ isFocus: false })
    this.props.onBlur?.(e.target.value)
  }
  toggleInnerType() {
    if (!this.props.disabled) {
      this.setState({
        innerType: this.state.innerType === 'password' ? 'text' : 'password'
      })
      this.input.current.focus()
    }
  }

  render() {
    return (
      <label
        className={classNames([
          'text-input',
          {
            'text-input_error': this.props.error,
            'text-input_success': this.props.success,
            'text-input_focus': this.state.isFocus,
            'text-input_disabled': this.props.disabled
          }
        ])}
        style={{
          borderColor: this.props.borderColor,
          borderRadius: this.props.borderRadius
        }}
      >
        {this.inputIconLeft ? (
          <div className={classNames([`icon-${this.inputIconLeft}`, 'text-input__icon', 'text-input__icon_left'])} />
        ) : null}
        {this.props.prefix ? <div className="text-input__note-text text-input__note-text_left">{this.props.prefix}</div> : null}
        <input
          type={this.state.innerType}
          autoComplete={this.props.autoComplete}
          className="text-input__input"
          ref={this.input}
          value={this.props.value}
          name={this.props.name}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={(e) => this.props.onChange(e.target.value)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.props.postfix ? <div className="text-input__note-text text-input__note-text_right">{this.props.postfix}</div> : null}
        {this.props.type === 'password' ? (
          <div
            className={classNames([
              'text-input__icon',
              'text-input__icon_password',
              this.state.innerType === 'password' ? 'icon-eye icon-eye_grey' : 'icon-eye-closed icon-eye-closed_grey'
            ])}
            onClick={this.toggleInnerType}
          />
        ) : this.props.inputIconRight ? (
          <div className={classNames([`icon-${this.props.inputIconRight}`, 'text-input__icon', 'text-input__icon_right'])} />
        ) : null}
      </label>
    )
  }
}

InputText.propTypes = {
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  borderColor: PropTypes.string,
  name: PropTypes.string,
  borderRadius: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  withoutBorders: PropTypes.bool,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  readonly: PropTypes.bool
}

InputText.defaultProps = {
  /**
   * Атрибут прокидывается напрямую в input
   * @values text, password
   */
  type: 'text',
  /**
   * Атрибут передается напрямую в инпут
   */
  autoComplete: null,
  /**
   * Кастомный border-color у инпута
   */
  borderColor: null,
  /**
   * Атрибут name для инпута
   */
  name: null,
  /**
   * свойство border-radius у инпута
   */
  borderRadius: null,
  /**
   * Значение поля ввода
   */
  value: '',
  /**
   * Placeholder для поля ввода
   */
  placeholder: null,
  /**
   * Иконка слева для поля ввода
   * @values add, clone, book, card
   */
  iconLeft: null,
  /**
   * Иконка справа для поля ввода
   * @values add, clone, book, card
   */
  iconRight: null,
  /**
   * Иконка для поля ввода
   * @values add, clone, book, card
   * @deprecated для добавления иконки, нужно использовать пропс iconLeft или iconRight
   */
  icon: null,
  /**
   * С какого края отображать иконку в поле ввода
   * @values left, right
   * @deprecated для позиционирования иконки, нужно использовать пропс iconLeft или iconRight
   */
  iconPosition: 'left',
  /**
   * Состояние ошибки
   * @values true, false
   */
  error: false,
  /**
   * Успешное состояние
   * @values true, false
   */
  success: false,
  /**
   * Задизейблено
   * @values true
   */
  disabled: false,
  /**
   * Без border'a
   */
  withoutBorders: false,
  /**
   * Подпись, подставляется перед значением
   */
  prefix: null,
  /**
   * Подпись, подставляется после значения
   */
  postfix: null,
  /**
   * Запретить ли изменение поля самим пользователем
   * @values true
   */
  readonly: false,
  onChange: () => {}
}

export default InputText
