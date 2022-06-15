import React from 'react'
import './style.scss'
import HeaderMenu from 'src/components/Header/HeaderMenu/index'
import { Link } from 'react-router-dom'

export default function Header({ children }) {
  return (
    <header className="header">
      <Link to="/product" className="logo mr-31">
        <img src={require('src/assets/img/logo.png')} className="logo__img" alt="" />
        <span className="logo__text">Маркетплейс</span>
      </Link>
      <HeaderMenu className="mr-10" />
      <div className="header__auth ml-auto">{children}</div>
    </header>
  )
}
