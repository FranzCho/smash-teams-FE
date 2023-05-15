import styled from 'styled-components'
import { theme } from '../../styles/Theme'
import { HistoryButtonProps } from '../../interface/schedule'

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 14px;
  margin-bottom: 14px;
`
export const ButtonWrapper = styled.div`
  display: flex;
`
export const RequestingButton = styled.div<HistoryButtonProps>`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  background-color: ${(props) => {
    return props.isButtonStatus ? theme.colors.blackCompleteList : theme.colors.white
  }};

  color: ${(props) => {
    return props.isButtonStatus ? theme.colors.white : theme.colors.blackCompleteList
  }};
`
export const Completionbutton = styled.div<HistoryButtonProps>`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  background-color: ${(props) => {
    return props.isButtonStatus ? theme.colors.blackCompleteList : theme.colors.white
  }};

  color: ${(props) => {
    return props.isButtonStatus ? theme.colors.white : theme.colors.blackCompleteList
  }};
`
