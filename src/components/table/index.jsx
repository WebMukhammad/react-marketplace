import React from 'react'
import './style.scss'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import Checkbox from 'src/ui/components/Checkbox'
import classNames from 'classnames'
import ToggleHover from 'src/components/ToggleHover'
import NavigationTooltip from 'src/components/NavigationTooltip'
import Button from 'src/ui/components/Button'

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      descriptionStateInner: this.props.descriptionState,
      heightDescription: null,
      activeDescriptionID: null,
      colsCopy: props.cols.map((el) => ({
        ...el,
        checked: true,
        filledToViewport: true
      }))
    }
    this.tableCol = React.createRef()
    this.notEmptyColumn = this.notEmptyColumn.bind(this)
    this.descriptionReset = this.descriptionReset.bind(this)
    this.recalculateDescriptionHeight = this.recalculateDescriptionHeight.bind(this)
    this.recalculateColumnViewportVisibility = this.recalculateColumnViewportVisibility.bind(this)
  }

  componentDidMount() {
    if (this.props.localSave) {
      try {
        const fromStore = JSON.parse(window.localStorage.getItem(this.props.localSave.name))
        if (fromStore?.version && fromStore.version !== this.props.localSave.version) {
          window.localStorage.removeItem(this.props.localSave.name)
          this.setState({
            colsCopy: this.state.colsCopy.map((el) => ({
              ...el,
              checked: true,
              filledToViewport: true
            }))
          })
        } else if (fromStore?.version) {
          this.setState({
            colsCopy: fromStore.cols
          })
        } else {
          this.setState({
            colsCopy: this.state.colsCopy.map((el) => ({
              ...el,
              checked: true,
              filledToViewport: true
            }))
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    this.recalculateColumnViewportVisibility()
    this.recalculateDescriptionHeight()
    window.addEventListener('resize', this.recalculateColumnViewportVisibility)
    window.addEventListener('scroll', this.recalculateDescriptionHeight, {
      passive: true
    })
  }

  onGlobalCheckboxChange(state) {
    this.globalCheckboxState = state
    if (state) {
      this.selected = this.props.items.filter((el) => !['yml', 'yaml'].includes(el.imported))
    } else {
      this.selected = []
    }
  }
  recalculateDescriptionHeight() {
    if (this.props.description || this.props.descriptionDefault) {
      const el = this.props.elementScrollChangeHeight ? document.querySelector(this.props.elementScrollChangeHeight) : null
      const entryBottom = el?.getBoundingClientRect?.()?.bottom || 0
      const height = window.innerHeight - this.props.valueToSubtractDescriptionHeight
      this.setState({
        heightDescription: height - Math.max(entryBottom, 0)
      })
    }
  }
  activeColumnCount() {
    let count = 0
    this.state.colsCopy.forEach((el) => {
      if (el.checked && el.filledToViewport) {
        count += 1
      }
    })
    return count
  }

  resetItemSelected(id) {
    const activeindex = this.selected.findIndex((el) => el.id === id)
    if (activeindex !== -1) {
      this.selected.splice(activeindex, 1)
    }
  }

  notEmptyColumn(el) {
    if (Array.isArray(el)) {
      return !!el.length
    } else if (el instanceof Object) {
      // TODO добавить el
      return !!Object.keys({}).length
    } else {
      return !!el
    }
  }

  sort(name) {
    if (this.activeSortEl === `${name}-desc`) {
      this.activeSortEl = `${name}-asc`
      this.props.onSort({ sort: name, order: 'desc' })
    } else {
      this.activeSortEl = `${name}-desc`
      this.props.onSort({ sort: name, order: 'asc' })
    }
    if (this.scrollToSelector) {
      const $el = document.querySelector(this.scrollToSelector)
      scrollIntoView($el, {
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
  onColumnChange(arr) {
    // this.state.colsCopy = arr;
    // this.recalculateColumnViewportVisibility();
    if (this.props.localSave) {
      window.localStorage.setItem(
        this.props.localSave.name,
        JSON.stringify({
          version: this.props.localSave.version,
          cols: this.state.colsCopy
        })
      )
    }
  }

  onDoubleClick(e, id) {
    // если у элемента, на который мы нажали, находится класс ignore-double-click, то завершаем выполнение данного метода
    const isIgnoreDoubleClick = !e.target.closest(`.${this.ignoreDoubleClick}`)
    if (isIgnoreDoubleClick) {
      this.props.onDoubleClick(id)
    }
  }

  description(e, data) {
    // если у элемента, на который мы нажали, находится класс ignore-select, то завершаем выполнение данного метода
    const isIgnoreSelect = !e.target.closest(`.${this.ignoreSelect}`)
    if (this.props.description && this.props.interactive && isIgnoreSelect) {
      if (this.state.activeDescriptionID === data.id && this.state.descriptionStateInner === 'active') {
        this.descriptionReset()
      } else {
        this.setState({
          activeDescriptionID: data.id,
          descriptionStateInner: 'active'
        })
        this.props.onDescription(data)
        window.requestAnimationFrame(() => this.recalculateColumnViewportVisibility())
      }
    }
  }
  descriptionReset() {
    this.setState({
      activeDescriptionID: null,
      descriptionStateInner: 'initial'
    })
    window.requestAnimationFrame(() => this.recalculateColumnViewportVisibility())
  }

  recalculateColumnViewportVisibility() {
    const offset = 120
    const maxWidth = this.tableCol.current?.offsetWidth - offset
    let currentWidth = 0
    let filled = false
    const colsCopy = this.state.colsCopy.map((el) => {
      if (filled) {
        el.filledToViewport = false
      } else if (el.checked) {
        currentWidth += el.minWidth
        if (currentWidth > maxWidth) {
          currentWidth -= el.maxWidth
          filled = true
          el.filledToViewport = false
        } else {
          el.filledToViewport = true
        }
      } else {
        el.filledToViewport = false
      }
      return el
    })

    this.setState({ colsCopy })
  }

  render() {
    let selected = []
    let globalCheckboxState = false
    let activeSortEl = this.props.activeSort ? `${this.props.activeSort.sort}-${this.props.activeSort.order}` : null
    const ignoreSelect = null
    let routeID = null

    return (
      <div className={classNames(['table', { table_selected: selected.length }])} style={{ borderTop: this.props.borderTop }}>
        <div ref={this.tableCol} className="table__wrap-col">
          <div className="table__sticky" style={{ top: this.props.top }}>
            {this.props.tool ? (
              <Checkbox className="table__sticky-checkbox" checked={globalCheckboxState} onChange={this.onGlobalCheckboxChange} />
            ) : null}
            {this.state.colsCopy
              .filter((el) => el.checked && el.filledToViewport)
              .map((el) => (
                <div
                  key={el.name}
                  className={classNames([
                    'table__sticky-col',
                    {
                      'table__sticky-col_icon': el.sort,
                      'table__sticky-col_selected': activeSortEl === `${el.sort}-desc`,
                      'table__sticky-col_selected-asc': activeSortEl === `${el.sort}-asc`
                    }
                  ])}
                  style={{ minWidth: `${el.minWidth}px` }}
                  onClick={() => el.sort && this.sort(el.sort)}
                >
                  {el.title}
                  <div
                    className={classNames({
                      'table__sticky-col-icon table__sticky-col-icon_sort': el.sort
                    })}
                  />
                  <div
                    className={classNames({
                      'table__sticky-col-icon table__sticky-col-icon_close':
                        activeSortEl === `${el.sort}-desc` || activeSortEl === `${el.sort}-asc`
                    })}
                    onClick={(activeSortEl = null)}
                  />
                </div>
              ))}
            <ToggleHover className="table__sticky-setting" toggleParentClassName="table__sticky-setting_active">
              <span className="table__sticky-cols-count">
                {this.activeColumnCount()} / {this.props.cols.length}
              </span>
              <div className="icon-setting" />
              <NavigationTooltip className="navigation-tooltip_setting table__sticky-navigation-tooltip">
                <div className="navigation-tooltip__header-text">Колонки</div>
                {/* <draggable v-model="colsCopy" @end="onColumnChange(colsCopy)"> */}
                {this.state.colsCopy.map((item, index) => (
                  <div key={item.name} className="navigation-tooltip__item table__sticky-navigation-tooltip-item">
                    <Checkbox
                      className="navigation-tooltip__checkbox mr-8"
                      checked={item.checked}
                      disabled={item.checked && this.activeColumnCount() === 1}
                      onChange={({ checked }) => {
                        const colsCopy = [...this.state.colsCopy]
                        colsCopy[index].checked = checked
                        this.setState({ colsCopy })
                        this.onColumnChange(this.state.colsCopy)
                      }}
                    >
                      {item.title}
                    </Checkbox>
                    <div className="icon-drag-handler table__sticky-navigation-tooltip-item-icon"></div>
                  </div>
                ))}
                {/* </draggable> */}
              </NavigationTooltip>
            </ToggleHover>
          </div>
          {this.props.state === 'loading' ? (
            <div className="table__info-block">
              {this.props.loading ? (
                this.props.loading
              ) : (
                <>
                  <div className="h3 mb-8">Идет загрузка...</div>
                  <div className="p mb-12">Пожалуйста, подождите</div>
                </>
              )}
            </div>
          ) : this.props.state === 'error' ? (
            <div className="table__info-block">
              {this.props.error ? (
                this.props.error
              ) : (
                <>
                  <div className="h3 mb-8">Произошла ошибка</div>
                  <div className="p mb-12">Попробуйте повторить запрос или сделать его позднее</div>
                </>
              )}
            </div>
          ) : this.props.items.length === 0 ? (
            <div className="table__info-block">
              {this.props.empty ? (
                this.props.empty
              ) : (
                <>
                  <div className="h3 mb-8">Нет элементов</div>
                  <div className="p mb-12">Сбросьте фильтры или добавьте новый элемент</div>
                </>
              )}
            </div>
          ) : (
            <div className="table__wrap-list">
              {this.props.items.map((item) => (
                <div
                  key={item.id}
                  className={classNames([
                    'table__list',
                    {
                      table__list_marked: +routeID === +item.id,
                      table__list_interactive: this.props.interactive || this.props.onDoubleClick
                    }
                  ])}
                  onClick={(e) => this.description(e, item)}
                  onDoubleClick={(e) => this.onDoubleClick(e, item.id)}
                >
                  {this.props.tool ? (
                    <div className={('table__checkbox-wrap', ignoreSelect)}>
                      <Checkbox
                        name="count"
                        checked={this.getActiveID(item.id)}
                        disabled={['yml', 'yaml'].some((el) => el === item.imported)}
                        onChange={($event) => this.onItemSelect($event, item.id, item)}
                      />
                    </div>
                  ) : null}

                  {this.state.colsCopy
                    .filter((col) => col.filledToViewport && col.checked)
                    .map((col) => (
                      <div key={col.name} className="table__col" style={{ minWidth: `${col.minWidth}px` }}>
                        {col.component ? (
                          col.component({
                            item,
                            data: item[col.name],
                            ignoreSelect,
                            ignoreDoubleClick: this.ignoreDoubleClick,
                            notEmpty: this.notEmptyColumn(item[col.name])
                          })
                        ) : this.notEmptyColumn(item[col.name]) ? (
                          item[col.name]
                        ) : (
                          <div className="table__empty-col">-</div>
                        )}
                      </div>
                    ))}
                  <div className="table__more-wrapper">
                    {this.props.more
                      ? this.props.more({
                          item,
                          resetItemSelected: this.resetItemSelected
                        })
                      : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          {selected.length ? (
            <div className="table__selected-fixed">
              {this.props.tool
                ? this.props.tool({
                    selected,
                    resetSelected: this.resetSelected,
                    selectedState: this.selectedState
                  })
                : null}
              <div className="ml-auto" onClick="resetSelected">
                <Button theme="transparent" size="h-33" className="table__selected-fixed-button" icon="back">
                  Сбросить выбор
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        {this.props.description && this.state.descriptionStateInner === 'active' ? (
          <div className="table__wrap-col table__wrap-col_w-455">
            <div
              className="table__wrap-col-sticky"
              style={{
                height: `${this.state.heightDescription}px`,
                top: `${this.props.valueToSubtractDescriptionHeight}px`
              }}
            >
              {this.props.description({
                reset: this.descriptionReset
              })}
            </div>
          </div>
        ) : this.props.descriptionDefault ? (
          <div className="table__wrap-col table__wrap-col_w-455">
            <div
              className="table__wrap-col-sticky"
              style={{
                height: `${this.state.heightDescription}px`,
                top: `${this.props.valueToSubtractDescriptionHeight}px`
              }}
            >
              {this.props.descriptionDefault({})}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

Table.defaultProps = {
  state: 'initial',
  elementScrollChangeHeight: '.header',
  valueToSubtractDescriptionHeight: 66,
  onDescription: () => {},
  onDoubleClick: () => {}
}

export default Table
