import { AxiosError } from 'axios'
import React, { useState, ReactNode } from 'react'
import { useMutation, useQuery } from 'react-query'
import { createUserSchedule } from '../../apis/services/Schedule'

import * as S from './style'
import Swal from 'sweetalert2'
import { theme } from '../../styles/Theme'
import { useNavigate } from 'react-router-dom'
import { LoginResponseData } from '../../apis/interface/Auth'
import { getUser } from '../../apis/services/Auth'

type FormType = 'DAYOFF' | 'HALFOFF' | 'NIGHTSHIFT'

export interface ShiftFormContainerProps {
  children: ReactNode
  location: string
  startDate: string
  endDate: string
  reason: string
}

function ShiftFormContainer({ location, startDate, endDate, reason }: ShiftFormContainerProps) {
  const navigate = useNavigate()
  const [formType, setFormType] = useState<FormType>('DAYOFF')

  const handleTitleChange = location === '/dayoff' ? (formType === 'DAYOFF' ? '연차' : '반차') : '당직'
  const handleStartTitleChange =
    location === '/dayoff' ? (formType === 'DAYOFF' ? '시작 날짜' : '반차 시작') : '근무 시작'
  const handleEndTitleChange =
    location === '/dayoff' ? (formType === 'DAYOFF' ? '종료 날짜' : '반차 종료') : '근무 종료'

  const handleDayOffButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormType('DAYOFF' as FormType)
  }

  const handleHalfOffButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormType('HALFOFF' as FormType)
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

  const { data: myUser, isLoading: user } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  let isSDate: string
  let isEDate: string

  const { mutate, isError, isLoading } = useMutation(
    () =>
      createUserSchedule({
        schedule: { type: formType, startDate: isSDate, endDate: isEDate, reason },
        id: myUser?.data?.id,
      }),
    {
      onSuccess: (data) => {
        navigate('/history')
      },
      onError: (error: AxiosError) => {
        console.log(error)
      },
    },
  )

  if (startDate && endDate) {
    const SDate = new Date(startDate)
    const EDate = new Date(endDate)
    isSDate = SDate.toISOString().slice(0, 19)
    isEDate = EDate.toISOString().slice(0, 19)
  }

  function handleConfirmButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (location === '/nightshift') {
      setFormType('SHIFT' as FormType)
    }

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
          text: '신청이 완료되었어요! 내역보기에서 확인해보세요 :)',
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
    <>
      <S.RedContainerWrapper>
        {location === '/dayoff' ? (
          <S.DayOffCountContainer>
            <p>남은 연차 날짜</p>
            <p>{`Day-${myUser?.data?.remain}`}</p>
          </S.DayOffCountContainer>
        ) : null}
        <S.ShiftTitle>{handleTitleChange}</S.ShiftTitle>
        {location === '/dayoff' ? (
          <S.InputWrapper>
            <S.Label htmlFor="startDate halfDate">{handleStartTitleChange}</S.Label>
            <S.DateInput
              className="startDate halfDate"
              id="startDate"
              type="text"
              name="startDate"
              value={formatStartDate === 'NaN.aN.aN' ? '캘린더에서 선택해 주세요' : formatStartDate}
              readOnly
            />
          </S.InputWrapper>
        ) : (
          <S.InputWrapper>
            <S.Label htmlFor="startDate halfDate">{handleStartTitleChange}</S.Label>
            <S.DateInput
              id="endDate"
              type="text"
              name="endDate"
              value={formatEndDate === 'NaN.aN.aN' ? '캘린더에서 선택해 주세요' : formatEndDate}
              readOnly
            />
          </S.InputWrapper>
        )}
        {location === '/dayoff' ? (
          <S.InputWrapper>
            <S.Label htmlFor="endDate halfOffTime">{handleEndTitleChange}</S.Label>
            {formType === 'DAYOFF' ? (
              <S.DateInput
                id="endDate"
                type="text"
                name="endDate"
                value={formatEndDate === 'NaN.aN.aN' ? '캘린더에서 선택해 주세요' : formatEndDate}
                readOnly
              />
            ) : (
              <S.TimeInput
                id="endDate"
                type="text"
                name="endDate"
                value={formatEndDate === 'NaN.aN.aN' ? '캘린더에서 선택해 주세요' : formatEndDate}
                readOnly
              />
            )}
          </S.InputWrapper>
        ) : (
          <S.InputWrapper>
            <S.Label htmlFor="startDate halfDate">{handleEndTitleChange}</S.Label>
            <S.DateInput
              id="endDate"
              type="text"
              name="endDate"
              value={formatEndDate === 'NaN.aN.aN' ? '캘린더에서 선택해 주세요' : formatEndDate}
              readOnly
            />
          </S.InputWrapper>
        )}
        <S.InputWrapper>
          <S.Label htmlFor="reason">사유</S.Label>
          <S.Input id="reason" type="text" name="reason" value={reason} readOnly />
        </S.InputWrapper>
        {location === '/dayoff' ? (
          <S.ButtonsWrapper>
            <S.DayOffButton
              isClicked={handleTitleChange === '연차'}
              id="dayOff"
              type="submit"
              onClick={handleDayOffButtonClick}
            >
              연차
            </S.DayOffButton>
            <S.HalfOffButton
              isClicked={handleTitleChange === '반차'}
              id="halfOff"
              type="submit"
              onClick={handleHalfOffButtonClick}
            >
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
    </>
  )
}

export default ShiftFormContainer
