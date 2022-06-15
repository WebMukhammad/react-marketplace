import classNames from 'classnames'
import React, { useEffect } from 'react'
import './style.scss'

function getText({ text, count, height, index } = {}) {
  return `${text}${count > index ? ', ' : ''}`
}

function PropsListItem({ item, activeCount }) {
  // Количество строк умножаем на высоту строки
  const height = activeCount * 17
  const [showMoreValue, setShowMoreValue] = React.useState(null)
  const hiddenWrapper = React.useRef()
  useEffect(() => needToBeActive(), [])

  const maxHeight = React.useMemo(() => (showMoreValue ? `${height}px` : null), [showMoreValue])

  function needToBeActive() {
    if (activeCount && hiddenWrapper.current?.offsetHeight > height) {
      setShowMoreValue(true)
    }
  }

  return (
    <div className="props-list-item">
      <div className="props-list-item__prop">{item.name}</div>
      <div className={classNames(['props-list-item__value', { 'props-list-item__value_crop': showMoreValue }])} style={{ maxHeight }}>
        <div ref={hiddenWrapper} className="props-list-item__value-text">
          {Array.isArray(item.value)
            ? item.value.map((el, index) => getText({ text: el, count: item.value.length - 1, index }))
            : item.value}
        </div>
        <span onClick={() => setShowMoreValue(false)}>Развернуть</span>
      </div>
    </div>
  )
}

export default PropsListItem
