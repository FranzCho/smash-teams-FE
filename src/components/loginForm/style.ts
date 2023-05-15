import styled from 'styled-components'
import { theme } from '../../styles/Theme'
export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 999;
`
export const LoginWrraper = styled.div`
  width: 50%;
  height: 80%;
  min-width: 400px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: calc(100vh - 8%);
  padding: 30px 0;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

export const LogoWrapper = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const LoginLogo = styled.img`
  width: 200px;
`

export const LoginFormContainer = styled.form`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 50px;
`

export const LoginInput = styled.input`
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
`

interface LoginInputProps {
  isValid: boolean
}
export const LoginButton = styled.button<LoginInputProps>`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${({ isValid }) => (isValid ? theme.colors.redDisable : theme.colors.red)};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin-top: auto;
  cursor: pointer;

  &:hover {
    background: ${({ isValid }) => (isValid ? theme.colors.redDisable : theme.colors.redDelete)};
  }
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
export const Alert = styled.div`
  width: 100%;
  height: 20px;
  color: ${theme.colors.red};
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  margin-top: 5px;
`
