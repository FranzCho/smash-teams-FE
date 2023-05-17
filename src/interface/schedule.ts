import { CalendarProps } from './main'

export interface ScheduleStatus {
  status: 'FIRST' | 'REJECTED' | 'APPROVED' | 'LAST'
}

export interface ButtonStatusProps {
  isStatus: 'FIRST' | 'REJECTED' | 'APPROVED' | 'LAST'
}

export interface ToggleButtonProps {
  isButtonStatus: 'BEFORE' | 'APPROVED' | 'REJECTED'
}

export interface ToggleButtonStatusFunc extends ToggleButtonProps {
  (status: 'BEFORE' | 'APPROVED' | 'REJECTED'): void
}

export interface HistoryButtonProps {
  isButtonStatus: boolean
}

export interface HistoryScheduleData {
  schedule: MyScheduleData
}

export interface MyScheduleData extends ScheduleData {
  data: {
    scheduleList: ScheduleData[]
  }
}

export interface CalendarData {
  scheduleId: number
  startDate: string
  endDate: string
  type: string
  status?: string
  reason: string
  user: User
}

export interface ScheduleData {
  scheduleId: number
  startDate: string
  endDate: string
  type: string
  status?: string
  reason: string
  user: User
}

export interface ScheduleProps {
  scheduleData: ScheduleData[]
}

export interface CalendarTheme {
  id: string
  name: string
  backgroundColor: string
  borderColor: string
  dragBackgroundColor: string
}

export interface User {
  userId: number | undefined
  name: string
  email: string
  phoneNumber: string
  startWork: string
  role: string
  teamName: string
  profileImage: string
}

type FormType = 'DAYOFF' | 'HALFOFF' | 'NIGHTSHIFT'
export interface ScheduleEnroll {
  type: FormType
  startDate: string
  endDate: string
  reason: string
}

export interface ScheduleEnrollResponse {
  type: FormType
  startDate: string
  endDate: string
  reason: string
}

export interface ExcelDownloadProps {
  data: CalendarProps[]
}
