import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 3px solid #aa2727;
  display: flex;
`

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  margin: 0 auto;
`
export const HeaderLogo = styled.div`
  width: 260px;
  padding-left: 20px;
`
export const Logo = styled.img`
  width: 160px;
  padding: 10px;
  cursor: pointer;
`
export const LogoutButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #aa2727;
  color: #fff;
  border-radius: 8px;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`
