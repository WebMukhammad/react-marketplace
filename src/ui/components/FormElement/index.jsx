import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
class FormElement extends React.Component {
  render() {
    return (
      <div className="form-element__row">
        {this.props.title && (
          <div className="form-element__title" style={{ minHeight: this.titleMinHeight }}>
            {this.props.required ? (
              <div>
                {this.props.title}
                <span className="red-text">*</span>
              </div>
            ) : (
              this.props.title
            )}
          </div>
        )}
        <div className="form-element__field">
          {/*  @slot Поле формы  */}
          {this.props.children || this.props.field}
        </div>
        <div
          style={{ minHeight: this.props.hintMinHeight }}
          className={classNames(['form-element__hints', { 'form-element__hints_not-label': !this.title }])}
        >
          {this.props.error ? (
            <div className="form-element__error-text">
              {/*  Текст для ошибки элемента формы  */}
              {this.props.error}
            </div>
          ) : this.props.helper ? (
            <div className="form-element__helper-text">
              {/* Текст для подсказки элемента формы  */}
              {this.props.helper}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

FormElement.propTypes = {
  titleMinHeight: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  hintMinHeight: PropTypes.string
}

FormElement.defaultProps = {
  /**
   * Класс для адаптации заголовков элемента формы
   * @values Нужная нам высота
   */
  titleMinHeight: null,
  /**
   * Текст ошибки для поля ввода
   */
  error: null,
  /**
   * Текст подсказки для поля ввода
   */
  helper: null,
  /**
   * Заголовок элемента формы
   */
  title: null,
  /**
   * Добавления * в конец названия поля на обязательность заполнения
   */
  required: false,
  /**
   * Кастомный min-height у хинта
   */
  hintMinHeight: '13px'
}

export default FormElement
