import styled from 'styled-components'
import { theme } from '../../styles/Theme'
export const RegisterContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 999;
`
export const RegisterWrapper = styled.div`
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

export const RegisterLogoImage = styled.img`
  width: 200px;
`

export const RegisterFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
export const InputWrapper = styled.div``
export const EmailRegisterInput = styled.input`
  width: 400px;
  height: 60px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${theme.colors.gray};
  margin-bottom: 0;

  &:focus {
    outline: none;
    border: 2px solid ${theme.colors.red};
  }
`
export const RegisterInput = styled.input`
  width: 100%;
  height: 60px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${theme.colors.gray};
  margin-bottom: 0;

  &:focus {
    outline: none;
    border: 2px solid ${theme.colors.red};
  }
  &.half {
    width: 250px;
  }
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
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.redDelete};
  }
`
export const EmailSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const Section = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:first-child {
    margin-left: 20px;
`

export const Alert = styled.div`
  width: 250px;
  height: 20px;
  color: ${theme.colors.red};
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  margin-top: 5px;
  text-align: left;
`
export const RegisterButton = styled.button`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 26px;

  &:hover {
    background: ${theme.colors.redDelete};
  }
`
