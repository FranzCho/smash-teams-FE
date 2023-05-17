import type { Options } from '@toast-ui/calendar'

export const calendarTheme: Options['theme'] = {
  common: {
    border: '1px solid #ddd',
    backgroundColor: 'white',
    holiday: { color: '#AA2727' },
    saturday: { color: '#476FD3' },
    dayName: { color: '#333' },
    today: { color: '#FFFFFF', backgroundColor: '#AA2727' },
    gridSelection: {
      backgroundColor: 'rgba(247	,204	,204, 0.3)',
      border: '1px solid #AA2727',
    },
  },
  month: {
    dayName: {
      borderLeft: 'none',
      backgroundColor: 'inherit',
    },
    holidayExceptThisMonth: { color: '#f3acac' },
    dayExceptThisMonth: { color: '#bbb' },
    weekend: { backgroundColor: '#fafafa' },
    moreView: { boxShadow: 'none' },
    moreViewTitle: { backgroundColor: '#f4f4f4' },
  },
}
