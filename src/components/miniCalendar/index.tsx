import '@toast-ui/calendar/toastui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.min.css'
import 'tui-time-picker/dist/tui-time-picker.min.css'

import './style.css'
import Calendar from '@toast-ui/react-calendar'
import { theme } from './theme'

import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar'
import { TZDate } from '@toast-ui/calendar'
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

type ViewType = 'month'

interface miniCalendarProps {
  view: ViewType
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  setReason: Dispatch<SetStateAction<string>>
  // setShiftInputAll: Dispatch<SetStateAction<string>>
}
const today = new TZDate()

function MiniCalendar({ view, setStartDate, setEndDate, setReason }: miniCalendarProps) {
  const calendarRef = useRef<typeof Calendar>(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState<string>('')
  const [selectedView, setSelectedView] = useState(view)
  const initialCalendars: Options['calendars'] = [
    {
      id: '0',
      name: '연차',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: '반차',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff',
    },
  ]
  const initialEvents: Partial<EventObject>[] = []

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), [])

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
    }

    const viewName = calInstance.getViewName()
    const calDate = calInstance.getDate()

    let year = calDate.getFullYear()
    let month = calDate.getMonth() + 1
    let date = calDate.getDate()
    let hour = calDate.getDate()
    let minute = calDate.getDate()
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}.${month}.${date}`
        break
      }
      default:
        dateRangeText = `${year}.${month}.${date}.${hour}.${minute}`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCalInstance])

  useEffect(() => {
    setSelectedView(view)
  }, [view])

  useEffect(() => {
    updateRenderRangeText()
  }, [selectedView, updateRenderRangeText])

  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
    console.group('onAfterRenderEvent')
    console.log('Event Info : ', res.title)

    setStartDate(res.start.d)
    setEndDate(res.end.d)
    setReason(res.title)

    console.groupEnd()
  }

  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
    console.group('onBeforeDeleteEvent', res)
    console.log('Event Info : ', res.title)
    console.groupEnd()

    const { id, calendarId } = res

    getCalInstance().deleteEvent(id, calendarId)
  }

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName')
    console.log('Date : ', res.date)
    console.groupEnd()
  }

  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '')
      getCalInstance()[actionName]()
      updateRenderRangeText()
    }
  }

  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
    console.group('onClickEvent')
    console.log('MouseEvent : ', res.nativeEvent)
    console.log('Event Info : ', res.event)
    console.groupEnd()
  }

  const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] = (timezoneCollapsed) => {
    console.group('onClickTimezonesCollapseBtn')
    console.log('Is Timezone Collapsed?: ', timezoneCollapsed)
    console.groupEnd()

    const newTheme = {
      'week.daygridLeft.width': '100px',
      'week.timegridLeft.width': '100px',
    }

    getCalInstance().setTheme(newTheme)
  }

  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
    console.group('onBeforeUpdateEvent')
    console.log(updateData)
    console.groupEnd()

    const targetEvent = updateData.event
    const changes = { ...updateData.changes }

    getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes)
  }

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
    }

    getCalInstance().createEvents([event])
  }

  return (
    <div className="miniCalendarContainer">
      <div className="miniCalendarNav">
        <span className="render-range">{selectedDateRangeText}</span>
        <span className="arrowButtonWrapper">
          <button type="button" className="btn todayButton" data-action="move-today" onClick={onClickNavi}>
            Today
          </button>
          <button type="button" className="btn arrowButton prevButton" data-action="move-prev" onClick={onClickNavi}>
            ⟨
          </button>
          <button type="button" className="btn arrowButton nextButton" data-action="move-next" onClick={onClickNavi}>
            ⟩
          </button>
        </span>
      </div>
      <Calendar
        height="900px"
        calendars={initialCalendars}
        month={{ startDayOfWeek: 1, dayNames: ['일', '월', '화', '수', '목', '금', '토'] }}
        events={initialEvents}
        theme={theme}
        timezone={{
          zones: [
            {
              timezoneName: 'Asia/Seoul',
              displayLabel: 'Seoul',
              tooltip: 'UTC+09:00',
            },
          ],
        }}
        useDetailPopup={true}
        useFormPopup={true}
        view={selectedView}
        week={{
          eventView: true,
          taskView: true,
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={calendarRef}
        onAfterRenderEvent={onAfterRenderEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        onClickDayname={onClickDayName}
        onClickEvent={onClickEvent}
        onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </div>
  )
}

export default MiniCalendar
