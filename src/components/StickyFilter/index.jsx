import React from 'react'
import './style.scss'

export default function StickyFilter({ borderBottom = '1px solid #f3f3f3', children }) {
  return (
    <div className="sticky-filter" style={{ borderBottom }}>
      <div className="sticky-filter__row">{children}</div>
    </div>
  )
}
