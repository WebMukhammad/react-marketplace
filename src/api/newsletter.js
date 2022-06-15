import api from '.'

export function send(fields) {
  return api.post('https://05.ru/api/v1/external/email/send', fields)
}
