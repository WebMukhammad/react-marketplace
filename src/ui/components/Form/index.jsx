import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return (
      <form
        autoComplete={this.props.autoComplete}
        className={classNames([
          'form',
          `form_${this.props.type}`,
          `form_title-width-${this.props.widthTitle}`,
          { 'form_adaptive-w900': this.props.adaptiveOn900 }
        ])}
        onSubmit={this.onSubmit}
      >
        {/* Содержимое формы, составляется из компонентов FormElement  */}
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  type: PropTypes.string,
  adaptiveOn900: PropTypes.bool,
  autoComplete: PropTypes.string,
  widthTitle: PropTypes.string
}

Form.defaultProps = {
  /**
   * Тип формы
   * @values inline, horizontal, vertical
   */
  type: 'vertical',
  /**
   * Класс для адаптации формы на разрешении экрана в 900px. Введён для оформления заказа. Если передать этот пропс, заголовки встанут над полями при разрешении 900px
   * @values adaptiveOn900
   */
  adaptiveOn900: false,
  /**
   * Атрибут передается напрямую в form
   */
  autocomplete: null,
  /**
   * Ширина заголовка формы
   * @values 120, 130, 140, 150, 160, 170, 180
   */
  widthTitle: '120',
  onSubmit: () => {}
}

export default Form
