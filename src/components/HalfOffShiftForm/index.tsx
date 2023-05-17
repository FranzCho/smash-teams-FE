import * as S from './style'
import 'swiper/swiper-bundle.min.css'
import SwiperList from '../common/SwiperList'
import ListToggleTopWrapper from '../TopWrapper'
import CompleteItem from '../common/completeItem'
import { useLocation } from 'react-router-dom'
import { MyScheduleData, ScheduleData } from '../../interface/schedule'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { LoginResponseData } from '../../apis/interface/Auth'
import { AxiosError } from 'axios'
import { getUser } from '../../apis/services/Auth'

// ScheduleData
function HalfOffShiftForm(scheduleData: { scheduleData: any }) {
  const [isRequestList, setIsRequestList] = useState(true) // 신청 목록
  const [isCompletedList, setIsCompletedList] = useState(false) // 거절 목록
  const { data: myUser, refetch } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  const isManager = useLocation().pathname.includes('manage')
  const isCeo = myUser?.data?.role === 'CEO'

  const userItems = ['연차', '반차'] // 드롭다운 아이템
  const manageItems = ['연차', '반차', '당직'] // 드롭다운 아이템
  const [selectedItem, setSelectedItem] = useState(userItems[0]) // 드롭다운 아이템 상태

  //  완료된 목록이 활성화되면 data에서 status가 APPROVED인 것만 보여준다.
  function listHandleButtonClick(buttonType: 'request' | 'completed') {
    if (buttonType === 'request' && isRequestList) return
    if (buttonType === 'completed' && isCompletedList) return

    setIsRequestList(buttonType === 'request')
    setIsCompletedList(buttonType === 'completed')
  }

  // 연차, 반차, 당직 리스트 필터링
  const filterScheduleByProperty = useCallback(
    (scheduleList: MyScheduleData[] | ScheduleData[], propName: 'type' | 'status', propValues: string[]) => {
      return Array.isArray(scheduleList)
        ? scheduleList.filter((schedule: ScheduleData) => {
            return propValues.includes(schedule[propName] as string)
          })
        : []
    },
    [],
  )

  // 연차 내역 리스트
  const HalfOffSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['DAYOFF'])

  // 반차 내역 리스트
  const DayOffSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['HALFOFF'])

  //  연차 신청중 목록 리스트
  const RequestHalfOffList = filterScheduleByProperty(HalfOffSchedule, 'status', ['FIRST'])

  //  연차 신청중 CEO 목록 리스트
  const RequestCeoHalfOffList = filterScheduleByProperty(HalfOffSchedule, 'status', ['LAST'])

  //  반차 신청중 목록 리스트
  const RequestDayOffList = filterScheduleByProperty(DayOffSchedule, 'status', ['FIRST'])

  //  반차 신청중 CEO 목록 리스트
  const RequestCeoDayOffList = filterScheduleByProperty(DayOffSchedule, 'status', ['LAST'])

  //  연차 완료된 목록 리스트
  const CompletedHalfOffList = filterScheduleByProperty(HalfOffSchedule, 'status', ['APPROVED', 'REJECTED'])

  //  반차 완료된 목록 리스트
  const CompletedDayOffList = filterScheduleByProperty(DayOffSchedule, 'status', ['APPROVED', 'REJECTED'])

  // 당직 내역 리스트
  const ShiftSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['SHIFT'])

  // 당직 신청중 목록 리스트
  const RequestShiftList = filterScheduleByProperty(ShiftSchedule, 'status', ['FIRST'])

  // 당직 신청중 CEO 목록 리스트
  const RequestCeoShiftList = filterScheduleByProperty(ShiftSchedule, 'status', ['LAST'])

  // 당직 완료된 목록 리스트
  const CompletedShiftList = filterScheduleByProperty(ShiftSchedule, 'status', ['APPROVED', 'REJECTED'])

  // 조건부 연차, 반차, 당직 신청중, 완료된 목록 리스트
  let halfOffData
  if (isCeo) {
    switch (selectedItem) {
      case '연차':
        halfOffData = isRequestList ? RequestCeoHalfOffList : CompletedHalfOffList
        break
      case '반차':
        halfOffData = isRequestList ? RequestCeoDayOffList : CompletedDayOffList
        break
      case '당직':
        halfOffData = CompletedShiftList
        break
      default:
        halfOffData = CompletedShiftList
    }
  } else {
    switch (selectedItem) {
      case '연차':
        halfOffData = isRequestList ? RequestHalfOffList : CompletedHalfOffList
        break
      case '반차':
        halfOffData = isRequestList ? RequestDayOffList : CompletedDayOffList
        break
      case '당직':
        halfOffData = CompletedShiftList
        break
      default:
        halfOffData = CompletedShiftList
    }
  }
  let dayOffData
  // 조건부 당직 신청중, 완료된 목록 리스트
  if (isCeo) {
    dayOffData = isRequestList ? RequestCeoShiftList : CompletedShiftList
  } else {
    dayOffData = isRequestList ? RequestShiftList : CompletedShiftList
  }
  return (
    <>
      <S.DayOffList>
        {isManager && isCompletedList ? (
          <ListToggleTopWrapper
            items={manageItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isRequestList={isRequestList}
            isCompletedList={isCompletedList}
            listHandleButtonClick={listHandleButtonClick}
          ></ListToggleTopWrapper>
        ) : (
          <ListToggleTopWrapper
            items={userItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isRequestList={isRequestList}
            isCompletedList={isCompletedList}
            listHandleButtonClick={listHandleButtonClick}
          ></ListToggleTopWrapper>
        )}
      </S.DayOffList>
      {isManager && isCompletedList ? (
        <S.CompleteListWrapper>
          {halfOffData && halfOffData.length > 0 ? (
            halfOffData.map((item) => {
              return <CompleteItem key={item.scheduleId} schedule={item}></CompleteItem>
            })
          ) : (
            <S.EmptyListWrapper>
              <S.EmptyImage src="/puzzle.jpg" />
              <S.EmptyText>완료된 내역이 없습니다.</S.EmptyText>
            </S.EmptyListWrapper>
          )}
        </S.CompleteListWrapper>
      ) : (
        <>
          <S.BottomWrapper>
            <SwiperList seletedData={halfOffData}></SwiperList>
          </S.BottomWrapper>
          <S.NightSheetList>
            <S.TopWrapper>
              <S.Title>당직</S.Title>
            </S.TopWrapper>
            <S.BottomWrapper>
              <SwiperList seletedData={dayOffData}></SwiperList>
            </S.BottomWrapper>
          </S.NightSheetList>
        </>
      )}
    </>
  )
}

export default HalfOffShiftForm
