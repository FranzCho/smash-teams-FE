import { ButtonStatusProps } from '../../../interface/schedule'
import { theme } from './../../../styles/Theme'
import styled from 'styled-components'

const TitleName = styled.div`
  font-size: 18px;
  padding-bottom: 6px;
  font-weight: 700;
`

const Info = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const CompleteItemWrapper = styled.div<ButtonStatusProps>`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 4px 14px;
  margin-bottom: 10px;
  border: 5px solid;

  border-color: ${(props) => {
    switch (props.isStatus) {
      case 'REJECTED':
        return theme.colors.redReject
      case 'APPROVED':
        return theme.colors.blue
      default:
        return theme.colors.grayFont
    }
  }};
`
export const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
`
export const UserInfoWrapper = styled.div`
  width: 100px;
  margin-left: 20px;
`
export const UserName = styled(TitleName)``
export const UserEmail = styled(Info)``
export const UserStartWorkDateWrapper = styled.div`
  margin-left: 30px;
`
export const UserStartWorkDateTitle = styled(TitleName)``
export const UserStartWorkDate = styled.div``

export const ItemDateWrapper = styled.div`
  width: 120px;
  margin-left: 50px;
`
export const ItemDateTitle = styled(TitleName)``
export const ItemDate = styled(Info)``

export const ItemStatusWrapper = styled.div`
  width: 120px;
  margin-left: 20px;
`
export const ItemStatusTitle = styled(TitleName)``
export const ItemStatus = styled(Info)``

export const ItemUserTeamWrapper = styled.div`
  width: 80px;
  height: 40px;
  margin-left: 60px;
  padding: 4px 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ItemUserTeamTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
`
export const ItemUserPositionWrapper = styled(ItemUserTeamWrapper)`
  margin-left: 20px;
`
export const ItemUserPositionTitle = styled(ItemUserTeamTitle)``
export const IteamUserRequestDataWrapper = styled(ItemUserTeamWrapper)`
  background-color: #333;
  color: #fff;
  margin-left: auto;
`
export const IteamUserRequestDataTitle = styled(ItemUserTeamTitle)``
