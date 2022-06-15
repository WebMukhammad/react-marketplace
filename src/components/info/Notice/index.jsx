import React from 'react'
import './style.scss'
import classNames from 'classnames'

export default function Notice({ type, children, className }) {
  return (
    <div className={classNames('notice', className, { [`notice_${type}`]: type })}>
      <div className="notice__content">{children}</div>
      <div className="notice__bg"></div>
    </div>
  )
}
