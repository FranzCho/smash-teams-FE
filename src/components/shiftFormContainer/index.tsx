import { AxiosError } from 'axios'
import React, { useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createUserSchedule } from '../../apis/services/Schedule'
import { ScheduleEnroll, ScheduleEnrollResponse } from '../../interface/schedule'

import * as S from './style'
import Swal from 'sweetalert2'
import { theme } from '../../styles/Theme'
import { useLocation } from 'react-router-dom'

type FormType = 'DAYOFF' | 'HALFOFF' | 'NIGHTSHIFT'
const FORM_TYPES = {
  DAY_OFF: 'DAYOFF',
  HALF_OFF: 'HALFOFF',
  NIGHT_SHIFT: 'NIGHTSHIFT',
} as const

export interface ShiftFormContainerProps {
  children: ReactNode
  location: string
  type: string
  startDate: string
  endDate: string
  reason: string
}

function ShiftFormContainer({ type, location, startDate, endDate, reason }: ShiftFormContainerProps) {
  const [formType, setFormType] = useState<FormType>(FORM_TYPES.DAY_OFF)
  const handleTitleChange = location === '/dayoff' ? (formType === 'DAYOFF' ? '연차' : '반차') : '당직'
  const handleStartInputChange =
    location === '/dayoff' ? (formType === 'DAYOFF' ? '시작 날짜' : '반차 시작') : '근무 시작'
  const handleEndInputChange =
    location === '/dayoff' ? (formType === 'DAYOFF' ? '종료 날짜' : '반차 종료') : '근무 종료'

  const handleDayOffButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const typeDayOff = setFormType(FORM_TYPES.DAY_OFF)
    console.log('연차버튼 클릭!', typeDayOff)
  }

  const handleHalfOffButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const typeHalfOff = setFormType(FORM_TYPES.HALF_OFF)
    console.log('반차버튼 클릭!', typeHalfOff)
  }

  function formatDate(dateString: string | number): string {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}.${month}.${day}`
  }
  const formatStartDate = formatDate(startDate) as string
  const formatEndDate = formatDate(endDate) as string

  const data = {
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  }

  const queryClient = useQueryClient()

  const { mutate, isError, isLoading } = useMutation<ScheduleEnrollResponse, AxiosError, ScheduleEnroll>(
    () =>
      createUserSchedule({
        schedule: { type, startDate: isSDate, endDate: isEDate, reason },
        id: 5,
      }),
    {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error: AxiosError) => {
        console.log(error)
      },
    },
  )
  // const { d } = startDate
  // console.log(d)
  let isSDate
  let isEDate

  if (startDate && endDate) {
    const SDate = new Date(startDate?.d)
    const EDate = new Date(endDate?.d)
    isSDate = SDate.toISOString().slice(0, 19)
    isEDate = EDate.toISOString().slice(0, 19)
    console.log('isSDate>>>>>', isSDate)
    console.log('isEDate>>>>>', isEDate)
  }

  function handleConfirmButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    Swal.fire({
      title: `${handleTitleChange} 신청하시겠어요?`,
      text: '신청 후 취소하실 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.colors.blue,
      confirmButtonText: '네, 신청할게요!',
      cancelButtonColor: theme.colors.redReject,
      cancelButtonText: '취소할게요!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '신청!',
          text: `신청이 완료되었어요! 내역보기에서 확인해보세요 :)`,
          icon: 'success',
          confirmButtonColor: theme.colors.blue,
          confirmButtonText: '내역보기 페이지 바로가기',
        }).then(() => {
          mutate()
        })
      }
    })
  }

  return (
    <S.RedContainerWrapper>
      {location === '/dayoff' ? (
        <S.DayOffCountContainer>
          <p>남은 연차 날짜</p>
          {/* <p>`Day-${'dayOffCount'}`</p> */}
          <p>Day-17.5</p>
        </S.DayOffCountContainer>
      ) : null}
      <S.ShiftTitle>{handleTitleChange}</S.ShiftTitle>
      {location === '/dayoff' ? (
        <S.InputWrapper>
          <S.Label htmlFor="startDate halfDate">{handleStartInputChange}</S.Label>
          <S.DateInput
            className="startDate halfDate"
            id="startDate"
            type="text"
            name="startDate"
            value={formatStartDate}
          />
        </S.InputWrapper>
      ) : (
        <S.InputWrapper>
          <S.Label htmlFor="startDate halfDate">{handleStartInputChange}</S.Label>
          <S.DateInput id="endDate" type="text" name="endDate" value={formatEndDate} />
        </S.InputWrapper>
      )}
      {location === '/dayoff' ? (
        <S.InputWrapper>
          <S.Label htmlFor="endDate halfOffTime">{handleEndInputChange}</S.Label>
          {formType === 'DAYOFF' ? (
            <S.DateInput id="endDate" type="text" name="endDate" value={formatEndDate} />
          ) : (
            <S.TimeInput id="endDate" type="text" name="endDate" value={formatEndDate} />
          )}
        </S.InputWrapper>
      ) : (
        <S.InputWrapper>
          <S.Label htmlFor="startDate halfDate">{handleEndInputChange}</S.Label>
          <S.DateInput id="endDate" type="text" name="endDate" value={formatEndDate} />
        </S.InputWrapper>
      )}
      <S.InputWrapper>
        <S.Label htmlFor="reason">사유</S.Label>
        <S.Input id="reason" type="text" name="reason" value={reason} />
      </S.InputWrapper>
      {location === '/dayoff' ? (
        <S.ButtonsWrapper>
          <S.DayOffButton id="dayOff" type="submit" onClick={handleDayOffButtonClick}>
            연차
          </S.DayOffButton>
          <S.HalfOffButton id="halfOff" type="submit" onClick={handleHalfOffButtonClick}>
            반차
          </S.HalfOffButton>
        </S.ButtonsWrapper>
      ) : (
        <S.SizedBox />
      )}
      <S.ApprovalRequestButton type="submit" onClick={handleConfirmButtonClick}>
        승인요청하기
      </S.ApprovalRequestButton>
    </S.RedContainerWrapper>
  )
}

export default ShiftFormContainer
