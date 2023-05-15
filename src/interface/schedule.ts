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

export interface MyScheduleData {
  scheduleId: number
  startDate: string
  endDate: string
  type: string
  status: string
  reason: string
  user: User
}

export interface User {
  userId: number
  name: string
  email: string
  phoneNumber: string
  startWork: string
  role: string
  teamName: string
  profileImage: string
}

export interface ScheduleEnroll {
  type: string
  startDate: string
  endDate: string
  reason: string
}

export interface ScheduleEnrollResponse {
  type: string
  startDate: string
  endDate: string
  reason: string
}
