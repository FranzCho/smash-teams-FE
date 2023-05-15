import * as S from './style'
import { UseMutateFunction } from 'react-query'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../../apis/interface/Auth'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm({ mutate }: { mutate: UseMutateFunction<unknown, AxiosError, LoginRequest> }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<LoginRequest>()

  const onSubmit = (data: LoginRequest) => {
    mutate(data)
  }

  const navigateToSignUp = () => {
    navigate('/register')
  }

  return (
    <>
      <S.LoginContainer>
        <S.LoginWrraper>
          <S.LogoWrapper>
            <S.LoginLogo src="/title-logo.png" />
          </S.LogoWrapper>
          <S.LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.LoginInput
              id="email"
              type="email"
              placeholder="이메일"
              aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {errors.email ? <S.Alert role="alert">{errors.email.message}</S.Alert> : <S.Alert role="alert"></S.Alert>}
            <S.LoginInput
              id="password"
              type="password"
              placeholder="비밀번호"
              aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
              {...register('password', {
                required: '비밀번호는 필수입력입니다.',
                minLength: {
                  value: 8,
                  message: '8자 이상 비밀번호를 입력하세요.',
                },
              })}
            />
            {errors.password ? (
              <S.Alert role="alert">{errors.password.message}</S.Alert>
            ) : (
              <S.Alert role="alert"></S.Alert>
            )}
            <S.LoginButton type="submit" isValid={!isValid}>
              로그인
            </S.LoginButton>
            <S.RegisterButton onClick={navigateToSignUp}>회원가입</S.RegisterButton>
          </S.LoginFormContainer>
        </S.LoginWrraper>
      </S.LoginContainer>
    </>
  )
}

export default LoginForm
