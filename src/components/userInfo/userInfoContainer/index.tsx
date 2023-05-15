import { UserInfoProps } from '../../../interface/admin'
import UserInfoItem from '../userInfoItem'
import * as S from './style'

function UserInfoContainer({ userList, teamList, refetch }: UserInfoProps) {
  console.log(userList, teamList)
  const filterTeam = teamList.filter((team) => {
    if (team === '전체보기') {
      return false
    } else {
      return true
    }
  })
  filterTeam[filterTeam.length + 1] = '무소속'
  return (
    <S.UserInfoContainer>
      {userList.map((user, key) => {
        return <UserInfoItem key={key} user={user} team={filterTeam} refetch={refetch} />
      })}
    </S.UserInfoContainer>
  )
}

export default UserInfoContainer
