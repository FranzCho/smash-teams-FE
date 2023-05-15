import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import MiniCalendar from '../../components/miniCalendar'
import ShiftFormContainer from '../../components/shiftFormContainer'
import { DayOffWrapper } from './style'

// 연차/반차 신청 페이지
function DayOffPage() {
  const location = useLocation()
  console.log('location 출력', location.pathname)

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [reason, setReason] = useState<string>('')

  return (
    <DayOffWrapper>
      <MiniCalendar view={'month'} setStartDate={setStartDate} setEndDate={setEndDate} setReason={setReason} />

      <ShiftFormContainer
        type={'DAYOFF'}
        location={location.pathname}
        children={undefined}
        startDate={startDate}
        endDate={endDate}
        reason={reason}
        // dateFormat={''}
      />
    </DayOffWrapper>
  )
}

export default DayOffPage
