import React from 'react'
import './style.scss'
import beautifyPrice from 'src/helper/beautifyPrice'
import declOfNum from 'src/helper/declOfNum'
import Status from 'src/components/Status'
import PropsList from 'src/components/PropsList'
import Button from 'src/ui/components/Button'

export default function Refund({ data, loading, success, onClose }) {
  function getBeautifyPrice(val) {
    return Number.isInteger(val) ? `${beautifyPrice(val)}₽` : '-'
  }

  const convertedProductCount = React.useMemo(
    () => `${data.productCount} ${declOfNum(data.productCount, ['товар', 'товара', 'товаров'])}`,
    [data.productCount]
  )

  return (
    <div className="refund">
      <div className="refund__sup-text">{data.status.title ? <Status data="data.status" /> : null}</div>
      <div className="refund__close icon-close" onClick={onClose}></div>
      <div className="refund__title">{data.store}</div>
      <div className="refund__props-list-wrapper">
        <PropsList
          className="mt-21"
          showMoreValue={false}
          activeCount={3}
          title="Основная информация"
          list={[
            {
              name: 'Номер заявки:',
              value: data.id
            },
            {
              name: 'Дата:',
              value: data.date
            },
            {
              name: 'Сумма заявки:',
              value: data.amount
            },
            {
              name: 'Склад',
              value: data.store
            }
          ]}
        />
      </div>
      {data.product.length ? (
        <div className="refund__product-list">
          <h5 className="h5 mb-9">{convertedProductCount}</h5>
          {data.product.map((item) => (
            <div key={item.id} className="refund__product-item">
              <div className="refund__product-item-col">
                <div className="refund__product-img-wrap">
                  <img className="refund__product-img" src={item.image.url} alt={item.name} />
                </div>
              </div>
              <div className="refund__product-item-col">
                <div className="refund__product-title">{item.name}</div>
                <div className="refund__product-price">{getBeautifyPrice(item.price)}</div>
                <div className="refund__product-characteristic">{item.refund.count ? `${item.refund.count} шт.` : '-'}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="refund__button-wrap">
        {data.confirmedDate ? (
          <Button disabled fluid>
            Подтверждена
          </Button>
        ) : (
          <Button loading={loading} fluid click="activeModal">
            Подтвердить получение
          </Button>
        )}
      </div>
      {/* <Modal
        ref="modal"
        show="modalActive"
        max-width="358px"
        close="modalActive = false"
        title={<div className="refund__modal-title">Подтвердить получение</div>}
      >
        <div className="refund__modal-content">
          <p className="p">
            Вы уверены, что хотите подтвердить получение товара?
          </p>
          <div className="refund__modal-buttons">
            <Button
              className="mr-15"
              loading="loading"
              click="loading ? null : $emit('click', { id: data.id })"
            >
              Подтвердить
            </Button>
            <Button theme="white" click="modalActive = false">
              Отменить
            </Button>
          </div>
        </div>
      </Modal> */}
    </div>
  )
}
