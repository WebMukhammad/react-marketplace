import React, { useState } from 'react'
import './style.scss'
import AuthBlock from 'src/components/AuthBlock'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Form from 'src/ui/components/Form'
import FormElement from 'src/ui/components/FormElement'
import InputText from 'src/ui/components/InputText'
import Button from 'src/ui/components/Button'
import Note from 'src/ui/components/Note'
import { login } from 'src/api/auth'

export default function SignInPage() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  async function onSubmit() {
    try {
      setError(null)
      setLoading(true)
      const { user, token } = await login(data)
      dispatch({ type: 'user/setData', data: user })
      dispatch({ type: 'token/setToken', data: token })
      setSuccess(true)
      history.push('/product')
    } catch (e) {
      setError(e?.response?.data?.errors || e?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthBlock
      title="Вход в личный кабинет поставщика"
      bottom={
        <div>
          <span>Нет аккаунта? </span>
          <Link className="link link_blue link_wu" to="/auth/sign-up/">
            Зарегистрируйтесь
          </Link>
        </div>
      }
    >
      <Form onSubmit={onSubmit}>
        <FormElement title="Почта">
          <InputText value={data.email} onChange={(event) => setData((state) => ({ ...state, email: event }))} />
        </FormElement>
        <FormElement
          title={
            <React.Fragment>
              Пароль
              <Link to="/auth/forgot" className="link link_black">
                Забыли пароль?
              </Link>
            </React.Fragment>
          }
        >
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
        {success ? (
          <Button theme="submited" size="49" icon="tick" disabled>
            Перенаправляем в админку
          </Button>
        ) : loading ? (
          <Button loading size="49"></Button>
        ) : (
          <Button theme="red" size="49">
            Войти
          </Button>
        )}
      </Form>
    </AuthBlock>
  )
}
