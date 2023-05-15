import React from 'react'
import { HeaderLogo, HeaderWrapper, InnerWrapper, Logo, LogoutButton } from './style'
import styled from 'styled-components'
import { logout } from '../../../apis/services/Auth'
import { useMutation, useQueryClient } from 'react-query'
import { getCookie, removeCookie } from '../../../utils/cookies'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { theme } from '../../../styles/Theme'

function Header() {
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      //  성공 후 할것들
    },
  })
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      text: '로그아웃을 하시면 다시 로그인을 하셔야 합니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.colors.blue,
      cancelButtonColor: theme.colors.redReject,
      confirmButtonText: '네, 로그아웃할게요!',
      cancelButtonText: '취소할게요!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '로그아웃 되었습니다.',
          text: `SMASH 하시려면 다시 로그인해주세요. :)`,
          icon: 'success',
          confirmButtonColor: theme.colors.blue,
          confirmButtonText: '확인',
        })
        mutate()
        removeCookie('accessToken')
        queryClient.clear()
        navigate('/login')
      }
    })
  }

  return (
    <HeaderWrapper>
      <InnerWrapper>
        <HeaderLogo>
          <Logo src="/public/title-logo.png" alt="logo" />
        </HeaderLogo>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </InnerWrapper>
    </HeaderWrapper>
  )
}

export default Header
