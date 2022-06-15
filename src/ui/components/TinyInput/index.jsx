import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import classNames from "classnames";

class TinyInput extends React.Component {
  constructor(props) { 
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.state = {
      value: this.props.value,
    };
  }
  onInput(e) {
    /**
     * Срабатывает при вводе нового значения
     * @property { value } - значение внутри инпута
     */
    this.setState({ value: e.target.value }, () =>
      this.props.onInput(this.state.value)
    );
  }
  onFocus() {
    /**
     * Срабатывает при вводе нового значения
     * @property { value } - значение внутри инпута
     */
    this.props.onFocus(this.state.value);
  }
  onBlur() {
    /**
     * Срабатывает при расфокуске поля
     * @property { event } - стандартный объект Event из обычного обработчика
     */
    this.props.onBlur(this.state.value);
  }

  inputWidth() {
    return this.state.value ? this.state.value.toString().length * 7 + 11 : 35;
  }

  render() {
    return (
      <label
        className={classNames([
          "tiny-input",
          { "tiny-input_error": this.error },
        ])}
      >
        <input
          type={this.props.type}
          className="tiny-input__input"
          value={this.state.value}
          name={this.props.name}
          style={{
            width: this.inputWidth() + "px",
            maxWidth: this.props.maxWidth ? this.props.maxWidth + "px" : null,
          }}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        {this.props.postfix ? (
          <span className="tiny-input__postfix-text">{this.props.postfix}</span>
        ) : null}
      </label>
    );
  }
}

TinyInput.propTypes = {
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
  readonly: PropTypes.bool,
};

TinyInput.defaultProps = {
  /**
   * Атрибут прокидывается напрямую в input
   * @values text, password
   */
  type: "text",
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
  value: "",
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
  iconPosition: "left",
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
  onInput: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export default TinyInput;
