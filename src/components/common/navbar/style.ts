import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 30px;
  height: 320px;
  border-left: 1px solid #c1c1c1;
  box-shadow: 2px 0px 3px -1px #c1c1c1;
`
export const NavbarLink = styled(Link)`
  width: 250px;
  color: #aa2727;
  font-weight: 400;
  text-decoration: none;
  margin: 5px 0;
  padding: 8px 26px 8px 30px;
  border-radius: 8px;
  display: flex;
  &:hover {
    background-color: rgb(170, 39, 39, 0.2);
  }
`
export const NavbarLinkText = styled.span`
  display: flex;
  font-size: 18px;
  font-weight: 800;
  line-height: 30px;
  & > svg {
    font-size: 26px;
    margin-right: 12px;
  }
`
