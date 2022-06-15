import React from 'react'
import './style.scss'
import classNames from 'classnames'

function Status({ data, size }) {
  return (
    <div className={classNames(['status', `status_size-${size}`, `status_${data.name}`])}>
      <span className="status__title">{data.title}</span>
    </div>
  )
}

Status.defaultProps = {
  data: {},
  size: 'middle'
}

export default Status
