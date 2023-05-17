import { useState } from 'react'
import * as S from './style'
import { HistoryScheduleData } from '../../../interface/schedule'

// HistoryScheduleData
function CompleteItem(schedule: any) {
  const [scheduleStatus, setScheduleStatus] = useState(
    schedule.schedule.status as 'FIRST' | 'REJECTED' | 'APPROVED' | 'LAST',
  )

  function updateSchedule(schedule: HistoryScheduleData) {
    const { user, startDate } = schedule.schedule
    schedule.schedule.user.startWork = formatDate(user.startWork)
    schedule.schedule.startDate = formatDate(startDate)
  }
  updateSchedule(schedule)

  function formatDate(dateString: string | number): string {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  let { status, type, user } = schedule.schedule

  switch (status) {
    case 'APPROVED':
      status = '최종 승인'
      break
    case 'REJECTED':
      status = '거절'
      break
    case 'LAST':
      status = '1차 승인'
      break
    default:
      break
  }

  switch (type) {
    case 'HALFOFF':
      type = '반차'
      break
    case 'DAYOFF':
      type = '연차'
      break
    case 'SHIFT':
      type = '당직'
      break
    default:
      break
  }
  switch (user.role) {
    case 'USER':
      user.role = '팀원'
      break
    case 'MANAGER':
      user.role = '팀장'
      break
    case 'CEO':
      user.role = '사장'
      break
    default:
      break
  }
  const profileImage = schedule.schedule.user.profileImage ? schedule.schedule.user.profileImage : '/noprofile.png'

  return (
    <S.CompleteItemWrapper isStatus={scheduleStatus}>
      <S.ProfileImg src={profileImage}></S.ProfileImg>
      <S.UserInfoWrapper>
        <S.UserName>성명</S.UserName>
        <S.UserEmail>{schedule.schedule.user.name}</S.UserEmail>
      </S.UserInfoWrapper>
      <S.UserStartWorkDateWrapper>
        <S.UserStartWorkDateTitle>입사일</S.UserStartWorkDateTitle>
        <S.UserStartWorkDate>{schedule.schedule.user.startWork}</S.UserStartWorkDate>
      </S.UserStartWorkDateWrapper>
      <S.ItemDateWrapper>
        <S.ItemDateTitle>신청일</S.ItemDateTitle>
        <S.ItemDate>{schedule.schedule.startDate}</S.ItemDate>
      </S.ItemDateWrapper>
      <S.ItemStatusWrapper>
        <S.ItemStatusTitle>승인여부</S.ItemStatusTitle>
        <S.ItemStatus>{status}</S.ItemStatus>
      </S.ItemStatusWrapper>
      <S.ItemUserTeamWrapper>
        <S.ItemUserTeamTitle>{schedule.schedule.user.teamName}</S.ItemUserTeamTitle>
      </S.ItemUserTeamWrapper>
      <S.ItemUserPositionWrapper>
        <S.ItemUserPositionTitle>{user.role}</S.ItemUserPositionTitle>
      </S.ItemUserPositionWrapper>
      <S.IteamUserRequestDataWrapper>
        <S.IteamUserRequestDataTitle>{type}</S.IteamUserRequestDataTitle>
      </S.IteamUserRequestDataWrapper>
    </S.CompleteItemWrapper>
  )
}

export default CompleteItem
