import styled from 'styled-components'
import { theme } from './../../styles/Theme'

export const RegisterContainer = styled.div``

export const RegisterPageWrapper = styled.div`
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
  border-top-left-radius: 50vh;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`

export const RegisterImage = styled.img`
  width: 460px;
  position: absolute;
  top: -368px;
  right: 30px;
`
export const RegisterCharacter = styled.img`
  width: 100px;
  position: absolute;
  top: -82px;
  right: 460px;
`

export const RegisterSourseWrapper = styled.div`
  width: 1440px;
  height: 50vh;
  position: absolute;
  bottom: 0;
  left: calc(100vh - 1440px) / 2;
  z-index: 1;
`
export const RegisterTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 80px 50px;
  align-items: flex-end;
`

export const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 70px;
  font-weight: 600;
`
export const Body = styled.div`
  color: ${theme.colors.white};
  font-size: 26px;
  font-weight: 500;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    display: block;
    margin-top: 10px;
  }
`
