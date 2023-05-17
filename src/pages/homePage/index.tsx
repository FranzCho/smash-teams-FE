import './styles.scss'
import * as S from './style'
import type { EventObject, Options } from '@toast-ui/calendar'
import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@toast-ui/react-calendar'
import { AiFillInfoCircle } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { getMainSchedule } from '../../apis/services/Schedule'
import { CalendarProps } from '../../interface/main'
import DropDown from '../../components/common/dropdown'
import ExcelDownload from '../../utils/ExcelDownload'
import { CalendarTheme, CalendarData } from '../../interface/schedule'
import calendarTheme from '../../utils/calendarTheme'
import { getUser } from '../../apis/services/Auth'
import { LoginResponseData } from '../../apis/interface/Auth'
import { AxiosError } from 'axios'

export default function HomePage() {
  // home api
  const [returnData, setReturnData] = useState<CalendarProps[]>([])
  const [filterData, setFilterData] = useState<CalendarProps[]>([])
  const { data, isLoading, error } = useQuery<CalendarData[], AxiosError>(
    ['user'],
    () =>
      getMainSchedule().then((a) => {
        return a.data.scheduleList
      }),
    { cacheTime: 50000, staleTime: 10000 * 20 },
  )
  // info
  const [isInfo, setIsInfo] = useState(false)
  // dropdown
  const [selectItem, setSelectItem] = useState('전체')
  const [selectItem2, setSelectItem2] = useState('전체팀')

  const [teamList, setTeamList] = useState<string[]>(['common', '개발팀', '디자인팀', 'admin'])
  // calendar library
  // ref
  const calendarRef = useRef<typeof Calendar>(null)
  // month
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  // theme
  const [option, setOption] = useState<CalendarTheme[]>([
    calendarTheme(0, teamList[0]),
    calendarTheme(1, teamList[0]),
    calendarTheme(2, teamList[1]),
    calendarTheme(3, teamList[1]),
    calendarTheme(4, teamList[2]),
    calendarTheme(5, teamList[2]),
    calendarTheme(6, teamList[3]),
    calendarTheme(7, teamList[3]),
  ])

  const initialCalendars: Options['calendars'] = option
  // data
  const initialEvents: Partial<EventObject>[] = filterData
  // yaer, month
  //@ts-ignore
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
  useEffect(() => {
    if (!isLoading) {
      setReturnData(() => [])
      data?.map((list, arr, data) => {
        const type = (type: string) => {
          switch (type) {
            case 'DAYOFF':
              return {
                calendarId: (2 * teamList.indexOf(list.user.teamName)).toString(),
                isAllday: true,
                category: 'allday',
                isReadOnly: true,
              }
            case 'HALFOFF':
              return {
                calendarId: (2 * teamList.indexOf(list.user.teamName)).toString(),
                isAllday: false,
                category: 'milestone',
                isReadOnly: true,
              }
            case 'SHIFT':
              return {
                calendarId: (2 * teamList.indexOf(list.user.teamName) + 1).toString(),
                isAllday: false,
                category: 'time',
                isReadOnly: true,
              }
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
            start: new Date(list.startDate.split('T')[0]),
            end: new Date(list.endDate.split('T')[0]),
            attendees: [`${list.user.email}`],
            state: list.user.profileImage === null ? '/noprofile2.png' : list.user.profileImage,
          },
        ])
        return list
      })
    }
  }, [data])

  //filter데이터에 복사 및 teamlist 색상 설정
  useEffect(() => {
    setFilterData(returnData)
  }, [returnData])

  // 유저 데이터 가져오기
  const { data: myUser } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  // returnData를 필터링한 후 이를 setFilterData에 갈아끼기
  // 당직, 반차, 연차에 따른 필터링
  useEffect(() => {
    const filter = returnData.filter((list) => {
      setSelectItem2('전체팀')
      if (selectItem === '당직') {
        return list.category === 'time'
      } else if (selectItem === '연차') {
        return list.category === 'allday'
      } else if (selectItem === '반차') {
        return list.category === 'milestone'
      } else {
        return true
      }
    })
    setFilterData(() => filter)
  }, [selectItem])

  // 나의팀, 내정보 필터링
  useEffect(() => {
    const filter = returnData.filter((list) => {
      setSelectItem('전체')
      if (selectItem2 === '나의팀') {
        return teamList[Number(list.calendarId)] === myUser?.data?.teamName
      } else if (selectItem2 === '내정보') {
        return Number(list.id) === myUser?.data?.id
      } else {
        return true
      }
    })
    setFilterData(() => filter)
  }, [selectItem2])

  return (
    <S.HomeWrapper className="home">
      <S.TopBar>
        <h2 className="render-range">{selectedDateRangeText}</h2>
        <button
          className="info"
          onClick={() => {
            setIsInfo((isInfo) => !isInfo)
          }}
        >
          <AiFillInfoCircle size={'20px'} color="#383838" />
          {isInfo ? (
            <S.Info>
              <div className="info-dayoff">
                <img src="/noprofile.png" width={'10px'} />
                연차
              </div>
              <div className="info-halfoff">
                <img src="/noprofile.png" width={'10px'} />
                반차
              </div>
              <div className="info-shift">
                <img src="/noprofile.png" width={'10px'} />
                당직
              </div>
            </S.Info>
          ) : (
            <></>
          )}
        </button>
        <DropDown
          list={['전체', '당직', '연차', '반차']}
          width="50px"
          fontSize="14px"
          selectedItem={selectItem}
          setSelectedItem={setSelectItem}
        />
        <DropDown
          list={['전체팀', '나의팀', '내정보']}
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
