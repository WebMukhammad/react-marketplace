import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { productPage } from 'src/api/product'
import NavigationTooltip from 'src/components/NavigationTooltip'
import Status from 'src/components/Status'
import Table from 'src/components/table/index'
import TableWrap from 'src/components/table/TableWrap'
import ToggleHover from 'src/components/ToggleHover'
import Button from 'src/ui/components/Button'
import Checkbox from 'src/ui/components/Checkbox'
import InputText from 'src/ui/components/InputText'
import StatusBlock from 'src/ui/components/StatusBlock'
import TinyInput from 'src/ui/components/TinyInput'

export default function ProductPage() {
  const location = useLocation()

  const [list, setList] = React.useState([])
  const [tableError, setTableError] = React.useState({})
  const [queryTyping, setQueryTyping] = React.useState(false)
  const [params, setParams] = React.useState({
    query: new URLSearchParams(location.search).get('q') || '',
    state: new URLSearchParams(location.search).get('state') || 'all',
    sort: null,
    order: null,
    page: 1,
    cancel: true
  })

  let activeSelectedInput = null

  function onBlur({ id, data, prop, patch } = {}) {
    /**
     * Если поле пустое, то не делаем запрос
     */
    if (data[prop] !== null) {
      // patch({ id, data });
    }
    activeSelectedInput = { id, prop }
  }

  function onVisiblePropChange(state, item, patch) {
    item.active = !state
    const type = state ? 'hidden' : 'visible'
    // patch({ id: item.id, data: { state: type } });
  }

  function addTableErrorProp({ id, prop } = {}) {
    /**
     * Если при изменении поля произошла ошибка,
     * то добавляем в объект id ошибки и сам пропс
     */
    setTableError((state) => ({ ...state, [id]: { [prop]: true } }))
  }

  function removeTableErrorProp({ id, prop } = {}) {
    /**
     * Если при изменении поля произошла ошибка,
     * затем пользователь во второй раз изменил поле и всё прошло успешно,
     * то удаляем ошибку поля
     */
    if (this.tableError[id]?.[prop]) {
      const data = { ...this.tableError }
      delete data[id][prop]
      setTableError(data)
    }
  }

  function onSort(data) {
    setParams((state) => ({ ...state, ...data }))
  }

  function onChangeInputText(query) {
    setParams((state) => ({ ...state, query }))
    setQueryTyping(true)
  }
  React.useEffect(() => {
    productPage(params).then((response) => {
      setList(response.list)
      setQueryTyping(false)
    })
  }, [params])

  return (
    <TableWrap
      filter={
        <>
          <div className="table-wrap__filter">
            <InputText
              value={params.query}
              placeholder="Поиск по товарам"
              iconPosition="right"
              icon={queryTyping ? 'loading-oval' : null}
              onChange={onChangeInputText}
            />
          </div>
          {/* <div className="table-wrap__filter table-wrap__filter_w-390">
            <ActionEntity
              #default="{ get, loading }"
              :actions="{ get: $api.category.getOrFromStore }"
              @success="categories = $event.response"
            >
              <TreeSelect
                v-model="activeCategories"
                :data="categories"
                placeholder="Категории"
                name-prop-value="id"
                name-prop-disabled="property"
                :search-adapter="searchCategories"
                :is-selected-children="false"
                empty-search-text="Категории не найдены"
                search
                multiple
                :loading="loading"
                search-stick-on-scroll
                open-select-height="410px"
                disabled-checkbox-title="Выбор категории недоступен"
                @open.once="get({ include: 'children' })"
                @change="scrollTop"
              >
                <template #selectedText="{ count }"> {{ formateSelectedCategoryText(count) }} </template>
              </TreeSelect>
            </ActionEntity>
          </div> */}
          {/* <div className="table-wrap__filter table-wrap__filter_mr-auto">
            <DataEntity #default="{ loading }" :get="$api.product.getStatusList" @success="statusList = $event.response">
              <Select
                v-model="params.state"
                :data="statusList"
                :loading="loading"
                :loading-open-select="false"
                placeholder="Выберите статус товара"
                @change="changeQuery({ state: !$event || $event === 'all' ? undefined : $event }), scrollTop()"
              />
            </DataEntity>
          </div> */}
          <div className="table-wrap__popover-wrap">
            <ToggleHover className="table-wrap__popover" toggle-parent-className="product__popover_active">
              Импорт из XLS
              <div className="icon-arrow table-wrap__popover-icon" />
              <NavigationTooltip className="navigation-tooltip_product">
                <div className="navigation-tooltip__list">
                  <Link to="/product/xls/create" className="navigation-tooltip__item">
                    Импорт новых товаров
                  </Link>
                  <Link to="/product/xls/update" className="navigation-tooltip__item">
                    Обновление цен и остатков
                  </Link>
                </div>
              </NavigationTooltip>
            </ToggleHover>
          </div>
          <Link to="/product/create">
            <Button className="table-wrap__button" icon="add">
              <span className="table-wrap__button-span">Добавить товар</span>
            </Button>
          </Link>
        </>
      }
    >
      <Table
        items={list}
        cols={[
          {
            title: 'артикул',
            name: 'slug',
            minWidth: 120,
            sort: 'slug'
          },
          {
            title: 'фото',
            name: 'image',
            minWidth: 80,
            component: ({ item, data }) => (
              <div className="product__table-image-wrap">
                <img src={data.url} alt={item.name} className="product__table-image" />
              </div>
            )
          },
          {
            title: 'штрихкод',
            name: 'barcode',
            minWidth: 150
          },
          {
            title: 'наименование',
            name: 'name',
            minWidth: 430,
            sort: 'name',
            component: ({ item, data }) => (
              <>
                <Link className="link ignore-select" to={`/product/${item.id}/edit`}>
                  {data}
                </Link>
                {item.status.comment ? (
                  <p className="fz-12 lh-15 p_crop-2">
                    <span className="red-text">Ошибки:</span>
                    {item.status.comment}
                  </p>
                ) : null}
              </>
            )
          },
          {
            title: 'статус товара',
            name: 'status',
            minWidth: 120,
            component: ({ data }) => <Status data={data} />
          },
          {
            title: 'дата создания',
            name: 'date',
            minWidth: 120,
            sort: 'date'
          },
          {
            title: 'цена',
            name: 'price',
            minWidth: 90,
            sort: 'price',
            component: ({ item, data } = {}) => (
              <TinyInput
                value={data || 0}
                type="number"
                postfix="₽"
                disabled={['yml', 'yaml'].some((el) => el === item.imported)}
                error={tableError[item.id] && tableError[item.id].price}
                onInput={(e) => (item.price = +e)}
                onBlur={(e) =>
                  onBlur({
                    id: item,
                    data: { price: data },
                    prop: 'price'
                  })
                }
              />
            )
          },
          {
            title: 'комиссия',
            name: 'commission',
            minWidth: 230
          },
          {
            title: 'на складе',
            name: 'quantity',
            minWidth: 120,
            sort: 'quantity',
            component: ({ item, data } = {}) => (
              <TinyInput
                value={data || 0}
                type="number"
                postfix="шт."
                disabled={['yml', 'yaml'].some((el) => el === item.imported)}
                error={tableError[item.id] && tableError[item.id].price}
                onInput={(e) => (item.quantity = +e)}
                onBlur={() =>
                  onBlur({
                    id: item,
                    data: { price: data },
                    prop: 'price'
                  })
                }
              />
            )
          },
          {
            title: 'на складе 05.ru',
            name: 'stock_05.ru',
            minWidth: 120
          },
          {
            title: 'скрыт',
            name: 'active',
            minWidth: 80,
            component: ({ item, data }) => (
              <Checkbox
                checked={!data}
                className="product__table-checkbox ignore-select"
                disabled={['yml', 'yaml'].some((el) => el === item.imported)}
                onChange={(event) => onVisiblePropChange(item)}
              />
            )
          }
        ]}
        scrollToSelector=".layout__content"
        localSave={{ version: 1, name: 'product-list' }}
        state="initialLoad ? status : 'initial'"
        interactive
        descriptionState="descriptionState"
        onSort={onSort}
        empty={
          location.search ? (
            <StatusBlock
              type="empty"
              size="m"
              title="Товары не найдены"
              description={
                <div className="p mb-12">
                  Попробуйте сформулировать ваш <br />
                  запрос иначе
                </div>
              }
            />
          ) : (
            <>
              <div className="h4 mb-8">Нет товаров</div>
              <div className="p mb-12">Время добавить первый и начать продавать</div>
              <nuxt-link to="/product/create">
                <Button size="39" theme="white">
                  Добавить
                </Button>
              </nuxt-link>
            </>
          )
        }
        description="description($event, get)"
      />
    </TableWrap>
  )
}
