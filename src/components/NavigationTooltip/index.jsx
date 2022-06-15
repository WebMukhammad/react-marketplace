import React from 'react'
import './style.scss'
import classNames from 'classnames'

export default function NavigationTooltip({ children, className }) {
  return <div className={classNames(['navigation-tooltip', className])}>{children}</div>
}
