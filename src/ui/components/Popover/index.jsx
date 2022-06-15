import React from "react";
import { CSSTransition } from "react-transition-group";
import { createPopper } from "@popperjs/core";
import PropTypes from "prop-types";
import "./style.scss";

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.show,
    };
    this.handler = React.createRef();
    this.el = React.createRef();
    this.content = React.createRef();

    this.onHandlerClick = this.onHandlerClick.bind(this);
    this.onHandlerHover = this.onHandlerHover.bind(this);
    this.enablePopover = this.enablePopover.bind(this);
    this.disablePopover = this.disablePopover.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);
  }

  componentDidMount() {
    const typeMethod =
      this.props.event === "click" ? this.onHandlerClick : this.onHandlerHover;
    const event = this.props.event === "click" ? "click" : "mouseenter";
    window.requestAnimationFrame(() =>
      this.handler.current.addEventListener(event, typeMethod)
    );
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
    this.disablePopover();
    if (this.props.appendTo && this.handler.current) {
      this.handler.current.remove();
    }
  }

  onHandlerClick() {
    this.setState((state) => ({ ...state, active: !state.active }));
    this.state.active ? this.enablePopover() : this.disablePopover();
  }

  onHandlerHover() {
    this.setState({ active: true });
    window.addEventListener("mousemove", this.onWindowMouseover);
  }

  onWindowMouseover({ target }) {
    const $popoverModal = target.closest(".popover");
    if ($popoverModal === this.el && this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    } else if ($popoverModal !== this.el && !this.timer) {
      this.timer = setTimeout(() => {
        this.setState({ active: false });
        window.removeEventListener("mousemove", this.onWindowMouseover);
      }, this.time);
    }
  }

  enablePopover() {
    this.$popover = createPopper(this.handler.current, this.content.current, {
      placement: this.props.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: this.props.offset,
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: this.props.offsetWindow,
          },
        },
      ],
    });

    window.requestAnimationFrame(() => {
      if (this.appendTo) this.appendTo.append(this.content.current);
      window.addEventListener("click", this.onWindowClick);
    });
  }

  disablePopover() {
    if (!this.$popover) return;
    this.$popover.destroy();
    this.$popover = null;
    window.removeEventListener("click", this.onWindowClick);
  }

  onWindowClick(e) {
    const $popoverModal = e.target.closest(".popover__modal");
    const notCurrentModal = $popoverModal !== this.content.current;
    if (notCurrentModal) {
      this.setState({ active: false });
      this.disablePopover();
    }
  }

  render() {
    return (
      <div ref={this.el} className="popover">
        <span ref={this.handler} className="popover__handler">
          {/* Элемент, при клике на который будет происходить активация окна  */}
          {this.props.handler}
        </span>
        <CSSTransition
          timeout={300}
          transitionname={{
            enter: `${this.props.entryAnimation}-enter`,
            enterActive: `${this.props.entryAnimation}-enter-active`,
            leave: `${this.props.exitAnimation}-leave`,
            leaveCctive: `${this.props.exitAnimation}-leave-active`,
          }}
          onEnter={() => console.log("sdsdssdds")}
          onExited={() => console.log("sdsdssdds")}
        >
          {this.state.active ? (
            <div
              ref={this.content}
              className="popover__modal p"
              style={{
                width: this.props.width,
                padding: this.props.padding,
                overflow: this.props.overflow,
              }}
            >
              {this.props.title ? (
                <div className="popover__head">{this.props.title}</div>
              ) : null}
              {/* Содержимое окна  */}
              {this.props.children}
            </div>
          ) : (
            <div></div>
          )}
        </CSSTransition>
      </div>
    );
  }
}

Popover.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string,
  event: PropTypes.string,
  time: PropTypes.number,
  width: PropTypes.string,
  padding: PropTypes.string,
  overflow: PropTypes.string,
  show: PropTypes.bool,
  offset: PropTypes.array,
  offsetWindow: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  appendTo: PropTypes.node,
  entryAnimation: PropTypes.string,
  exitAnimation: PropTypes.string,
};

Popover.defaultProps = {
  /**
   * Заголовок для всплывашки
   */
  title: null,
  /**
   * Предпочитаемая сторона появления
   */
  placement: "bottom",
  /**
   * Событие, при котором будет происходить активация окна
   * @values click, hover
   */
  event: "click",
  /**
   * Время для таймера в мс, по истечении которого будет скрываться всплывашка, если курсор находится вне всплывашки
   */
  time: 300,
  /**
   * Ширина всплывашки
   */
  width: "320px",
  /**
   * Внутренний отступ
   */
  padding: "17px 20px 24px",
  /**
   * Состояние скролла
   */
  overflow: "visible",
  /**
   * Показывать всплывашку
   */
  show: false,
  /**
   * Отступ между вызывающим элементом и модалкой, считается по [это](https://popper.js.org/docs/v2/modifiers/offset/) технологии
   */
  offset: [0, 10],
  /**
   * Отступ между Popover'ом и краем окна браузера
   */
  offsetWindow: 10,
  /**
   * Дом нода, куда будет происходить перенос окна
   */
  appendTo: null,
  /**
   * Тип анимации появления модального окна
   * @values fade-in
   */
  entryAnimation: "fade-in",
  /**
   * Тип анимации скрытия модального окна
   * @values fade-out
   */
  exitAnimation: "fade-out",
};

export default Popover;
