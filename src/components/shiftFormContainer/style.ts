import styled from 'styled-components'

export const RedContainerWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 94px 24px 0 24px;
  min-width: 48%;
  min-height: 114%;
  background-color: ${({ theme }) => theme.colors.redContainer};
  border-radius: 8px;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.25);
`
export const DayOffCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5%;
  right: 6%;
  color: ${({ theme }) => theme.colors.white};
  padding: 16px 12px;
  font-weight: 600;
  font-size: 14;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 6px;
`
export const ShiftTitle = styled.div`
  position: absolute;
  top: 6%;
  left: 5%;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 40px;
`
export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0 10px 0;
  width: 100%;
  padding: 0.4em 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
`
export const Label = styled.label`
  color: ${({ theme }) => theme.colors.blackTabBar};
  font-weight: 600;
  font-size: 16px;
  margin: 16px;
`
export const DateInput = styled.input`
  margin-right: 25px;
  color: ${({ theme }) => theme.colors.blackTabBar};
  border: none;
  font-weight: 600;
  font-size: 16px;
  text-align: right;
`
export const TimeInput = styled.input`
  margin-right: 25px;
  color: ${({ theme }) => theme.colors.blackTabBar};
  border: none;
  font-weight: 600;
  font-size: 16px;
  text-align: right;
`
export const Input = styled.input`
  margin-right: 20px;
  border: none;
  text-align: center;
  text-overflow: ellipsis;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 82px 0 0 0;
  width: 100%;
`
export const DayOffButton = styled.button<{ isClicked: boolean }>`
  margin-right: 12px;
  padding: 16px 68px;
  width: 100%;

  background-color: ${({ theme, isClicked }) => (isClicked ? theme.colors.white : theme.colors.mainColor)};
  color: ${({ theme, isClicked }) => (isClicked ? theme.colors.mainColor : theme.colors.white)};
  font-weight: 600;
  font-size: 16px;
  border-radius: 6px;
`
export const HalfOffButton = styled.button<{ isClicked: boolean }>`
  margin-left: 12px;
  padding: 16px 68px;
  width: 100%;

  background-color: ${({ theme, isClicked }) => (isClicked ? theme.colors.white : theme.colors.mainColor)};
  color: ${({ theme, isClicked }) => (isClicked ? theme.colors.mainColor : theme.colors.white)};
  font-weight: 600;
  font-size: 16px;
  border-radius: 6px;
`

export const SizedBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 120px;
  width: 100%;
`
export const DropDown = styled.div``

export const ApprovalRequestButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.redConfirmButton};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 16px;
  margin: 16px;
  padding: 40px auto;
  width: 100%;
  height: 55px;
  border-radius: 6px;
`
