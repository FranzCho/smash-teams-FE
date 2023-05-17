import { BiTimeFive } from 'react-icons/bi'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { BsPencilSquare } from 'react-icons/bs'
import { GoChecklist } from 'react-icons/go'
import { BsFillFilePersonFill } from 'react-icons/bs'
import * as S from './style'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { LoginResponseData } from '../../../apis/interface/Auth'
import { AxiosError } from 'axios'
import { getUser } from '../../../apis/services/Auth'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const { data: myUser, refetch } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)
  if (myUser?.data?.role === 'ADMIN') {
    navigate('/admin')
  }

  return (
    <S.NavbarWrapper>
      {myUser?.data?.role === 'ADMIN' ? (
        <S.NavbarLink to="/admin">
          <S.NavbarLinkText>
            <BsFillFilePersonFill />
            유저 권한 설정하기
          </S.NavbarLinkText>
        </S.NavbarLink>
      ) : (
        <>
          <S.NavbarLink to="/">
            <S.NavbarLinkText>
              <FaRegCalendarCheck />
              전체 일정보기
            </S.NavbarLinkText>
          </S.NavbarLink>
          <S.NavbarLink to="/dayoff">
            <S.NavbarLinkText>
              <BsPencilSquare />
              연차 신청하기
            </S.NavbarLinkText>
          </S.NavbarLink>
          <S.NavbarLink to="/nightshift">
            <S.NavbarLinkText>
              {' '}
              <BiTimeFive />
              당직 신청하기
            </S.NavbarLinkText>
          </S.NavbarLink>
          <S.NavbarLink to="/history">
            <S.NavbarLinkText>
              <CgNotes />
              연차 / 당직 내역보기
            </S.NavbarLinkText>
          </S.NavbarLink>
          {myUser?.data?.role !== 'USER' && (
            <S.NavbarLink to="/manage">
              <S.NavbarLinkText>
                <GoChecklist />
                연차 / 당직 관리하기
              </S.NavbarLinkText>
            </S.NavbarLink>
          )}
        </>
      )}
    </S.NavbarWrapper>
  )
}

export default Navbar
