// 연차/당직 내역보기 페이지

import { useQuery, useQueryClient } from 'react-query'
import * as S from './style'

import { getUserSchedule } from '../../apis/services/Schedule'
import HalfOffShiftForm from '../../components/HalfOffShiftForm'
import { MyScheduleData, ScheduleData } from '../../interface/schedule'
import { AxiosError } from 'axios'
import { LoginResponseData } from '../../apis/interface/Auth'
import { getUser } from '../../apis/services/Auth'

function HistoryPage() {
  const { data: myUser } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  const userId = myUser?.data?.id

  const {
    data: mySchedule,
    isLoading,
    error,
  } = useQuery<MyScheduleData, AxiosError>('mySchedule', () => getUserSchedule(userId), {
    enabled: !!userId, // userId가 존재할 때만 쿼리 실행
  })

  const scheduleData = mySchedule?.data?.scheduleList
  // return <S.HistoryContainer> {scheduleData && <HalfOffShiftForm scheduleData={scheduleData} />}</S.HistoryContainer>
  return (
    <S.HistoryContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : scheduleData ? (
        <HalfOffShiftForm scheduleData={scheduleData} />
      ) : (
        <div>No schedule data.</div>
      )}
    </S.HistoryContainer>
  )
}

export default HistoryPage
