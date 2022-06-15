import React, { useRef, useEffect, createRef } from 'react'
import './style.scss'
import classNames from 'classnames'

function Notification({ list, onMark = () => {}, onRemove = () => {} }) {
  const elRefs = React.useRef([])
  const readListID = []

  if (elRefs.current.length !== list.length) {
    // add or remove refs
    elRefs.current = list.map((_, i) => elRefs.current[i] || createRef()).filter((el) => el.current)
  }

  useEffect(() => {
    if (list?.length) {
      onNotificationSroll()
    }
    return () => {
      readListID.length && onMark(readListID)
    }
  }, [])
  function onNotificationSroll() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.id
        if (entry.isIntersecting && !readListID.includes(id)) {
          readListID.push(id)
        }
      })
    }, options)
    elRefs.current.map((el) => animationObserver.observe(el.current))
  }

  return (
    <div className="notification">
      <div className="notification__header p b">
        Последние уведомления
        {list.length ? <div className="icon-bin notification__header-icon" onClick={onRemove}></div> : null}
      </div>
      {list.length ? (
        <div className="notification__list">
          {list.map((item, index) => (
            <div
              key={item.id}
              ref={item.isReaded ? null : elRefs.current[index]}
              data-id={item.id}
              className={classNames(['notification__item', { notification__item_unread: !item.isReaded }])}
            >
              {item.date ? <div className="notification__item-date">{item.date}</div> : null}

              <div className="notification__row">
                {item.title ? <div className="notification__item-title">{item.title}</div> : null}
                <div className="notification__item-desc">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="notification__empty">
          <div className="notification__empty-icon"></div>
          <h5 className="h5 mb-5">Нет новых уведомлений</h5>
          <p className="p">Здесь вы найдете уведомления о важных изменениях</p>
        </div>
      )}
    </div>
  )
}

export default Notification
