import { useQuery } from 'react-query'
import { getSuperSchedule, getUserSchedule } from '../../apis/services/Schedule'
import HalfOffShiftForm from '../../components/HalfOffShiftForm'
import * as S from './style'

// 연차/당직 관리하기 페이지
function ManagePage() {
  const { data: mySchedule, isError, isLoading } = useQuery('userHistory', getSuperSchedule)
  const scheduleData = mySchedule?.data.scheduleList
  return (
    <S.ManageContainer>
      <HalfOffShiftForm scheduleData={scheduleData}></HalfOffShiftForm>
    </S.ManageContainer>
  )
}

export default ManagePage
