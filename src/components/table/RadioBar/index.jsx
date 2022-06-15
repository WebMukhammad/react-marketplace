import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './style.scss'

export default function RadioBar({ list = [], value, onChange = () => {} }) {
  const [active, setActive] = useState(value)

  function onClick(val) {
    if (active !== val) {
      setActive(val)
    }
  }

  useEffect(() => onChange(active), [active])

  return (
    <div className="filters">
      {list.map((item) => (
        <button
          key={item.value}
          className={classNames(['filters__button', { filters__button_active: active === item.value }])}
          onClick={() => onClick(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
