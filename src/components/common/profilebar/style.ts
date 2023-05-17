import styled from 'styled-components'
import { theme } from '../../../styles/Theme'

export const ProfileWrapper = styled.div`
  width: 280px;
  height: calc(100vh - 380px);
  color: ${theme.colors.white};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.red};
  min-height: 440px;
`

export const TeamTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
`
export const ImageWrapper = styled.div``

export const UploadButton = styled.label`
  position: relative;
`
export const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  width: 100px;
  height: 100px;
  min-height: 100px;
  min-width: 100px;
  border-radius: 50%;
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  border: 2px solid ${theme.colors.red};
  cursor: pointer;
  &:hover {
    border: 2px solid ${theme.colors.white};
  }
`
export const ProfileImage = styled.img`
  height: 100%;

  &:hover {
    opacity: 0.8;
  }
`

export const AddIcon = styled.img`
  width: 40px;
  position: absolute;
  top: 76px;
  left: 76px;
`

export const ProfileInput = styled.input`
  display: none;
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  line-height: 30px;
`
export const Position = styled.div`
  font-size: 20px;
  font-weight: 600;
`
export const Name = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
`
export const EmailWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-top: 16px;
  font-size: 18px;
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`
export const PhoneWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-top: 6px;
  font-size: 16px;
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`
export const StartWork = styled.div`
  margin-top: 30px;
  font-weight: 500;
  display: flex;
  align-items: end;
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`
export const EditButton = styled.button`
  color: ${theme.colors.red};
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: 10px 24px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: ${theme.colors.gray};
  }
`
export const EditTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
`
