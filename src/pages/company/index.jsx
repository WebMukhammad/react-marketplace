import React, { useState, useMemo } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import useRequest from 'src/hooks/useRequest'
import Button from 'src/ui/components/Button'
import Form from 'src/ui/components/Form'
import FormElement from 'src/ui/components/FormElement'
import InputText from 'src/ui/components/InputText'
import Note from 'src/ui/components/Note'
import StatusBlock from 'src/ui/components/StatusBlock'
import FileInput from 'src/ui/components/FileInput'
import Checkbox from 'src/ui/components/Checkbox'
import Notice from 'src/components/info/Notice'
import { get } from 'src/api/company'
import classNames from 'classnames'

export default function CompanyPage() {
  const [initialData, loading, error] = useRequest(get)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState(false)
  const isSeller = useSelector((state) => state.user?.status?.name === 'activated')

  const [data, setData] = useState({
    name: '',
    contact: '',
    website: '',
    address: '',
    max_order_time: '',
    delivery_address: '',
    exceptions: '',
    contact_person: '',
    legal: {
      form: '',
      address: '',
      director: '',
      inn: '',
      bik: '',
      kpp: '',
      ogrn: '',
      ogrnip: '',
      taxation_system: '',
      payment_account: ''
    },
    status: {
      title: '',
      name: ''
    },
    documents: {
      passport: {
        name: 'passport',
        links: []
      },
      inn: {
        name: 'inn',
        links: []
      },
      ogrnip: {
        name: 'ogrnip',
        links: []
      },
      ucn: {
        name: 'ucn',
        links: []
      },
      uctav: {
        name: 'uctav',
        links: []
      },
      rpng: {
        name: 'rpng',
        links: []
      }
    },
    worktimes: []
  })

  const juridical = useMemo(
    () => ['АО', 'ООО', 'ПАО', 'ПК', 'УП', 'ФБГНУ', 'НКО', 'ЗАО', 'ОАО', 'НАО', 'АНО'].some((val) => val === data.legal?.form) || true,
    []
  )

  function getFileStatus(arr) {
    return arr?.length > 0 ? 'success' : 'initial'
  }

  return (
    <div className="company">
      {loading ? (
        <StatusBlock margin="auto" size="l" type="loading" />
      ) : error ? (
        <StatusBlock
          size="l"
          margin="auto"
          type="error"
          contentWidth="300px"
          description={
            <>
              <p className="p">Попробуйте обновить страницу, или воспользоваться страницей позднее</p>
              <Button className="mt-10 mx-auto" size="39" theme="white" click="reload">
                Обновить страницу
              </Button>
            </>
          }
        />
      ) : (
        <div className="company__content">
          <Form widthTitle="180" type="horizontal" submit="onSubmit(send)">
            <div className="company__block">
              {data.status.title && <div className="company__status company__status_grey">{data.status.title}</div>}
              <h1 className="company__title h1 mb-20">Сведения о магазине</h1>
              <p className="p">
                Чтобы начать продавать, нужно заполнить информацию о компании, чтобы мы могли прозрачно проводить все расчеты. После
                подтверждения данных вы получите статус «Активен» и сможете продавать товары в нашем магазине.
              </p>
              {data.exceptions && (
                <Note
                  className="mt-21"
                  theme="reddish"
                  description={
                    <div className="company__note-wrap">
                      <h3 className="h3">Ошибки в данных о компании</h3>
                      <p className="p mt-6">{data.exceptions}</p>
                    </div>
                  }
                />
              )}
              <h2 className="company__block-title h2 mt-40 mb-24">Общие сведения</h2>
              <FormElement title="Название магазина:" required>
                <InputText value={data.name} />
              </FormElement>
              <FormElement title="Сайт компании">
                <InputText value={data.website} />
              </FormElement>
              <FormElement title="ФИО контактного лица:" required>
                <InputText value={data.contact_person} />
              </FormElement>
              <FormElement title="Контактный телефон:" required>
                <InputText value={data.contact} v-mask="'+7 (###) ###-##-##'" placeholder="+7 (XXX) XXX-XX-XX" />
              </FormElement>
              <FormElement title="Адрес склада:" required>
                <InputText value={data.delivery_address} />
              </FormElement>
              <FormElement title="График работы склада:">
                <div className="company__row">
                  {data.worktimes.map((el, index) => (
                    <div key={index} className={classNames(['company__col', { company__col_full: index === 4 }])}>
                      <InputText value="el.time" placeholder="00:00 - 00:00" prefix={el.prefix} />
                    </div>
                  ))}
                </div>
              </FormElement>
              <FormElement title="ФИО руководителя:" required>
                <InputText value={data.legal.director} />
              </FormElement>
              <FormElement title="Юридический адрес:" required>
                <InputText value={data.legal.address} />
              </FormElement>
              <FormElement title="Почтовый адрес (если отличается от юр. адреса):">
                <InputText value={data.address} />
              </FormElement>
              <FormElement title="Максимальный срок сборки заказа в часах:" required>
                <InputText value={data.max_order_time} />
              </FormElement>
              <h2 className="h2 mt-26 mb-24">Юридическая информация</h2>
              <FormElement title="Форма собственности:" required>
                {/* <Select v-model="data.legal.form" search data="exceptions" /> */}
              </FormElement>

              {data.legal.form === 'ИП' ? (
                <div>
                  <h3 className="h3 mt-13 mb-18">Документы</h3>
                  <FormElement title="ОГРНИП:" required>
                    <FileInput
                      value={data.documents.ogrnip.links}
                      multiple
                      accept="application/pdf,image/*"
                      name="ogrnip"
                      status={getFileStatus(data.documents.ogrnip.links)}
                      upload-to="sendDocuments"
                      afterUpload="data.documents.ogrnip.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Свидетельство ИНН:" required>
                    <FileInput
                      value={data.documents.inn.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.inn.links)}
                      name="inn"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.inn.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Копия паспорта:" required>
                    <FileInput
                      value={data.documents.passport.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.passport.links)}
                      name="passport"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.passport.links = $event.links"
                    />
                  </FormElement>
                </div>
              ) : data.legal.form === 'Самозанятый' ? (
                <div>
                  <h3 className="h3 mt-13 mb-18">Документы</h3>
                  <FormElement title="Свидетельство ИНН:" required>
                    <FileInput
                      value={data.documents.inn.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.inn.links)}
                      name="inn"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.inn.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Копия паспорта:" required>
                    <FileInput
                      value={data.documents.passport.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.passport.links)}
                      name="passport"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.passport.links = $event.links"
                    />
                  </FormElement>
                </div>
              ) : juridical ? (
                <div>
                  <h3 className="h3 mt-13 mb-18">Документы</h3>
                  <FormElement title="ОГРНИП:" required>
                    <FileInput
                      value={data.documents.ogrnip.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.ogrnip.links)}
                      name="ogrnip"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.ogrnip.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Свидетельство ИНН:" required>
                    <FileInput
                      value={data.documents.inn.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.inn.links)}
                      name="inn"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.inn.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Устав:" required>
                    <FileInput
                      value={data.documents.uctav.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.uctav.links)}
                      name="uctav"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.uctav.links = $event.links"
                    />
                  </FormElement>
                  <FormElement title="Решение/Протокол о назначении гендиректора:" required>
                    <FileInput
                      value={data.documents.rpng.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.rpng.links)}
                      name="rpng"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.rpng.links = $event.links"
                    />
                  </FormElement>
                </div>
              ) : null}

              <template v-if="data.legal.form !== 'Самозанятый'">
                <h3 className="h3 mt-13 mb-18">Налогообложение</h3>
                <FormElement title="Система налогообложения:" required>
                  {/* <Select v-model="data.legal.taxation_system" data="taxation_system" /> */}
                </FormElement>
                <template v-if="data.legal.taxation_system === 'УСН'">
                  <FormElement title="Подтверждение права работать по УСН:" required>
                    <FileInput
                      value={data.documents.ucn.links}
                      multiple
                      accept="application/pdf,image/*"
                      status={getFileStatus(data.documents.ucn.links)}
                      name="ucn"
                      upload-to="sendDocuments"
                      afterUpload="data.documents.ucn.links = $event.links"
                    />
                  </FormElement>
                </template>
              </template>
              <template v-if="data.legal.form === 'ИП'">
                <h3 className="h3 mt-13 mb-18">Платежные реквизиты</h3>
                <FormElement title="ИНН:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.inn} type="number" />
                  </div>
                </FormElement>
                <FormElement title="ОГРНИП:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.ogrnip} type="number" />
                  </div>
                </FormElement>
                <FormElement title="Расчетный счет:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.payment_account} type="number" />
                  </div>
                </FormElement>
                <FormElement title="БИК банка:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.bik} type="number" />
                  </div>
                </FormElement>
              </template>
              <template v-else-if="data.legal.form === 'Самозанятый'">
                <h3 className="h3 mt-13 mb-18">Платежные реквизиты</h3>
                <FormElement title="ИНН:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.inn} type="number" />
                  </div>
                </FormElement>
              </template>
              <template v-else-if="juridical">
                <h3 className="h3 mt-13 mb-18">Платежные реквизиты</h3>
                <FormElement title="ИНН компании:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.inn} type="number" />
                  </div>
                </FormElement>
                <FormElement title="КПП компании:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.kpp} type="number" />
                  </div>
                </FormElement>
                <FormElement title="ОГРН компании:" required>
                  <InputText value={data.legal.ogrn} type="number" />
                </FormElement>
                <FormElement title="Расчетный счет компании:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.payment_account} type="number" />
                  </div>
                </FormElement>
                <FormElement title="БИК банка:" required>
                  <div className="company__form-row_w-350">
                    <InputText value={data.legal.bik} type="number" />
                  </div>
                </FormElement>
              </template>
            </div>
            <div className="company__checkbox-wrap">
              <div className="company__checkbox">
                <Checkbox v-model="checkboxData" className="mr-6" value="true" />
                <div className="mt-1">
                  Я принимаю
                  <a
                    href="https://docs.google.com/document/d/1Ij96hEV0Td61abi6zQOzqNCSQYqXxPf5clW3oZ3RCuE/edit"
                    target="_blank"
                    className="link link_blue link_wu"
                  >
                    {' '}
                    оферту на оказание услуг
                  </a>
                </div>
              </div>
              <div className="company__checkbox-error">Согласитесь на оферту оказания услуг</div>
            </div>
            {isSeller ? (
              <Notice className="mt-40 mb-3" type="attention">
                <h4 className="h4 mb-7">
                  Внимание! Если вы измените информацию о компании, продажа всех ваших товаров будет временно приостановлена до завершения
                  проверки изменений нашей юридической службой
                </h4>
                <p className="p">Это связано с тем, что нам нужно актуализировать сведения о вашей компании</p>
              </Notice>
            ) : sendSuccess ? (
              <Notice className="mt-40" type="info">
                <h4 className="h4 mb-7">Что будет после</h4>
                <p className="p">
                  Модератор проверит данные о компании и составит договор по которому будут осуществляться выплаты. Если вы пройдете
                  проверку, сможете легко продавать товары прямо на нашем сайте и все товары в вашем личном кабинете сразу же отправятся на
                  проверку перед публикацией на сайте. Мы вышлем вам уведомление об изменении статуса на почту.
                </p>
              </Notice>
            ) : null}

            {sendError && (
              <Note className="mt-20 p">
                {typeof sendError === 'object' ? (
                  <ul className="dash-list">
                    {Object.values(sendError).map((el, index) => (
                      <li key={index} className="dash-list__item">
                        {el}
                      </li>
                    ))}
                  </ul>
                ) : (
                  sendError
                )}
              </Note>
            )}
            <div className="company__total">
              {sendSuccess ? (
                <Button size="49" theme="submited" icon="tick" disabled>
                  Данные сохранены
                </Button>
              ) : (
                <Button size="49" theme="red" disabled={isDisabledButton}>
                  Сохранить данные
                </Button>
              )}
              <div v-if="invalid" className="company__total-text">
                Заполните
                <span className="span red-text"> все обязательные поля </span>
              </div>

              {sendSuccess && (
                <h5 className="h5 pl-20">
                  <Link to="/product" className="link link_blue link_wu">
                    К списку товаров »
                  </Link>
                </h5>
              )}
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}
