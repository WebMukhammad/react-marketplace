import React, { Children } from 'react'
import './style.scss'

export default function TableWrap({ filter, borderBottom, children }) {
  return (
    <div className="table-wrap">
      <div className="table-wrap__sticky" style={{ borderBottom }}>
        <div className="table-wrap__sticky-row">{filter}</div>
      </div>
      {children}
    </div>
  )
}
