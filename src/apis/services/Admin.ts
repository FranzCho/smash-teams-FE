import { axiosInstance } from '../axios'
import { Admin } from '../interface/Auth'

export const getAdmin = async (teamName: string, keyword: string, page: number) => {
  const { data } = await axiosInstance().get(`/auth/admin?teamName=${teamName}&keyword=${keyword}&page=${page}`)
  return data
}

export const updateAdmin = async (userId: number, teamName: string, role: string) => {
  const data = { userId, teamName, role }
  const { data: responseData } = await axiosInstance().patch('/auth/admin/user', data)
  return responseData
}

export const deleteTeam = async (userId: number) => {
  const { data } = await axiosInstance().delete(`/auth/admin/team/${userId}`)
  return data
}

export const addTeam = async (teamName: string) => {
  const data = { teamName }
  const { data: responseData } = await axiosInstance().post(`/auth/admin/team`, data)
  return responseData
}
