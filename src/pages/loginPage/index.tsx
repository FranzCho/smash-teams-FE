import { useNavigate } from 'react-router-dom'
import * as S from './style'
import { useMutation } from 'react-query'
import { login } from '../../apis/services/Auth'
import LoginForm from '../../components/loginForm'
import { AxiosError } from 'axios'
import { LoginRequest, LoginResponseData } from '../../apis/interface/Auth'
import Swal from 'sweetalert2'
import { theme } from '../../../src/styles/Theme'

// 로그인 페이지
function LoginPage() {
  const navigate = useNavigate()

  const { mutate } = useMutation<LoginResponseData, AxiosError, LoginRequest>(login, {
    onSuccess: (data) => {
      navigate('/')
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: '로그인에 실패했습니다.',
        text: '아이디와 비밀번호를 확인해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: theme.colors.blue,
      })
    },
  })

  return (
    <>
      <S.LoginPageWrapper>
        <LoginForm mutate={mutate} />
        <S.LoginSourseWrapper>
          <S.LoginTextWrapper>
            <S.Title>연차때려!</S.Title>
            <S.Body>
              <span>회사 내 직원들의 연차와 당직 일정을</span>
              <span>효율적으로 관리할 수 있는 협업툴</span>
            </S.Body>
          </S.LoginTextWrapper>
          <S.LoginImage src="/login.jpg" />
          <S.LoginCharacter src="/monster.gif" />
        </S.LoginSourseWrapper>
      </S.LoginPageWrapper>
      <S.BackGround></S.BackGround>
    </>
  )
}

export default LoginPage
