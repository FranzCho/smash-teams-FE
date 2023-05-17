import { useQuery } from 'react-query'
import { EditProfileHookFormProps, EditProfileRequest, LoginResponseData } from '../../apis/interface/Auth'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import * as S from './style'
import { useForm } from 'react-hook-form'
import { editProfile, getUser } from '../../apis/services/Auth'
import Swal from 'sweetalert2'
import { theme } from '../../styles/Theme'
import DeleteButton from '../deleteButton'
import { EditProfileFormProps, EditProfileResponseData } from '../../interface/component'

function ProfileForm() {
  // 내 정보조회 useQuery
  const { data: myUser, refetch } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  // useForm
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, errors },
  } = useForm<EditProfileHookFormProps>({
    defaultValues: {
      newPassword: '',
      phoneNumber: myUser?.data?.phoneNumber,
      startWork: myUser?.data?.startWork,
    },
  })

  // 정보수정 useMutation
  const { mutate: editProfileMutation } = useMutation<EditProfileResponseData, AxiosError, EditProfileRequest>(
    editProfile,
    {
      onSuccess: (data) => {
        refetch()
        Swal.fire({
          title: '정보수정이 완료되었습니다.',
          text: '프로필을 확인해주세요.',
          icon: 'success',
          confirmButtonColor: `${theme.colors.blue}`,
        })
      },
      onError: (error) => {
        Swal.fire({
          title: '정보수정을 실패하였습니다.',
          text: '다시 시도해주세요.',
          icon: 'error',
          confirmButtonColor: `${theme.colors.red}`,
        })
      },
    },
  )

  // 회원탈퇴 

  // 날짜 포맷 변경 함수
  function formatDate(inputDate: string) {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 수정하기 버튼 onSubmit
  const onSubmit = (data: EditProfileFormProps) => {
    const { curPassword, newPassword, phoneNumber, startWork } = data
    editProfileMutation({
      userId: myUser?.data?.id,
      userData: {
        curPassword,
        newPassword,
        phoneNumber,
        startWork: formatDate(startWork),
      },
    })
  }

  return (
    <>
      <S.ProfileContainer>
        <S.ProfileWrapper>
          <S.ProfileLogoImage src="/title-logo.png" />
          <S.ProfileFormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Section>
              <S.ProfileInput id="email" type="email" placeholder="이메일" value={myUser?.data?.email} disabled />
              <S.DoubleCheckButton>중복확인</S.DoubleCheckButton>
            </S.Section>
            <S.Section>
              <S.ProfileInput
                id="name"
                type="text"
                placeholder="이름"
                className="half"
                value={myUser?.data?.name}
                disabled
              />
            </S.Section>
            <S.Section>
              <S.InputWrapper>
                <S.ProfileInput
                  id="phoneNumber"
                  type="text"
                  placeholder="전화번호"
                  className="half"
                  aria-invalid={!isDirty ? undefined : errors.phoneNumber ? 'true' : 'false'}
                  {...register('phoneNumber', {
                    required: '전화번호는 필수입력입니다.',
                    pattern: {
                      value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
                      message: '휴대폰 번호(010-1234-5678)의 형태로 작성해주세요.',
                    },
                  })}
                />
              </S.InputWrapper>
              <S.InputWrapper>
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
              </S.InputWrapper>
            </S.Section>
            <S.Section>
              <S.PassWordInputWrapper>
                <S.ProfileInput
                  id="curPassword"
                  type="password"
                  placeholder="현재 비밀번호"
                  className="half"
                  {...register('curPassword', {
                    required: '현재 비밀번호는 필수 입력입니다.',
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
                {errors.curPassword ? (
                  <S.Alert role="alert">{errors.curPassword.message}</S.Alert>
                ) : (
                  <S.Alert role="alert"></S.Alert>
                )}
              </S.PassWordInputWrapper>
            </S.Section>
            <S.Section>
              <S.InputWrapper>
                <S.ProfileInput
                  id="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  className="half"
                  {...register('newPassword', {
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
              </S.InputWrapper>
              <S.InputWrapper>
                <S.ProfileInput
                  id="passwordConfirm"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  className="half"
                  aria-invalid={!isDirty ? undefined : errors.passwordConfirm ? 'true' : 'false'}
                  {...register('passwordConfirm', {
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
                        if (getValues('newPassword') !== val) {
                          return '비밀번호가 일치하지 않습니다.'
                        }
                      },
                    },
                  })}
                />
              </S.InputWrapper>
            </S.Section>
            <S.ModifyButton type="submit">수정하기</S.ModifyButton>
          </S.ProfileFormContainer>
          <DeleteButton />
        </S.ProfileWrapper>
      </S.ProfileContainer>
    </>
  )
}

export default ProfileForm
