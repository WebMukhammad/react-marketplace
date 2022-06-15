import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
class StatusBlock extends React.Component {
  constructor(props) {
    super(props);
    this.defaultTitle = this.defaultTitle.bind(this);
    this.width = this.width.bind(this);
  }

  defaultTitle() {
    if (this.props.type === "loading" && !this.props.title) {
      return "Идёт загрузка";
    } else if (this.props.type === "error" && !this.props.title) {
      return "Ошибка";
    } else if (this.props.type === "empty" && !this.props.title) {
      return "Нет данных";
    } else if (this.props.type === "warning" && !this.props.title) {
      return "Внимание";
    }
    return null;
  }

  width() {
    return this.props.size !== "s" ? this.props.contentWidth : null;
  }

  render() {
    return (
      <div
        className={classNames([
          "status-block",
          { [`status-block_size-${this.props.size}`]: this.props.size },
        ])}
        style={{
          width: this.width(),
          margin: this.props.margin,
          padding: this.props.padding,
        }}
      >
        <div
          className={classNames([
            "status-block__icon",
            { [`status-block__icon_${this.props.type}`]: this.props.type },
          ])}
        />
        <p
          className={classNames([
            "status-block__title",
            { [`status-block__title_${this.props.type}`]: this.props.type },
          ])}
        >
          {this.defaultTitle() ? this.defaultTitle() : this.props.title}
        </p>
        {this.props.description ? (
          <div className="p status-block__description">
            {/* @slot Текст для компонента загрузки и ошибок */}
            {this.props.description}
          </div>
        ) : null}
      </div>
    );
  }
}

StatusBlock.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  contentWidth: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
};

StatusBlock.defaultProps = {
  /**
   * Тип состояния
   * @values error, warning, loading, empty
   */
  type: null,
  /**
   * Размер состояния
   * @values s, m, l
   */
  size: null,
  /**
   * Заголовок состояния
   *
   */
  title: null,
  /**
   * Описание состояния
   */
  description: null,
  /**
   * Ширина текстового содержимого
   */
  contentWidth: null,
  /**
   * Внешний отступ
   */
  margin: "0 auto",
  /**
   * Внутренний отступ
   */
  padding: null,
};

export default StatusBlock;
