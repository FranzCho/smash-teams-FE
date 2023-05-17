import styled from 'styled-components'
import { ButtonStatusProps, ToggleButtonProps } from '../../interface/schedule'
import { theme } from '../../styles/Theme'

export const CardWrapper = styled.div<ButtonStatusProps>`
  min-width: 340px;
  height: 100%;
  border-radius: 16px;

  border: 5px solid;

  border-color: ${(props) => {
    switch (props.isStatus) {
      case 'REJECTED':
      case 'LAST':
        return theme.colors.greenBe
      case 'APPROVED':
        return theme.colors.blue
      default:
        return theme.colors.grayFont
    }
  }};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const TeamName = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 10px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PositionName = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`
export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
`
export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
export const DateTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`
export const DateSchedule = styled.div``
export const ReasonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`
export const ReasonTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`
export const ReasonContent = styled.div``

export const CardButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AcceptButton = styled.div<ToggleButtonProps>`
  width: 134px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    switch (props.isButtonStatus) {
      case 'APPROVED':
        return theme.colors.blue
      case 'REJECTED':
        return theme.colors.redReject
      default:
        return theme.colors.grayFont
    }
  }};
  color: ${theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    background-color: ${theme.colors.blue};
  }
`
export const RejectButton = styled.div<ToggleButtonProps>`
  width: 134px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    switch (props.isButtonStatus) {
      case 'APPROVED':
        return theme.colors.blue
      case 'REJECTED':
        return theme.colors.redReject
      default:
        return theme.colors.grayFont
    }
  }};
  color: ${theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: ${theme.colors.red};
  }
`

export const CurrentStatusButton = styled.div<ButtonStatusProps>`
  width: 280px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => {
    switch (props.isStatus) {
      case 'REJECTED':
        return theme.colors.redReject
      case 'LAST':
        return theme.colors.greenBe
      case 'APPROVED':
        return theme.colors.blue
      default:
        return theme.colors.grayFont
    }
  }};

  color: ${theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
`
