import React, { useState } from 'react'
import './style.scss'
import AuthBlock from 'src/components/AuthBlock'
import Form from 'src/ui/components/Form'
import FormElement from 'src/ui/components/FormElement'
import InputText from 'src/ui/components/InputText'
import Button from 'src/ui/components/Button'
import Note from 'src/ui/components/Note'
import { sendPasswordResetEmail } from 'src/api/auth'

export default function ForgotInPage() {
  const [data, setData] = useState({ email: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit() {
    try {
      setError(null)
      await sendPasswordResetEmail(data)
      setSuccess(true)
    } catch (e) {
      setError(e?.response?.data?.errors || e?.response?.data?.error)
    }
  }

  return (
    <AuthBlock title={success ? null : 'Забыли пароль?'}>
      {success ? (
        <div className="marketplace-auth__block-mail" data-e2e="success-registration">
          <div className="marketplace-auth__block-mail-bg"></div>
          <h3 className="marketplace-auth__block-title h3 mb-9">Письмо успешно отправлено.</h3>
          <p className="p">Пожалуйста, проверьте свою электронную почту</p>
        </div>
      ) : (
        <Form type="vertical" onSubmit={onSubmit}>
          <FormElement title="Почта">
            <InputText value={data.email} onChange={(event) => setData((state) => ({ ...state, email: event }))} />
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
          <Button size="49" data-e2e="button-submit">
            Сбросить пароль
          </Button>
        </Form>
      )}
    </AuthBlock>
  )
}
