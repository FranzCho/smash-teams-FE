import * as S from './style'
import { MyScheduleData } from '../../interface/schedule'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import { theme } from '../../styles/Theme'
import { AxiosError } from 'axios'
import { LoginResponseData } from '../../apis/interface/Auth'
import { orderSchedule } from '../../apis/services/Schedule'

interface HistoryCardProps {
  schedule: MyScheduleData
}

export interface orderScheduleProps {
  scheduleId: number
  status: 'FIRST' | 'REJECTED' | 'APPROVED' | 'LAST'
}

interface orderScheduleResponseProps extends orderScheduleProps {
  remain: number
}

function HistoryCard({ schedule }: HistoryCardProps) {
  const queryClient = useQueryClient()
  const { data } = queryClient.getQueryData('myUser') as LoginResponseData
  const [isRefetch, setIsRefetch] = useState<boolean>(false)
  const [userType, setUserType] = useState<string | undefined>(data?.role) // CEO(사장), MANAGER(팀장), USER(팀원, default)
  const [status, setStatus] = useState(schedule.status as 'FIRST' | 'REJECTED' | 'APPROVED' | 'LAST')
  const location = useLocation()
  const { mutate, isError, isLoading } = useMutation<orderScheduleResponseProps, AxiosError, orderScheduleProps>(
    orderSchedule,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('userHistory', { refetchActive: true, refetchInactive: true })
        Swal.fire({
          title: '승인되었습니다.',
          text: `완료된 목록에서 확인해주세요. :)`,
          icon: 'success',
          confirmButtonColor: theme.colors.blue,
          confirmButtonText: '완료된 목록 바로가기',
        })
      },

      onError: (error) => {
        queryClient.invalidateQueries('userHistory', { refetchActive: true, refetchInactive: true })
        setisAccept('BEFORE')
        setisReject('BEFORE')
        Swal.fire({
          title: '잘못된 승인입니다.',
          text: `승인 상태를 확인해주세요.`,
          icon: 'error',
          confirmButtonColor: theme.colors.blue,
          confirmButtonText: '확인',
        })
      },
    },
  )

  const scheduleStatus = {
    FIRST: '1차 결재 대기',
    REJECTED: '거절',
    LAST: '최종 결재 대기',
    APPROVED: '승인',
  }

  // 승인
  const [isAccept, setisAccept] = useState<'BEFORE' | 'APPROVED' | 'REJECTED'>('BEFORE')
  // 거절
  const [isReject, setisReject] = useState<'BEFORE' | 'APPROVED' | 'REJECTED'>('BEFORE')

  // 승인, 거절 후 버튼 상태 변경
  function handleButtonClick(buttonType: 'BEFORE' | 'APPROVED' | 'REJECTED') {
    if (buttonType === 'APPROVED') {
      Swal.fire({
        title: '승인하시겠습니까?',
        text: '승인 후 취소할 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: theme.colors.blue,
        cancelButtonColor: theme.colors.redReject,
        confirmButtonText: '네, 승인할게요!',
        cancelButtonText: '취소할게요!',
      }).then((result) => {
        if (result.isConfirmed) {
          setisAccept(buttonType)
          setisReject('BEFORE')
          mutate({
            scheduleId: schedule.scheduleId,
            status: 'APPROVED',
          })
        }
      })
    }
    if (buttonType === 'REJECTED') {
      Swal.fire({
        title: '거절하시겠습니까?',
        text: '거절 후 취소할 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: theme.colors.blue,
        cancelButtonColor: theme.colors.redReject,
        confirmButtonText: '네, 거절할게요!',
        cancelButtonText: '취소할게요!',
      }).then((result) => {
        if (result.isConfirmed) {
          setisAccept(buttonType)
          mutate({
            scheduleId: schedule.scheduleId,
            status: 'REJECTED',
          })
        }
      })
    }
  }

  return (
    <S.CardWrapper isStatus={status}>
      <S.TitleWrapper>
        <S.TeamName>{schedule.user.teamName}</S.TeamName>
        <S.PositionName>{schedule.user.role}</S.PositionName>
        <S.UserName>{schedule.user.name}</S.UserName>
      </S.TitleWrapper>
      <S.DateWrapper>
        <S.DateTitle>일정</S.DateTitle>
        <S.DateSchedule>{schedule.startDate}</S.DateSchedule>
      </S.DateWrapper>
      <S.ReasonWrapper>
        <S.ReasonTitle>사유</S.ReasonTitle>
        <S.ReasonContent>{schedule.reason}</S.ReasonContent>
      </S.ReasonWrapper>
      <S.CardButtonWrapper>
        {userType === '팀원' || location.pathname === '/history' ? (
          <S.CurrentStatusButton isStatus={status}>{scheduleStatus[status]}</S.CurrentStatusButton>
        ) : (
          <>
            <S.AcceptButton onClick={() => handleButtonClick('APPROVED')} isButtonStatus={isAccept}>
              승인
            </S.AcceptButton>
            <S.RejectButton onClick={() => handleButtonClick('REJECTED')} isButtonStatus={isReject}>
              거절
            </S.RejectButton>
          </>
        )}
      </S.CardButtonWrapper>
    </S.CardWrapper>
  )
}

export default HistoryCard
