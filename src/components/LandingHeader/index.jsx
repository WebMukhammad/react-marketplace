import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './style.scss'

export default function LandingHeader(params) {
  const hint = null
  const isAuth = useSelector((state) => state.token)

  return (
    <header className="landing-header">
      <div className="landing-header__logo">
        <Link to="/">
          <img
            srcSet={`
                ${require('src/assets/img/landing/logo.png')} 1x,
                ${require('src/assets/img/landing/logo@2x.png')} 2x
              `}
            src={require('src/assets/img/landing/logo.png')}
            alt="Лого"
            className="landing-header__logo-img"
          />
        </Link>
        <span className="landing-header__logo-text">Маркетплейс</span>
      </div>
      <div className="landing-header__menu">
        <div className="landing-header__menu-el landing-header__menu-el_fs0">
          <Link to="/faq" className="landing-header__menu-el-link">
            Справка
          </Link>
        </div>
        <div className="landing-header__menu-el">
          <Link to="/news" className="landing-header__menu-el-link">
            Новости
          </Link>
          {hint ? (
            <Link to={`/news/${hint.slug}`} className="landing-header__menu-hint">
              {hint.name}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="landing-header__auth">
        {isAuth ? (
          <div className="landing-header__sign-in">
            <Link to="/product" className="landing-header__sign-in-link">
              В личный кабинет
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <div className="landing-header__sign-up">
              <Link to="/auth/sign-up" className="landing-header__sign-up-link">
                Регистрация
              </Link>
            </div>
            <div className="landing-header__sign-in">
              <Link to="/auth/sign-in" className="landing-header__sign-in-link">
                Вход
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </header>
  )
}
