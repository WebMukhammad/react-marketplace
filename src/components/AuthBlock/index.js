import React from 'react'
import './style.scss'

export default function AuthBlock({ title, children, bottom }) {
  return (
    <div className="auth-block-wrapper">
      <div className="auth-block">
        <div className="auth-block__content">
          {title ? <h3 className="auth-block__title h3 mb-21">{title}</h3> : null}
          {children}
        </div>
        {bottom ? <div className="auth-block__bottom">{bottom}</div> : null}
      </div>
    </div>
  )
}
