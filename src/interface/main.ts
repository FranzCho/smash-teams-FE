export interface CalendarProps {
  id: string
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
