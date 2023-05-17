import { axiosInstance } from '../axios'
<<<<<<< HEAD
<<<<<<< HEAD
import { EmailCheckRequest, LoginRequest, LoginResponseData, RegisterEnroll, RegisterRequest, User, UserPayload } from '../interface/Auth'
=======
import { LoginRequest, LoginResponseData, RegisterEnroll, RegisterRequest, User, UserPayload } from '../interface/Auth'
>>>>>>> 1435c1b61d5ef30d98ce4c46da11e2e0b8449ec7
=======
import {
  EditProfileRequest,
  LoginRequest,
  LoginResponseData,
  ProfileUpdateRequest,
  RegisterEnroll,
  UserPayload,
  WithdrawalRequest,
} from '../interface/Auth'
>>>>>>> 1bd8ffa4c67455d5d1186aa5099c3d4edcf27dd2
import { setCookie } from '../../utils/cookies'
import { EmailCheckResponseData } from '../../components/registerForm'

export const login = async (user: LoginRequest) => {
  try {
    const { data, headers } = await axiosInstance().post('/login', user)
    const token = headers.authorization.split(' ')[1]
    setCookie('accessToken', token)
    return data
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  const { data } = await axiosInstance().post('/logout')
  return data
}

export const join = async (user: RegisterEnroll) => {
  try {
    const { data } = await axiosInstance().post('/join', user)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const emailCheck = async (email: string) => {
  try {
    const data = await axiosInstance().post<EmailCheckResponseData>('/join/check', {
      email,
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const withdrawal = async ({ userId, userData }: WithdrawalRequest) => {
  const { email, password } = userData
  const { data } = await axiosInstance().post(`/auth/user/${userId}/delete`, {
    email,
    password,
  })
  return data
}

export const profileUpdate = async ({ userId, profileImage }: ProfileUpdateRequest) => {
  try {
    const formData = new FormData()
    formData.append('profileImage', profileImage)
    const { data } = await axiosInstance({ multi: true }).post(`/auth/user/${userId}/image`, formData)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const editProfile = async ({ userId, userData }: EditProfileRequest) => {
  try {
    const { data } = await axiosInstance().post(`/auth/user/${userId}/upload`, userData)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const verify = async () => {
  const { data } = await axiosInstance().get<UserPayload>('/verify')
  return data
}

export const refresh = async () => {
  const { data } = await axiosInstance().get('/refresh')
  return data
}

export const getUsers = async () => {
  const { data } = await axiosInstance().get<UserPayload[]>('/users')
  return data
}

export const getUser = async () => {
  const { data } = await axiosInstance().get<LoginResponseData>('/auth/user/')
  return data
}
