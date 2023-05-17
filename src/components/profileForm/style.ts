import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 999;
`

export const ProfileWrapper = styled.div`
  position: relative;
  height: calc(100vh - 400px);
  margin-left: calc(100vh - 46%);
  padding: 40px;
  width: 600px;
  height: 700px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  z-index: 1;
`

export const ProfileLogoImage = styled.img`
  width: 200px;
`

export const ProfileFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
export const InputWrapper = styled.div``
export const PassWordInputWrapper = styled.div`
  display: flex;
`

export const ProfileInput = styled.input`
  width: 380px;
  height: 60px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${theme.colors.gray};
  &.half {
    width: 250px;
  }
`

export const ErrorMessage = styled.div`
  font-size: 10px;
  color: ${theme.colors.red};
`

export const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  border-top-left-radius: 1000px;
  width: 100vw;
  height: 400px;
  background-color: ${theme.colors.red};
  z-index: 0;
`

export const DoubleCheckButton = styled.div`
  width: 200px;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${theme.colors.gray};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Section = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & {
    margin-top: 24px;
  }
`

export const Alert = styled.div`
  width: 250px;
  height: 20px;
  color: ${theme.colors.red};
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  margin-top: 4px;
  text-align: left;
`
export const ModifyButton = styled.button`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 24px;
  &:hover {
    background: ${theme.colors.redDelete};
  }
`
