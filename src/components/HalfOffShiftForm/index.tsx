import { useCallback, useRef, useState } from 'react'
import { MyScheduleData } from '../../interface/schedule'
import * as S from './style'
import DropDown from '../common/dropdown'
import 'swiper/swiper-bundle.min.css'
import SwiperList from '../common/SwiperList'

function HalfOffShiftForm(scheduleData: { scheduleData: MyScheduleData[] | undefined }) {
  const [isRequestList, setIsRequestList] = useState(true) // 승인 목록
  const [isCompletedList, setIsCompletedList] = useState(false) // 거절 목록

  const items = ['연차', '반차'] // 드롭다운 아이템
  const [selectedItem, setSelectedItem] = useState(items[0]) // 드롭다운 아이템 상태

  //  완료된 목록이 활성화되면 data에서 status가 APPROVED인 것만 보여준다.
  function listHandleButtonClick(buttonType: 'request' | 'completed') {
    if (buttonType === 'request' && isRequestList) return
    if (buttonType === 'completed' && isCompletedList) return

    setIsRequestList(buttonType === 'request')
    setIsCompletedList(buttonType === 'completed')
  }

  // 연차, 반차, 당직 리스트 필터링
  const filterScheduleByProperty = useCallback(
    (scheduleList: MyScheduleData[] | undefined, propName: 'type' | 'status', propValues: string[]) => {
      return Array.isArray(scheduleList)
        ? scheduleList.filter((schedule: MyScheduleData) => {
            return propValues.includes(schedule[propName])
          })
        : []
    },
    [],
  )

  // 연차 내역 리스트
  const HalfOffSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['HALFOFF'])

  // 반차 내역 리스트
  const DayOffSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['DAYOFF'])

  //  연차  신청중 목록 리스트
  const RequestHalfOffList = filterScheduleByProperty(HalfOffSchedule, 'status', ['FIRST', 'LAST'])

  //  반차  신청중 목록 리스트
  const RequestDayOffList = filterScheduleByProperty(DayOffSchedule, 'status', ['FIRST', 'LAST'])

  //  연차  완료된 목록 리스트
  const CompletedHalfOffList = filterScheduleByProperty(HalfOffSchedule, 'status', ['APPROVED', 'REJECTED'])

  //  반차  완료된 목록 리스트
  const CompletedDayOffList = filterScheduleByProperty(DayOffSchedule, 'status', ['APPROVED', 'REJECTED'])

  // 당직 내역 리스트
  const ShiftSchedule = filterScheduleByProperty(scheduleData.scheduleData, 'type', ['SHIFT'])

  // 당직 신청중 목록 리스트
  const RequestShiftList = filterScheduleByProperty(ShiftSchedule, 'status', ['FIRST', 'LAST'])

  // 당직 완료된 목록 리스트
  const CompletedShiftList = filterScheduleByProperty(ShiftSchedule, 'status', ['APPROVED', 'REJECTED'])

  // 조건부 연차, 반차, 당직 신청중, 완료된 목록 리스트
  const halfOffData = isRequestList
    ? selectedItem === '연차'
      ? RequestHalfOffList
      : RequestDayOffList
    : selectedItem === '연차'
    ? CompletedHalfOffList
    : CompletedDayOffList

  // 조건부 당직 신청중, 완료된 목록 리스트
  const dayOffData = isRequestList ? RequestShiftList : CompletedShiftList

  return (
    <>
      <S.DayOffList>
        <S.TopWrapper>
          <DropDown
            list={items}
            width={'70px'}
            fontSize={'20px'}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <S.ButtonWrapper>
            <S.RequestingButton isButtonStatus={isRequestList} onClick={() => listHandleButtonClick('request')}>
              신청중 목록
            </S.RequestingButton>
            <S.Completionbutton isButtonStatus={isCompletedList} onClick={() => listHandleButtonClick('completed')}>
              완료된 목록
            </S.Completionbutton>
          </S.ButtonWrapper>
        </S.TopWrapper>
        <S.BottomWrapper>
          <SwiperList seletedData={halfOffData}></SwiperList>
        </S.BottomWrapper>
      </S.DayOffList>
      <S.NightSheetList>
        <S.TopWrapper>
          <S.Title>당직</S.Title>
        </S.TopWrapper>
        <S.BottomWrapper>
          <SwiperList seletedData={dayOffData}></SwiperList>
        </S.BottomWrapper>
      </S.NightSheetList>
    </>
  )
}

export default HalfOffShiftForm
