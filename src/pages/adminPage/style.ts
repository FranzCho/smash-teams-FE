import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AdminWrapper = styled.div`
  width: 1137px;
  margin-left: 3px;
  height: auto;
  padding: 40px 40px;
`

export const TeamBar = styled.div`
  margin: 0px 0 0 0px;
  width: 100%;
  height: auto;
  display: flex;
`

export const TopBarList = styled.button<{ click: string }>`
  width: auto;
  height: auto;
  margin-left: 13px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  padding: 0 0 10px 0;
  color: ${({ click }) => (click === 'true' ? `#000` : '#A1A1A1')};
  border-bottom: ${({ click }) => (click === 'true' ? `4px solid #000` : '4px solid #fff')};
`

export const TopBarAddIcon = styled.button`
  /* background-color: ${({ theme }) => theme.colors.mainColor}; */
  width: 18px;
  height: 18px;
  margin-left: 9px;
  margin-top: -2px;
  border-radius: 50%;
`

export const Admin = styled.div`
  width: 1030px;
  height: 600px;
  margin: 0 auto 0 auto;
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`

export const AdminSearch = styled.div`
  width: 950px;
  height: 70px;
  margin: 17px auto 0 auto;
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  button {
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    align-items: end;
    margin-right: 35px;
    cursor: pointer;
  }
  input {
    width: 800px;
    border: none;
    text-indent: 30px;
    font-size: 20px;
  }
`

export const TotalPage = styled.div`
  width: auto;
  margin: 15px auto 0 auto;
`

export const PageButton = styled.button<{ isPage: boolean }>`
  margin: 0 4px;
  font-size: 17px;
  font-weight: ${({ isPage }) => (isPage ? '700' : '500')};
  color: ${({ isPage }) => (isPage ? 'balck' : 'gray')};
`
