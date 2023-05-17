export interface CalendarProps {
  id: number | string | undefined
  calendarId: string
  title: string
  body: string
  isAllday: boolean
  start: Date
  end: Date
  category: string
  isReadOnly: boolean
  attendees: string[]
  state: string
}
