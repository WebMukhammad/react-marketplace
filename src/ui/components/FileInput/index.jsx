import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import classNames from 'classnames'
import declOfNum from 'src/helper/declOfNum'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const STATUS_SELECTED = 4

function getInitialStatus(status) {
  switch (status) {
    case 'initial':
      return STATUS_INITIAL
    case 'saving':
      return STATUS_SAVING
    case 'success':
      return STATUS_SUCCESS
    case 'failed':
      return STATUS_FAILED
    case 'selected':
      return STATUS_SELECTED
  }
}

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onFileChange = this.onFileChange.bind(this)
    this.state = {
      uploadError: false,
      currentStatus: getInitialStatus(this.props.status)
    }
  }

  isInitial() {
    return this.state.currentStatus === STATUS_INITIAL
  }
  isSaving() {
    return this.state.currentStatus === STATUS_SAVING
  }
  isSuccess() {
    return this.state.currentStatus === STATUS_SUCCESS
  }
  isFailed() {
    return this.state.currentStatus === STATUS_FAILED
  }
  isSelected() {
    return this.state.currentStatus === STATUS_SELECTED
  }

  async save(formData, fileList) {
    this.setState({ currentStatus: STATUS_SAVING })
    try {
      const response = await this.props.uploadTo({
        fileList,
        name: this.name
      })
      /**
       * Вызывается после успешной загрузки файла
       * @property {object} response данные, пришедшие в ответ после успешной загрузки
       */
      this.$emit('afterUpload', response)
      this.setState({ currentStatus: STATUS_SUCCESS })
    } catch (e) {
      this.setState({
        currentStatus: STATUS_FAILED,
        uploadError: e?.response?.error || this.state.uploadError
      })
    }
  }
  onFileChange({ target }) {
    if (!target.files.length) return

    if (this.props.uploadTo) {
      this.save(target)
    } else {
      /**
       * Вызывается после выбора файлов
       * @property {array} fileList список выбранных файлов напрямую из инпута
       */
      this.$emit('change', { files: target.files })
      this.setState({ currentStatus: STATUS_SELECTED })
    }
    this.fileCount = fileList.length
  }
  getState(count, arr) {
    return count === 1 ? arr[0] : `${count} ${declOfNum(count, arr)}`
  }

  render() {
    return (
      <div className={classNames(['file-input', { 'file-input_disabled': this.props.disabled }])}>
        <label className="file-input__wrapper">
          {this.isInitial() ? (
            <div className="file-input__fake">
              <div className="file-input__icon"></div>
              <span className="file-input__text ml-4">{this.props.initialText}</span>
            </div>
          ) : this.isSaving() ? (
            <div className="file-input__fake">
              <div className="file-input__icon file-input__icon_loading"></div>
              <span className="file-input__title">Загрузка {getState(fileCount, savingText)}</span>
            </div>
          ) : this.isSuccess() ? (
            <div className="file-input__fake">
              <div className="file-input__icon file-input__icon_uploaded"></div>
              <span className="file-input__title">{getState(fileCount, successText)}</span>
            </div>
          ) : this.isFailed() ? (
            <div className="file-input__fake">
              <div className="file-input__icon file-input__icon_error"></div>
              <span className="file-input__title">Ошибка, </span>
              <span className="file-input__text">попробуйте еще раз</span>
            </div>
          ) : this.isSelected() ? (
            <div className="file-input__fake">
              <div className="file-input__icon"></div>
              <span className="file-input__title">{getState(fileCount, selectedText)}</span>
            </div>
          ) : null}
          <input
            type="file"
            className="file-input__input"
            accept={this.props.accept}
            disabled={this.props.disabled}
            name={this.props.name}
            multiple={this.props.multiple}
            onChange={this.onFileChange}
          />
        </label>
      </div>
    )
  }
}

FileInput.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  initialText: PropTypes.string,
  savingText: PropTypes.array,
  successText: PropTypes.array,
  selectedText: PropTypes.array,
  multiple: PropTypes.bool,
  uploadTo: PropTypes.func,
  status: PropTypes.string,
  accept: PropTypes.string
}

FileInput.defaultProps = {
  /**
   * Кнопка задизейблена
   * @values true, false
   */
  disabled: false,
  /**
   * Атрибут name для инпута
   */
  name: null,
  /**
   * Текст, при начальном состоянии инпута
   */
  initialText: 'Выберите файл для загрузки',
  /**
   * Текст, при состоянии загрузки инпута.
   * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
   * За преобразование в правильный падеж отвечает функция declOfNum
   */
  savingText: ['файла', 'файлов', 'файлов'],
  /**
   * Текст, при успешном состоянии инпута.
   * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
   * За преобразование в правильный падеж отвечает функция declOfNum
   */
  successText: ['Файл загружен, перезагрузить', 'файла загружено, перезагрузить', 'файлов загружено, перезагрузить'],
  /**
   * Текст, после выбора файлов.
   * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
   * За преобразование в правильный падеж отвечает функция declOfNum
   */
  selectedText: ['Файл выбран', 'файла выбрано', 'файлов выбрано'],
  /**
   * Возможен ли выбор нескольких файлов
   */
  multiple: false,
  /**
   * Вызывается при загрузке, в качестве параметров передается formData, внутри функции нужно куда-нибудь отправить файлы и вернуть промис
   */
  uploadTo: Function,
  /**
   * Начальное состояние инпута
   * @values initial, saving, success, failed, selected
   */
  status: 'initial',
  /**
   * MIME-форматы, которые можно выбрать в инпуте
   */
  accept: 'image/*',
  value: ''
}

export default FileInput
