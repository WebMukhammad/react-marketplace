import React, { useState } from 'react'
import AuthBlock from 'src/components/AuthBlock'
import Form from 'src/ui/components/Form'
import FormElement from 'src/ui/components/FormElement'
import InputText from 'src/ui/components/InputText'
import { useHistory, useLocation } from 'react-router-dom'
import Button from 'src/ui/components/Button'
import Note from 'src/ui/components/Note'
import { resetPassword } from 'src/api/auth'

export default function ResetInPage() {
  const history = useHistory()
  const location = useLocation()
  const [data, setData] = useState({ email: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  async function onSubmit() {
    const code = new URLSearchParams(location.search).get('code')
    if (!code) return
    try {
      setError(null)
      setLoading(true)
      await resetPassword(data)
      setSuccess(true)

      history.push('/product')
    } catch (e) {
      setError(e?.response?.data?.errors || e?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthBlock title="Изменение пароля">
      <Form type="vertical" onSubmit={onSubmit}>
        <FormElement title="Введите новый пароль" hint-min-height="9px">
          <InputText type="password" value={data.name} onChange={(event) => setData((state) => ({ ...state, name: event }))} />
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
            Изменить пароль
          </Button>
        )}
      </Form>
    </AuthBlock>
  )
}
