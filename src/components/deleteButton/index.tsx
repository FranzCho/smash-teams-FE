import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getUser, withdrawal } from '../../apis/services/Auth'
import * as S from './style'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginResponseData, WithdrawalRequest, WithdrawalResponseData } from '../../apis/interface/Auth'
import { theme } from '../../styles/Theme'
import { useNavigate } from 'react-router-dom'
import { removeCookie } from '../../utils/cookies'

interface FormProps extends WithdrawalRequest {
  email: string
  password: string
}

const DeleteButton = () => {
  const { data: myUser } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)
  const userId = myUser?.data?.id
  const { register, handleSubmit } = useForm<FormProps>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 회원탈퇴
  const { mutate: deleteProfileMutation } = useMutation<WithdrawalResponseData, AxiosError, WithdrawalRequest>(
    withdrawal,
    {
      onSuccess: (data) => {
        Swal.fire({
          title: '회원탈퇴를 성공하였습니다.',
          text: '다음에 또 만나요.',
          icon: 'success',
          confirmButtonColor: `${theme.colors.blue}`,
        })
        removeCookie('accessToken')
        queryClient.clear()
        navigate('/login')
      },
      onError: (error) => {
        Swal.fire({
          title: '회원탈퇴를 실패하였습니다.',
          text: '다시 시도해주세요.',
          icon: 'error',
          confirmButtonColor: `${theme.colors.red}`,
        })
      },
    },
  )
  const MySwal = withReactContent(Swal)
  // 회원탈퇴 버튼 onClick
  const onSubmit: SubmitHandler<WithdrawalRequest> = (data) => {
    const { email, password } = data
    deleteProfileMutation({
      userId: userId,
      userData: {
        email,
        password,
      },
    })
  }

  return (
    <S.ModifyButton
      onClick={() => {
        MySwal.fire({
          title: '회원탈퇴 후 모든 정보가 삭제됩니다.',
          html: (
            <S.ButtonWrapper>
              <S.EmailInput
                id="email"
                className="swal2-input"
                placeholder="Email"
                type="email"
                {...register('email')}
              />
              <S.PasswordInput
                id="password"
                className="swal2-input"
                placeholder="Password"
                type="password"
                {...register('password')}
              />
            </S.ButtonWrapper>
          ),
          confirmButtonColor: `${theme.colors.blue}`,
          cancelButtonColor: `${theme.colors.red}`,
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: handleSubmit(onSubmit),
          allowOutsideClick: () => !MySwal.isLoading(),
        })
      }}
    >
      <S.Text>회원탈퇴</S.Text>
    </S.ModifyButton>
  )
}

export default DeleteButton
