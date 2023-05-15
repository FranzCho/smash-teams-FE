import AddTeamItem from '../addTeamItem'
import * as S from './style'
import { ConfirmButtonClick, CofirmBasicButtonClick } from '../../common/alert'
import { useMutation } from 'react-query'
import { addTeam } from '../../../apis/services/Admin'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { AddTeamProps } from '../../../interface/admin'

function AddTeamContainer({ teamInfo, refetch }: AddTeamProps) {
  const [teamInput, setTeamInput] = useState('')

  const { mutate } = useMutation(() => addTeam(teamInput), {
    onSuccess: () => {
      refetch()
      CofirmBasicButtonClick('팀을 성공적으로 추가하였습니다.')
    },
    onError: (err: AxiosError) => {
      console.log(err)
      CofirmBasicButtonClick('팀을 추가하지 못했습니다.')
    },
  })
  return (
    <S.AddTeamContainer>
      <S.AddTeamInput>
        <input
          type="text"
          placeholder="추가할 팀을 작성해주세요."
          onChange={(e) => {
            setTeamInput(() => e.target.value)
          }}
        />
        <button
          onClick={() => {
            if (teamInput.includes('팀')) {
              mutate()
            } else {
              CofirmBasicButtonClick('팀이 포함되어야 합니다.')
            }
          }}
        >
          추가
        </button>
      </S.AddTeamInput>
      <S.AddTeamWrapper>
        {teamInfo.map((team) => {
          return <AddTeamItem team={team} refetch={refetch} />
        })}
      </S.AddTeamWrapper>
    </S.AddTeamContainer>
  )
}

export default AddTeamContainer
