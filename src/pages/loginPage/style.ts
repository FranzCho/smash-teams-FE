import { theme } from './../../styles/Theme'
import styled from 'styled-components'

export const LoginPageWrapper = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  margin: auto;
`
export const BackGround = styled.div`
  width: 100vw;
  min-width: 1440px;
  height: 50vh;
  background-color: ${theme.colors.red};
  border-top-right-radius: 50vh;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`

export const LoginImage = styled.img`
  width: 460px;
  position: absolute;
  top: -311px;
  left: 30px;
`

export const LoginCharacter = styled.img`
  width: 100px;
  position: absolute;
  top: -82px;
  left: 480px;
`

export const LoginSourseWrapper = styled.div`
  width: 1440px;
  height: 50vh;
  position: absolute;
  bottom: 0;
  left: calc(100vh - 1440px) / 2;
  z-index: 1;
`
export const LoginTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 50px;
`

export const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 80px;
  font-weight: 600;
`
export const Body = styled.div`
  color: ${theme.colors.white};
  font-size: 26px;
  font-weight: 500;
  margin-top: 70px;
  span {
    display: block;
    margin-top: 10px;
  }
`
