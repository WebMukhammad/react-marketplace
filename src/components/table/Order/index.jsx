import React from 'react'
import './style.scss'
import beautifyPrice from 'src/helper/beautifyPrice'
import declOfNum from 'src/helper/declOfNum'

export default function Order({ data }) {
  function getBeautifyPrice(val) {
    return Number.isInteger(val) ? `${beautifyPrice(val)}₽` : '-'
  }

  function convertTitle() {
    return `${data.product.length} ${declOfNum(data.product.length, ['товар', 'товара', 'товаров'])}`
  }

  function getOrderText(name, val1, val2) {
    return name === 'sale' ? val1 : val2
  }

  return (
    <div className="order">
      {/* <!-- <div className="order__sup-text">Заказ ожидает оплаты</div> --> */}
      <div className="order__title">{convertTitle}</div>
      {data.product.length ? (
        <div className="order__product-list">
          {data.product.map((product) => (
            <div key={product.id} className="order__product-item">
              <div className="order__product-item-col">
                <div className="order__product-img-wrap">
                  <img className="order__product-img" src={product.image.url} alt={product.name} />
                </div>
              </div>
              <div className="order__product-item-col">
                <div className="order__product-title">{product.name}</div>
                <div className="order__product-price">{getBeautifyPrice(product.price)}</div>
                <div className="order__product-characteristic">{product.quantity ? `${product.quantity} шт.` : '-'}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="order__title mt-21">Информация о {getOrderText(data.status.name, 'заказе', 'возврате')}</div>
      <div className="order-list mt-2">
        <div className="order-list__row">
          <div className="order-list__prop">Номер:</div>
          <div className="order-list__value">{data.number || '-'}</div>
        </div>
        <div className="order-list__row">
          <div className="order-list__prop">Дата {getOrderText(data.status.name, 'заказа', 'возврата')}:</div>
          <div className="order-list__value">{data.date || '-'}</div>
        </div>
        <div className="order-list__row">
          <div className="order-list__prop">Статус:</div>
          <div className="order-list__value">{data.status.title || '-'}</div>
        </div>
      </div>
      <div className="order-list-total__row mt-21">
        <div className="order-list-total__prop order-list-total__prop-bold">Сумма:</div>
        <div className="order-list-total__value order-list-total__value-bold">{getBeautifyPrice(data.amount)}</div>
      </div>
    </div>
  )
}
