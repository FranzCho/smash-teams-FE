import { useMutation } from 'react-query'
import { RegisterEnroll } from '../../apis/interface/Auth'
import { AxiosError, AxiosResponse } from 'axios'
import { RegisterRequest } from '../../apis/interface/Auth'
import { useForm } from 'react-hook-form'
import { emailCheck, join } from '../../apis/services/Auth'
import * as S from './style'
import Swal from 'sweetalert2'
import { theme } from '../../styles/Theme'
import { useNavigate } from 'react-router-dom'

export interface JoinResponseData {
  status: number
  msg: string
  data: boolean
}
export interface EmailCheckResponseData {
  status: number
  msg: string
  data: boolean
}

function RegisterForm() {
  // useForm
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, errors, isValid },
  } = useForm<RegisterRequest>()

  const navigate = useNavigate()

  // 회원가입
  const { mutate: joinMutation } = useMutation<JoinResponseData, AxiosError, RegisterEnroll>(join, {
    onSuccess: (data) => {
      Swal.fire({
        title: '회원가입이 완료되었습니다.',
        text: '로그인을 진행해주세요.',
        icon: 'success',
        confirmButtonColor: `${theme.colors.blue}`,
      })
      navigate('/login')
    },
    onError: (error) => {
      Swal.fire({
        title: '회원가입에 실패하였습니다.',
        text: '다시 시도해주세요.',
        icon: 'error',
        confirmButtonColor: `${theme.colors.red}`,
      })
    },
  })

  // email 중복체크
  const { mutate: emailCheckMutation } = useMutation<
    AxiosResponse<EmailCheckResponseData> | undefined,
    AxiosError,
    string
  >(emailCheck, {
    onSuccess: (data) => {
      if (!data?.data.data) {
        Swal.fire({
          title: '사용가능한 이메일입니다.',
          text: '회원가입을 진행해주세요.',
          icon: 'success',
          confirmButtonColor: `${theme.colors.blue}`,
        })
      } else {
        Swal.fire({
          title: '사용불가능한 이메일입니다.',
          text: '다른 이메일을 입력해주세요.',
          icon: 'error',
          confirmButtonColor: `${theme.colors.red}`,
        })
      }
    },
  })

  // 날짜 포맷 변경 함수
  function formatDate(inputDate: string) {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const onSubmit = (data: RegisterEnroll) => {
    const { email, name, password, phoneNumber, startWork } = data
    joinMutation({
      email,
      name,
      password,
      phoneNumber,
      startWork: formatDate(startWork),
      teamName: 'common',
    })
  }

  // email 중복체크
  const onSubmitEmail = () => {
    const email = getValues('email')
    const pattern = /\S+@\S+\.\S+/ // 이메일 정규식
    const emailValue = pattern.test(email)

    if (!emailValue) {
      Swal.fire({
        title: '이메일 형식에 맞지 않습니다.',
        text: '다른 이메일을 입력해주세요.',
        icon: 'error',
        confirmButtonColor: `${theme.colors.red}`,
      })
      return
    }
    emailCheckMutation(email)
  }

  const LoginButtonHandler = () => {
    navigate('/login')
  }

  return (
    <>
      <S.RegisterContainer>
        <S.RegisterWrapper>
          <S.RegisterLogoImage src="/title-logo.png" />
          <S.RegisterFormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.EmailSection>
              <S.InputWrapper>
                <S.EmailRegisterInput
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
                {errors.email ? (
                  <S.Alert role="alert">{errors.email.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.InputWrapper>
              <S.DoubleCheckButton onClick={onSubmitEmail}>중복확인</S.DoubleCheckButton>
            </S.EmailSection>
            <S.Section>
              <S.InputWrapper>
                <S.RegisterInput
                  id="name"
                  type="text"
                  placeholder="이름"
                  className="half"
                  {...register('name', {
                    required: '영/한 2~20자 이내로 작성해주세요.',
                    pattern: {
                      value: /^[A-Za-z가-힣]{2,20}$/,
                      message: '이름은 필수 입력입니다.',
                    },
                  })}
                />
              </S.InputWrapper>
              <S.InputWrapper>
                <S.RegisterInput
                  id="phoneNumber"
                  type="text"
                  placeholder="전화번호"
                  className="half"
                  {...register('phoneNumber', {
                    required: '전화번호는 필수 입력입니다.',
                    pattern: {
                      value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
                      message: '휴대폰 번호(010-1234-5678)의 형태로 작성해주세요.',
                    },
                  })}
                />
                {errors.phoneNumber ? (
                  <S.Alert role="alert">{errors.phoneNumber.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.InputWrapper>
            </S.Section>
            <S.Section>
              <S.InputWrapper>
                <S.RegisterInput
                  id="startWork"
                  type="date"
                  placeholder="입사일"
                  className="half"
                  {...register('startWork', {
                    required: '입사일 필수 입력입니다.',
                    pattern: {
                      value: /^(?:(?:19|20)\d{2})-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|[12][0-9]|3[01])$/,
                      message: '입사일(2023-05-10)의 형태로 작성해주세요.',
                    },
                  })}
                />
                {errors.startWork ? (
                  <S.Alert role="alert">{errors.startWork.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.InputWrapper>
            </S.Section>
            <S.Section>
              <S.InputWrapper>
                <S.RegisterInput
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  className="half"
                  {...register('password', {
                    required: '비밀번호는 필수 입력입니다.',
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/,
                      message: '영문, 숫자, 특수문자를 각 1개 이상 사용하여 8~20자 이내로 작성해주세요.',
                    },
                    minLength: {
                      value: 8,
                      message: '최소 8자 입니다.',
                    },
                  })}
                />
                {errors.password ? (
                  <S.Alert role="alert">{errors.password.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.InputWrapper>
              <S.InputWrapper>
                <S.RegisterInput
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 확인"
                  className="half"
                  aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
                  {...register('passwordConfirm', {
                    required: '비밀번호는 필수 입력입니다.',
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/,
                      message: '영문, 숫자, 특수문자를 각 1개 이상 사용하여 8~20자 이내로 작성해주세요.',
                    },
                    minLength: {
                      value: 8,
                      message: '최소 8자 입니다.',
                    },
                    validate: {
                      check: (val) => {
                        if (getValues('password') !== val) {
                          return '비밀번호가 일치하지 않습니다.'
                        }
                      },
                    },
                  })}
                />
                {errors.passwordConfirm ? (
                  <S.Alert role="alert">{errors.passwordConfirm.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.InputWrapper>
            </S.Section>
            <S.RegisterButton type="submit" isValid={!isValid}>
              가입하기
            </S.RegisterButton>
            <S.LoginButton onClick={LoginButtonHandler}>로그인 페이지가기</S.LoginButton>
          </S.RegisterFormContainer>
        </S.RegisterWrapper>
      </S.RegisterContainer>
    </>
  )
}

export default RegisterForm
