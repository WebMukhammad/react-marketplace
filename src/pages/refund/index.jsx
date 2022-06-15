import React from 'react'
import { get, getByID } from 'src/api/refund'
import Refund from 'src/components/table/Refund'
import Status from 'src/components/Status'
import Table from 'src/components/table/index'
import beautifyPrice from 'src/helper/beautifyPrice'
import useRequest from 'src/hooks/useRequest'
import StatusBlock from 'src/ui/components/StatusBlock'

export default function RefundPage() {
  const [list, loading, error] = useRequest(get)
  const [date, setDate] = React.useState(null)
  const [descriptionState, setDescriptionState] = React.useState('initial')
  const [descriptionData, setDescriptionData] = React.useState('initial')
  const [descriptionLoading, setDescriptionLoading] = React.useState(false)
  const [descriptionError, setDescriptionError] = React.useState(null)

  function getBeautifyPrice(val) {
    return Number.isInteger(val) ? `${beautifyPrice(val)}₽` : '-'
  }

  function getDescriptionData({ id } = {}) {
    setDescriptionLoading(true)
    setDescriptionError(null)
    getByID({ id })
      .then((response) => setDescriptionData(response))
      .catch(() => setDescriptionError(true))
      .finally(() => setDescriptionLoading(false))
  }

  function description(data) {
    if (descriptionState === 'initial') {
      setDescriptionState('active')
    }
    getDescriptionData({ id: data.id })
  }

  return (
    <Table
      items={list || []}
      cols={[
        {
          title: 'Номер заявки',
          name: 'id',
          minWidth: 120
        },
        {
          title: 'Дата',
          name: 'date',
          minWidth: 120
        },
        {
          title: 'Подтверждена',
          name: 'confirmedDate',
          minWidth: 150,
          component: ({ data }) => data || <span className="grey-text">Не подтверждена</span>
        },
        {
          title: 'Сумма заявки',
          name: 'amount',
          minWidth: 120,
          component: ({ data }) => getBeautifyPrice(data)
        },
        {
          title: 'Кол-во товаров',
          name: 'productCount',
          minWidth: 120
        },
        {
          title: 'Статус',
          name: 'status',
          minWidth: 120,
          component: ({ data }) => <Status data={data} />
        },
        {
          title: 'Склад',
          name: 'store',
          minWidth: 300,
          component: ({ data }) => <p className="p p_crop-1">{data || '-'}</p>
        }
      ]}
      interactive
      local-save={{ version: 1, name: 'refund-list' }}
      state={loading ? 'loading' : error ? 'error' : 'initial'}
      empty={
        date ? (
          <StatusBlock
            type="empty"
            size="m"
            title="Товаров для вывоза не найдено"
            description={
              <div className="p mb-12">
                Попробуйте сформулировать ваш <br />
                запрос иначе
              </div>
            }
          />
        ) : (
          <>
            <div className="h3 mb-8">Нет товаров для вывоза</div>
            <div className="p mb-12">На этой странице будут выводиться товары, которые вы должны вывезти с нашего склада</div>
          </>
        )
      }
      description={({ reset }) =>
        descriptionLoading ? (
          <StatusBlock size="m" type="loading" margin="auto" title="Пожалуйста, подождите" />
        ) : descriptionError ? (
          <StatusBlock size="m" margin="auto" type="error" title="Ошибка при получении информации о товаре" />
        ) : (
          <Refund
            data={descriptionData || {}}
            loading={false}
            success="success"
            onClose={reset}
            onClick="
                activeConfirmID = $event.id
                confirm($event)
              "
          />
        )
      }
      descriptionState="descriptionState"
      onDescription={description}
    />
  )
}
