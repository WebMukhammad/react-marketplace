import React from 'react'
import './style.scss'
import Header from 'src/components/Header/index'
import UserAuth from 'src/components/UserAuth/index'
import { mark, remove } from 'src/api/notification'

export default function DefaultLayout({ children }) {
  return (
    <div className="layout">
      <Header className="layout__header">
        <UserAuth success="success" onRemove={remove} onMark={(event) => mark({ notificationIds: event })} />
      </Header>
      <div className="layout__content">{children}</div>
    </div>
  )
}
