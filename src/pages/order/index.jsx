import React from 'react'
import { orderPage as getOrderPage } from 'src/api/order'
import Order from 'src/components/table/Order'
import Table from 'src/components/table/index'
import beautifyPrice from 'src/helper/beautifyPrice'
import useRequest from 'src/hooks/useRequest'
import StickyFilter from 'src/components/StickyFilter'
import RadioBar from 'src/components/table/RadioBar'
import { useLocation } from 'react-router-dom'

export default function OrderPage() {
  const location = useLocation()
  const [params, setParams] = React.useState({
    state: new URLSearchParams(location.search).get('state') || 'all'
  })
  const [data, loading, error] = useRequest(() => getOrderPage(params), [params])
  const [descriptionData, setDescriptionData] = React.useState({})
  const [descriptionState, setDescriptionState] = React.useState('initial')

  const statusList = [
    { name: 'Все', value: 'all' },
    { name: 'Возврат', value: 'return' },
    { name: 'Продажа', value: 'sale' }
  ]

  function onChangeStatus(val) {
    setParams((prevState) => ({ ...prevState, state: val }))
    setDescriptionState('initial')
  }

  function description(data) {
    if (descriptionState === 'initial') {
      setDescriptionState('active')
    }
    setDescriptionData(data)
  }

  function getBeautifyPrice(val) {
    return Number.isInteger(val) ? `${beautifyPrice(val)}₽` : '-'
  }

  return (
    <div>
      <StickyFilter>
        <RadioBar list={statusList} value={params.state} onChange={onChangeStatus} />
      </StickyFilter>
      <Table
        items={data ? data.list : []}
        cols={[
          {
            title: 'Номер заказа',
            name: 'number',
            minWidth: 120
          },
          {
            title: 'Статус',
            name: 'status',
            minWidth: 150,
            component: ({ data }) => data.title || '-'
          },
          {
            title: 'Дата',
            name: 'date',
            minWidth: 120
          },
          {
            title: 'Кол-во товаров',
            name: 'productCount',
            minWidth: 200
          },
          {
            title: 'Сумма заказа',
            name: 'amount',
            minWidth: 90,
            component: ({ data }) => getBeautifyPrice(data)
          }
        ]}
        interactive
        local-save={{ version: 1, name: 'order-list' }}
        state={loading ? 'loading' : error ? 'error' : 'initial'}
        empty={
          <>
            <div className="h3 mb-8">Нет заказов</div>
            <div className="p mb-12">На этой странице будут показаны ваши продажи и возвраты</div>
          </>
        }
        description={() => <Order data={descriptionData} />}
        descriptionState={descriptionState}
        onDescription={description}
      />
    </div>
  )
}
