import React from 'react'
import { UseMutateFunction, useQuery } from 'react-query'
import { User } from '../../apis/interface/Auth'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import * as S from './style'
import { useForm } from 'react-hook-form'

function ProfileForm() {
  // useForm
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, errors },
  } = useForm()

  // 내 정보조회 useQuery

  // 정보수정 useMutation

  // 수정하기 버튼 onSubmit

  // 회원탈퇴 

  // 날짜 포맷 변경 함수
  function formatDate(inputDate: string) {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <>
      <S.ProfileContainer>
        <S.ProfileWrapper>
          <S.ProfileLogoImage src="/public/title-logo.png" />
          <S.ProfileFormContainer>
            <S.Section>
              <S.ProfileInput id="email" type="email" placeholder="이메일" disabled />
              <S.DoubleCheckButton>중복확인</S.DoubleCheckButton>
            </S.Section>
            <S.Section>
              <S.ProfileInput id="name" type="text" placeholder="이름" className="half" disabled />
              <S.ProfileInput
                id="phoneNumber"
                type="text"
                placeholder="전화번호"
                className="half"
                {...register('phoneNumber', {
                  required: '전화번호는 필수입력입니다.',
                  pattern: {
                    value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
                    message: '휴대폰 번호(010-1234-5678)의 형태로 작성해주세요.',
                  },
                })}
              />
              {/* {errors.phoneNumber && <S.ErrorMessage role="alert">{errors.phoneNumber.message}</S.ErrorMessage>} */}
            </S.Section>
            <S.Section>
              <S.ProfileInput
                id="startWork"
                type="date"
                placeholder="입사일"
                className="half"
                {...register('startWork', {
                  required: '입사일 필수입력입니다.',
                  pattern: {
                    value: /^(?:(?:19|20)\d{2})-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|[12][0-9]|3[01])$/,
                    message: '입사일(2023-05-10)의 형태로 작성해주세요.',
                  },
                })}
              />
            </S.Section>
            <S.Section>
              <S.ProfileInput
                id="password"
                type="password"
                placeholder="비밀번호"
                className="half"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/,
                    message: '영문, 숫자, 특수문자를 각각 1개 이상 사용하여 8~20자 이내로 작성해주세요.',
                  },
                  minLength: {
                    value: 8,
                    message: '최소 8자 입니다.',
                  },
                })}
              />
              <S.ProfileInput
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                className="half"
                aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
                {...register('passwordConfirm', {
                  required: '비밀번호는 필수 입력입니다.',
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/,
                    message: '영문, 숫자, 특수문자를 각각 1개 이상 사용하여 8~20자 이내로 작성해주세요.',
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
            </S.Section>
            <S.ModifyButton type="submit">수정하기</S.ModifyButton>
            <S.ExitButton>회원탈퇴</S.ExitButton>
          </S.ProfileFormContainer>
        </S.ProfileWrapper>
      </S.ProfileContainer>
    </>
  )
}

export default ProfileForm
