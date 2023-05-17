import { orderScheduleProps } from '../../components/HistoryCard'
import { ScheduleEnroll, ScheduleEnrollResponse } from '../../interface/schedule'
import { axiosInstance } from '../axios'

export interface ScheduleEnrollRequest {
  id: number | undefined
  schedule: ScheduleEnroll
}

export const createUserSchedule = async ({ id, schedule }: ScheduleEnrollRequest) => {
  const { data } = await axiosInstance().post(`/auth/user/${id}/schedule`, schedule)
  return data
}

export const getMainSchedule = async () => {
  const { data } = await axiosInstance().get('/auth/user/main')
  return data
}

export const getUserSchedule = async (id: number | undefined) => {
  const { data } = await axiosInstance().get(`/auth/user/${id}/schedule`)
  return data
}

export const getSuperSchedule = async () => {
  const { data } = await axiosInstance().get('/auth/super/schedule')
  return data
}

export const orderSchedule = async (schedule: orderScheduleProps) => {
  const { scheduleId, status } = schedule
  const { data } = await axiosInstance().post('/auth/super/schedule', {
    scheduleId,
    status,
  })
  return data
}
