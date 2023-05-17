import RegisterForm from '../../components/registerForm'
import * as S from './style'

// 회원가입하기 페이지
function RegisterPage() {
  return (
    <>
      <S.RegisterPageWrapper>
        <RegisterForm />
        <S.RegisterSourseWrapper>
          <S.RegisterTextWrapper>
            <S.Title>연차때려!</S.Title>
            <S.Body>
              <span>회사 내 직원들의 연차와 당직 일정을</span>
              <span>효율적으로 관리할 수 있는 협업툴</span>
            </S.Body>
          </S.RegisterTextWrapper>
          <S.RegisterImage src="/register.jpg" />
          <S.RegisterCharacter src="/monster.gif" />
        </S.RegisterSourseWrapper>
      </S.RegisterPageWrapper>
      <S.BackGround></S.BackGround>
    </>
  )
}

export default RegisterPage
