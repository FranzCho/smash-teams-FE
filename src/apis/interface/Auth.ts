import { TeamName } from '../../components/historyCard/style'
import { CgPassword } from 'react-icons/cg'

export interface LoginResponseData {
  data?:
    | {
        id: number
        name: string
        email: string
        phoneNumber: string
        profileImage: string
        startWork: string
        teamName: string
        role: string
        remain: number
      }
    | undefined
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
  phoneNumber: string
  startWork: string
  teamName: string
  passwordConfirm?: string
}

export interface UserPayload {
  id: number
  email: string
  username: string
}

export interface User {
  name: string
  email: string
  password: string
  phoneNumber: string
  startWork: string
  profileImage: string
}

export interface EmailCheckRequest {
  email: string
}

export interface RegisterEnroll {
  name: string
  email: string
  password: string
  phoneNumber: string
  startWork: string
  teamName: string
}

<<<<<<< HEAD
export interface LoginResponseData {
  data?:
    | {
        id: number
        name: string
        email: string
        phoneNumber: string
        profileImage: string
        startWork: string
        teamName: string
        role: string
        remain: number
      }
    | undefined
=======
export interface Admin {
  teamName: string
  keyword: string
  page: number
>>>>>>> 1435c1b61d5ef30d98ce4c46da11e2e0b8449ec7
}
