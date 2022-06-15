import React from 'react'
import './style.scss'
import ToggleHover from 'src/components/ToggleHover'
import NavigationTooltip from 'src/components/NavigationTooltip'
import { Link } from 'react-router-dom'

export default function LandingHeader() {
  return (
    <div className="header-menu">
      <div className="header-menu__item">
        <ToggleHover className="header-menu__item-wrap" toggleParentClassName="header-menu__item-wrap_active">
          <Link to="/product" className="header-menu__item-link">
            <div className="header-menu__icon header-menu__icon_product" />
            Товары
            <div className="header-menu__icon-arrow" />
          </Link>
          <NavigationTooltip>
            <div className="navigation-tooltip__list">
              <Link to="/product" className="navigation-tooltip__item navigation-tooltip__item_selected">
                Список товаров
              </Link>
              <Link to="/product/create" className="navigation-tooltip__item">
                Добавление
              </Link>
              <Link to="/product/xls/create" className="navigation-tooltip__item">
                Импорт из XLS
              </Link>
              <Link to="/product/xls/update" className="navigation-tooltip__item">
                Обновление цен и остатков XLS
              </Link>
            </div>
          </NavigationTooltip>
        </ToggleHover>
      </div>
      <Link to="/order" className="header-menu__item">
        <div className="header-menu__icon header-menu__icon_cash" />
        Заказы
      </Link>
      <Link to="/bill" className="header-menu__item">
        <div className="icon-new icon-new_white header-menu__icon header-menu__icon_bill" />
        Расчеты
      </Link>
      <Link to="/dashboard" className="header-menu__item">
        <div className="icon-new icon-new_white header-menu__icon header-menu__icon_equalizer" />
        Аналитика
      </Link>
      <Link to="/refund" className="header-menu__item">
        <div className="icon-new icon-new_white header-menu__icon header-menu__icon_cube" />
        Вывоз товара
      </Link>
    </div>
  )
}
