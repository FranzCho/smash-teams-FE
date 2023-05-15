import styled from 'styled-components'

export const DropDownWrapper = styled.div<{ width: string }>`
  margin: 10px 0;
  position: relative;
  width: ${({ width }) => width};
  height: 20px;
`

export const DropDownButton = styled.button<{ fonsSize: string }>`
  width: 100%;
  height: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.grayConfirmButton};
  font-weight: 700;
  font-size: ${({ fonsSize }) => fonsSize};
`

export const DropDownListWrapper = styled.div`
  width: 100%;
  height: auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  top: 0;
  z-index: 9;
`

export const DropDownList = styled.button<{ border: boolean }>`
  width: 80%;
  margin: 0 10%;
  height: auto;
  padding: 7px 3px;
  font-weight: 600;
  font-size: 14px !important;
  color: ${({ theme }) => theme.colors.grayConfirmButton};
  border-bottom: ${({ border }) => (border ? '1px solid #C5C5C5' : 'none')};
`
