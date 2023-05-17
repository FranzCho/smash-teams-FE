import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import MiniCalendar from '../../components/miniCalendar'
import ShiftFormContainer from '../../components/shiftFormContainer'
import { DayOffWrapper } from './style'

// 연차/반차 신청 페이지
function DayOffPage() {
  const location = useLocation()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState<string>('')

  return (
    <DayOffWrapper>
      <MiniCalendar view={'month'} setStartDate={setStartDate} setEndDate={setEndDate} setReason={setReason} />
      <ShiftFormContainer
        location={location.pathname}
        children={undefined}
        startDate={startDate}
        endDate={endDate}
        reason={reason}
      />
    </DayOffWrapper>
  )
}

export default DayOffPage
