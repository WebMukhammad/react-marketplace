import api from '.'
import { getFormData } from './helper'
import UserSerializer from 'src/serializer/User'
import TokenSerializer from 'src/serializer/Token'

export async function login({ email, password }) {
  const result = await api.post(
    '/auth/login',
    getFormData({
      email,
      password,
      device_name: 'react application'
    })
  )
  return {
    token: TokenSerializer(result || {}),
    user: UserSerializer(result || {})
  }
}

export async function getUserData() {
  const result = await api.get('/auth/user')
  return UserSerializer(result || {})
}

export function changePassword({ oldPassword, password, passwordConfirmation }) {
  return api.patch(
    '/auth/login',
    getFormData({
      old_password: oldPassword,
      password,
      password_confirm: passwordConfirmation
    })
  )
}

export function sendPasswordResetEmail({ email }) {
  return api.post(
    '/auth/password/forgot',
    getFormData({
      email
    })
  )
}

export async function resetPassword({ token, password, passwordConfirmation }) {
  const result = await api.post(
    '/auth/password/reset',
    getFormData({
      token,
      password,
      password_confirmation: passwordConfirmation
    })
  )
  return {
    token: TokenSerializer(result || {}),
    user: UserSerializer(result || {})
  }
}

export async function register({ name, email, password, phone }) {
  const response = await api.post(
    '/auth/register',
    getFormData({
      name,
      email,
      phone,
      password,
      password_confirmation: password
    })
  )

  return {
    userID: response?.user_id
  }
}

export function resendRegister({ userID }) {
  return api.post(`/auth/resend-confirmation/${userID}`)
}

export async function confirm({ token }) {
  const result = await api.get(`/auth/confirm/${token}`)
  return {
    token: TokenSerializer(result || {}),
    user: UserSerializer(result || {})
  }
}
