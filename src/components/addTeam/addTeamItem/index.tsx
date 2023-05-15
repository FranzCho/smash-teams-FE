import * as S from './style'
import { CofirmBasicButtonClick, ConfirmButtonClick } from '../../common/alert'
import { useMutation } from 'react-query'
import { deleteTeam } from '../../../apis/services/Admin'
import { AxiosError } from 'axios'
import { AddTeamItemProps, AddTeamProps } from '../../../interface/admin'

function AddTeamItem({ team, refetch }: AddTeamItemProps) {
  const { mutate } = useMutation(() => deleteTeam(team.teamId), {
    onSuccess: () => {
      CofirmBasicButtonClick('성공적으로 팀을 삭제했습니다.')
      refetch()
    },
    onError: (err: AxiosError) => {
      CofirmBasicButtonClick('팀을 비운후 다시 시도해주세요.')
      console.log(err)
    },
  })
  return (
    <S.AddTeamItem>
      <div>{team.teamName}</div>
      <span>{team.teamCount}명</span>
      <button
        onClick={() => {
          mutate()
        }}
      >
        삭제
      </button>
    </S.AddTeamItem>
  )
}

export default AddTeamItem
