import React from 'react'
import Bill from 'src/api/bill'
import Table from 'src/components/table/index'
import beautifyPrice from 'src/helper/beautifyPrice'
import useRequest from 'src/hooks/useRequest'

export default function BillPage() {
  const [list, loading, error] = useRequest(Bill.get)

  function getBeautifyPrice(val) {
    return Number.isInteger(val) ? `${beautifyPrice(val)}₽` : '-'
  }

  return (
    <Table
      items={list || []}
      cols={[
        {
          title: 'Дата',
          name: 'date',
          minWidth: 120
        },
        {
          title: 'Номер',
          name: 'number',
          minWidth: 120
        },
        {
          title: 'Сумма выплаты',
          name: 'amount',
          minWidth: 150,
          component: ({ data }) => getBeautifyPrice(data)
        }
      ]}
      empty={
        <>
          <div className="h3 mb-8">Нет выплат</div>
          <div className="p mb-12">На этой странице будут показаны ваши выплаты</div>
        </>
      }
      localSave={{ version: 1, name: 'bill-list' }}
      state={loading ? 'loading' : error ? 'error' : 'initial'}
    />
  )
}
