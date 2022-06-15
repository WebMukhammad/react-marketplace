import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import classNames from 'classnames'
import NavigationTooltip from 'src/components/NavigationTooltip/index'
import ToggleHover from 'src/components/ToggleHover/index'
import Notification from 'src/components/Notification/index'
import Popover from 'src/ui/components/Popover/index'
import StatusBlock from 'src/ui/components/StatusBlock/index'
import { Link, useHistory } from 'react-router-dom'
import { getUserData } from 'src/api/auth'
import { getData } from 'src/api/notification'

export default function UserAuth({ onRemove = () => {}, onMark = () => {} }) {
  const isUser = null
  const dispatch = useDispatch()
  const history = useHistory()

  const [listNotification, SetListNotification] = useState([])
  const [notificationReadedCount, SetNotificationReadedCount] = useState(0)
  const [loadingNotification, SetLoadingNotification] = useState(false)
  const [errorNotification, SetErrorNotification] = useState(false)

  useEffect(() => {
    getUserData().then((response) => dispatch({ type: 'user/setData', data: response }))
    getData().then((response) => {
      SetListNotification(response.list)
      SetNotificationReadedCount(response.count)
    })
    return () => {}
  }, [])

  function logout() {
    dispatch({ type: 'user/setData', data: {} })
    dispatch({ type: 'token/setToken', data: null })
    history.push('/auth/sign-in/')
  }

  const { name, status, balance, unreadNotificationCount } = useSelector((state) => state.user)

  return (
    <div className="user-auth">
      <div className="user-auth__wrap-name">
        <ToggleHover className="user-auth__name" toggleParentClassName="user-auth__name_active" data-e2e="user-auth-name">
          <div className="user-auth__name-link-wrap">
            <span className="user-auth__name-link">{name}</span>
            <NavigationTooltip className="navigation-tooltip_user-auth user-auth__navigation-tooltip">
              <Link to="/company/" className="navigation-tooltip__item">
                Данные о компании
              </Link>
              <Link to="/faq/" className="navigation-tooltip__item">
                Справка
              </Link>
              <span className="navigation-tooltip__item" data-e2e="user-auth-logout" onClick={logout}>
                Выйти
              </span>
            </NavigationTooltip>
          </div>
          {status?.title ? (
            <span
              className={classNames([
                'user-auth__sale-marker',
                'user-auth__sale-marker_top',
                { 'user-auth__sale-marker_no-active': isUser }
              ])}
            >
              {status.title}
            </span>
          ) : null}
        </ToggleHover>
        {balance || status?.title ? (
          <div className="user-auth__status">
            {balance ? <div className="user-auth__cash">{balance}₽</div> : null}
            {status?.title ? (
              <span
                className={classNames('user-auth__sale-marker', 'user-auth__sale-marker_bottom', {
                  'user-auth__sale-marker_no-active': isUser
                })}
              >
                {status.title}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <Popover
        width="350px"
        padding="0"
        border="0"
        handler={
          <div className="user-auth__action">
            {unreadNotificationCount ? <div className="user-auth__sup-text">{unreadNotificationCount}</div> : null}
            <div className="icon-notification user-auth__icon" />
          </div>
        }
      >
        {loadingNotification ? (
          <StatusBlock size="m" type="loading" title="Пожалуйста, подождите" />
        ) : errorNotification ? (
          <StatusBlock
            type="error"
            size="m"
            title="Произошла ошибка"
            description="При получении уведомлений произошла ошибка. Пожалуйста, попробуйте позже"
          />
        ) : (
          <Notification
            list={listNotification}
            count={unreadNotificationCount}
            onRemove={() => {
              onRemove()
              SetNotificationReadedCount(0)
            }}
            onMark={(event) => {
              onMark(event)
              SetNotificationReadedCount(unreadNotificationCount - event.length)
            }}
          />
        )}
      </Popover>
    </div>
  )
}
