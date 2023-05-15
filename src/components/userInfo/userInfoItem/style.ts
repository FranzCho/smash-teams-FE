import styled from 'styled-components'

export const UserInfoItem = styled.div`
  height: 70px;
  width: 950px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom: 10px;
  margin-left: 40px;
  display: flex;
  align-items: center;
`

export const AdminButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.grayConfirmButton};
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  font-weight: 700;
  margin-left: 10px;
`

export const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px 0 20px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`

export const UserDetail = styled.div`
  width: 140px;
  height: 100%;
  margin: auto 10px auto 0px;
  color: ${({ theme }) => theme.colors.grayConfirmButton};
  h1 {
    margin: 19px 0 0 0;
    font-weight: 800;
  }
  h2 {
    margin: 5px 0 0 0;
    font-weight: 600;
  }
  h3 {
    margin: 5px 0 0 0;
    font-weight: 800;
  }
  &.detail-1 {
    width: 240px;
  }
`

export const DropdownWrapper = styled.div`
  width: 180px;
  display: flex;
  margin-left: 60px;
  .dropdown {
    margin: -10px 5px 0 0;
  }
`
