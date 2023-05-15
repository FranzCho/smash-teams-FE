import styled from 'styled-components'

export const AddTeamItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 300px;
  height: 60px;
  margin: 10px auto;
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  display: flex;
  div {
    width: 154px;
    overflow-x: scroll;
    color: gray;
    font-size: 20px;
    font-weight: 700;
    margin: auto 18px auto 20px;
  }
  span {
    width: 30px;
    margin: auto 0 auto 0;
    font-weight: 600;
    font-size: 14px;
  }
  button {
    background-color: ${({ theme }) => theme.colors.red};
    height: 30px;
    width: 60px;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    margin: auto 5px;
  }
`
