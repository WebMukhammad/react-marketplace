import React, { useState } from 'react'
import './style.scss'
import AuthBlock from 'src/components/AuthBlock/index'
import Form from 'src/ui/components/Form'
import FormElement from 'src/ui/components/FormElement'
import InputText from 'src/ui/components/InputText'
import Button from 'src/ui/components/Button'
import Note from 'src/ui/components/Note'
import { Link } from 'react-router-dom'
import { register, resendRegister } from 'src/api/auth'

export default function SignInPage() {
  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [userID, setUserID] = useState(null)
  const [successResend, setSuccessResend] = useState(false)

  async function onSubmit() {
    try {
      setError(null)
      const { userID } = await register(data)
      setSuccess(true)
      setUserID(userID)
    } catch (e) {
      setError(e?.response?.data?.errors || e?.response?.data?.error)
    }
  }

  async function resendRegisterSend() {
    try {
      await resendRegister({ userID })
      setSuccessResend(true)
    } catch (e) {
      setError(e?.response?.data?.errors || e?.response?.data?.error)
    }
  }

  return (
    <AuthBlock
      title={success ? null : 'Регистрация'}
      bottom={
        <div>
          <span>Есть аккаунт? </span>
          <Link className="link link_blue link_wu" to="/auth/sign-in/">
            Войдите
          </Link>
        </div>
      }
    >
      {success ? (
        <div className="marketplace-auth__block-mail" data-e2e="success-registration">
          <div className="marketplace-auth__block-mail-bg"></div>
          <div className="marketplace-auth__block-row">
            <h3 className="marketplace-auth__block-title h3">Проверьте почту</h3>
            <p className="p">Перейдите по ссылке в письме для подтверждения почты</p>
          </div>
          <div className="marketplace-auth__block-row">
            <h5 className="h5 marketplace-auth__block-subtitle">Не получили письмо?</h5>
            <div className="marketplace-auth__block-feedback">
              {successResend ? (
                <span className="link link_green link_dashed">Письмо отправлено</span>
              ) : (
                <span className="link link_blue link_dashed" onClick={resendRegisterSend}>
                  Отправьте письмо повторно
                </span>
              )}
              <span> либо </span>
              <span className="link link_blue link_dashed">Напишите нам в чат</span>
              <span> и мы вам поможем</span>
            </div>
          </div>
          <div className="marketplace-auth__block-row">
            <div className="marketplace-auth__block-footer-text">
              Также попробуйте проверить папку «Спам» в своей почте, порой письма попадают туда
            </div>
          </div>
        </div>
      ) : (
        <Form onSubmit={onSubmit}>
          <FormElement title="Название магазина">
            <InputText value={data.name} onChange={(event) => setData((state) => ({ ...state, name: event }))} />
          </FormElement>
          <FormElement title="Телефон">
            <InputText value={data.phone} onChange={(event) => setData((state) => ({ ...state, phone: event }))} />
          </FormElement>

          <FormElement title="Почта">
            <InputText value={data.email} onChange={(event) => setData((state) => ({ ...state, email: event }))} />
          </FormElement>

          <FormElement title="Пароль">
            <InputText type="password" value={data.password} onChange={(event) => setData((state) => ({ ...state, password: event }))} />
          </FormElement>
          {error ? (
            <div className="p mb-20">
              <Note>
                {typeof error === 'object' ? (
                  <ul className="dash-list">
                    {Object.values(error).map((el, index) => (
                      <li key={index} className="dash-list__item">
                        {el}
                      </li>
                    ))}
                  </ul>
                ) : (
                  error
                )}
              </Note>
            </div>
          ) : null}

          <Button size="49"> Создать аккаунт</Button>
        </Form>
      )}
    </AuthBlock>
  )
}
