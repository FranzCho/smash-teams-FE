import styled from 'styled-components'

export const AddTeamContainer = styled.div`
  position: fixed;
  left: calc((100vw - 360px) / 2);
  top: calc((100vh - 460px) / 2);
  width: 360px;
  height: 460px;
  background-color: ${({ theme }) => theme.colors.redContainer};
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  z-index: 1;
`

export const AddTeamInput = styled.div`
  background-color: white;
  width: 300px;
  height: 60px;
  margin: 30px auto 30px auto;
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  display: flex;
  input {
    color: gray;
    font-size: 18px;
    font-weight: 700;
    margin: auto 10px auto 15px;
    width: 198px;
    border: none;
  }
  button {
    background-color: ${({ theme }) => theme.colors.grayConfirmButton};
    height: 30px;
    width: 60px;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    margin: auto 5px;
  }
`

export const AddTeamWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  height: 320px;
  overflow-y: scroll;
`
