import './styles.css'
import * as S from './style'
import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar'
import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@toast-ui/react-calendar'
import { AiFillInfoCircle } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { getMainSchedule } from '../../apis/services/Schedule'
import { CalendarProps } from '../../interface/main'
import DropDown from '../../components/common/dropdown'
import ExcelDownload from './ExcelDownload'

export default function HomePage() {
  // home api
  const [returnData, setReturnData] = useState<CalendarProps[]>([])
  const { data, isLoading, error } = useQuery(['user'], () =>
    getMainSchedule().then((a) => {
      return a.data.scheduleList
    }),
  )
  // calendar data filter
  const [filterData, setFilterData] = useState<CalendarProps[]>([])
  // info
  const [isInfo, setIsInfo] = useState(false)
  // dropdown
  const [selectItem, setSelectItem] = useState('전체')
  const [selectItem2, setSelectItem2] = useState('전체팀')

  // calendar library
  // ref
  const calendarRef = useRef<typeof Calendar>(null)
  // month
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  // theme
  const [option, setOption] = useState([
    {
      id: '0',
      name: '디자인팀',
      backgroundColor: '#664f88',
      borderColor: '#664f88',
      dragBackgroundColor: '#664f88',
    },
    {
      id: '1',
      name: '개발팀',
      backgroundColor: '#3b7794',
      borderColor: '#3b7794',
      dragBackgroundColor: '#3b7794',
    },
    {
      id: '2',
      name: '디자인팀',
      backgroundColor: '#abca45',
      borderColor: '#abca45',
      dragBackgroundColor: '#abca45',
      color: '#000',
    },
  ])
  const initialCalendars: Options['calendars'] = option
  // data
  const initialEvents: Partial<EventObject>[] = returnData
  // yaer, month
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
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}년 ${month}월`
        break
      }
      default:
        dateRangeText = `${year}-${month}-${date}`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCalInstance])
  useEffect(() => {
    updateRenderRangeText()
  }, [updateRenderRangeText])
  // month move navibar
  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '')
      getCalInstance()[actionName]()
      updateRenderRangeText()
    }
  }

  // 받아온 데이터를 library 형식에 맞게 변환
  // 나의 팀과 내정보
  useEffect(() => {
    if (!isLoading) {
      setReturnData([])
      setFilterData([])
      setSelectItem2('전체팀')
      if (selectItem === '전체') {
        data.filter((list) => {
          setFilterData((filterData) => filterData.concat(list))
          return true
        })
      } else if (selectItem === '당직') {
        data.filter((list) => {
          if (list.user.teamName === '개발팀') {
            setFilterData((filterData) => filterData.concat(list))
          }
          return true
        })
      } else if (selectItem === '연차') {
        data.filter((list) => {
          if (list.user.userId === 0) {
            setFilterData((filterData) => filterData.concat(list))
          }
          return true
        })
      } else {
        data.filter((list) => {
          if (list.type === 'HALFOFF') {
            setFilterData((filterData) => filterData.concat(list))
          }
          return true
        })
      }
    }
  }, [data, selectItem])
  // 연차, 반차, 당직
  useEffect(() => {
    if (!isLoading) {
      setReturnData([])
      setFilterData([])
      setSelectItem('전체')
      if (selectItem2 === '전체팀') {
        data.filter((list) => {
          setFilterData((filterData) => filterData.concat(list))
          return true
        })
      } else if (selectItem2 === '나의팀') {
        data.filter((list) => {
          if (list.type === 'SHIFT') {
            setFilterData((filterData) => filterData.concat(list))
          }
          return true
        })
      } else {
        data.filter((list) => {
          if (list.type === 'HALFOFF') {
            setFilterData((filterData) => filterData.concat(list))
          }
          return true
        })
      }
    }
  }, [data, selectItem2])

  useEffect(() => {
    filterData.filter((list) => {
      const type = (type: string) => {
        switch (type) {
          case 'DAYOFF':
            return { calendarId: '2', isAllday: true, category: 'allday', isReadOnly: true }
          case 'HALFOFF':
            return { calendarId: '1', isAllday: false, category: 'milestone', isReadOnly: true }
          case 'SHIFT':
            return { calendarId: '0', isAllday: false, category: 'time', isReadOnly: true }
          default:
            return { calendarId: '', isAllday: false, category: '', isReadOnly: true }
        }
      }

      const { calendarId, isAllday, category, isReadOnly } = type(list.type)

      setReturnData((returnData) => [
        ...returnData,
        {
          calendarId: calendarId,
          isAllday: isAllday,
          category: category,
          isReadOnly: isReadOnly,
          id: list.user.userId,
          title: list.user.name,
          body: list.reason,
          start: list.startDate.split('T')[0],
          end: list.endDate.split('T')[0],
          attendees: [`${list.user.email}`],
          state: list.user.profileImage,
        },
      ])
      return true
    })
  }, [filterData])

  return (
    <S.HomeWrapper>
      <S.TopBar>
        <h2 className="render-range">{selectedDateRangeText}</h2>
        <button
          className="info"
          onClick={() => {
            setIsInfo((isInfo) => !isInfo)
          }}
        >
          <AiFillInfoCircle size={'20px'} color="#383838" />
        </button>
        {isInfo ? (
          <S.Info>
            <div className="info-dayoff">
              <img src="/public/noprofile.png" width={'10px'} />
              연차
            </div>
            <div className="info-halfoff">
              <img src="/public/noprofile.png" width={'10px'} />
              반차
            </div>
            <div className="info-shift">
              <img src="/public/noprofile.png" width={'10px'} />
              당직
            </div>
          </S.Info>
        ) : (
          <></>
        )}
        <DropDown
          list={['전체', '당직', '연차', '반차']}
          width="50px"
          fontSize="14px"
          selectedItem={selectItem}
          setSelectedItem={setSelectItem}
        />
        <DropDown
          list={['전체', '나의팀', '내정보']}
          width="60px"
          fontSize="14px"
          selectedItem={selectItem2}
          setSelectedItem={setSelectItem2}
        />
        <ExcelDownload data={returnData} />
        <span>
          <button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day move-day-prev"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            &lt;
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day move-day-next"
            data-action="move-next"
            onClick={onClickNavi}
          >
            &#62;
          </button>
        </span>
      </S.TopBar>
      <S.calendarWrapper>
        <Calendar
          height="600px"
          calendars={initialCalendars}
          month={{
            // startDayOfWeek: 1,
            dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            // narrowWeekend: true,
            // visibleWeeksCount: 5,
            visibleEventCount: 5,
          }}
          events={initialEvents}
          template={{
            // 반차
            time(event) {
              const { start, end, title, state } = event
              return `<span style="color: black;"><img src=${state} width="13px"/> ${title}</span>`
            },
            // 연차
            allday(event) {
              const { start, end, title, state } = event
              return `<span style="color: white;"><img src=${state} width="13px"/> ${title}</span>`
            },
            // 당직
            milestone(event) {
              const { start, end, title, state } = event
              return `<div style="color: black;"><img src=${state} width="13px"/> ${title}</div>`
            },
            // 상세 팝업
            popupDetailTitle(event) {
              const { start, end, title, state } = event
              return `<img src=${state} width="13px"/> ${title}`
            },
          }}
          theme={S.theme}
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
          view={'month'}
          // @ts-ignore
          ref={calendarRef}
        />
      </S.calendarWrapper>
    </S.HomeWrapper>
  )
}
