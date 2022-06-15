import React from 'react'
import './style.scss'
import classNames from 'classnames'
import PropsListItem from 'src/components/PropsList/PropsListItem'

function PropsList({ list, size, title, activeCount }) {
  return (
    <div className={classNames(['props-list', `props-list_${size}`])}>
      <h5 className="props-list__title">{title}</h5>
      <div className="props-list__list">
        {list.map((item, index) => (
          <PropsListItem key={index} activeCount={activeCount} item={item} />
        ))}
      </div>
    </div>
  )
}

PropsList.defaultProps = {
  size: 'middle'
}

export default PropsList
