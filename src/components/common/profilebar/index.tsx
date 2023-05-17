import { useMutation, useQuery } from 'react-query'
import * as S from './style'
import { getUser, profileUpdate } from '../../../apis/services/Auth'
import { AxiosError } from 'axios'
import { LoginResponseData, ProfileUpdateRequest } from '../../../apis/interface/Auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { theme } from '../../../styles/Theme'
import { useNavigate } from 'react-router-dom'
import { TbPhone } from 'react-icons/tb'
import { HiOutlineMail } from 'react-icons/hi'
import { BsPersonVideo } from 'react-icons/bs'
import { ProfileImageProps, ProfileResponseData } from '../../../interface/component'

function ProfileBar() {
  const { data: myUser, refetch } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)
  const navigate = useNavigate()
  const [imageSrc, setImageSrc] = useState<string>('/noprofile.png')
  const { mutate } = useMutation<ProfileResponseData, AxiosError, ProfileUpdateRequest>(profileUpdate, {
    onSuccess: (data) => {
      setImageSrc(data.data.profileImage)
    },
  })
  useEffect(() => {
    if (myUser?.data?.profileImage) {
      setImageSrc(myUser?.data?.profileImage)
    }
  }, [myUser])

  const { register, watch } = useForm<ProfileImageProps>()
  const avatar = watch('profileImage')
  const userIdValue = myUser?.data?.id

  // 프로필 사진 변경
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      Swal.fire({
        title: '선택한 프로필로 변경하시겠습니까?',
        text: '확인을 누르시면 프로필이 변경됩니다.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: theme.colors.blue,
        cancelButtonColor: theme.colors.gray,
        confirmButtonText: '네, 변경할래요.',
        cancelButtonText: '아니요.',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '선택한 프로필로 변경되었습니다.',
            text: '프로필은 언제나 변경할 수 있습니다.',
            icon: 'success',
            confirmButtonColor: theme.colors.blue,
          })
          const file = avatar[0]
          const blob = new Blob([file], { type: file.type })
          setImageSrc(URL.createObjectURL(file))
          if (userIdValue) {
            mutate({
              userId: userIdValue,
              profileImage: blob,
            })
            refetch()
          }
        }
      })
    }
  }, [avatar])

  const onClickNavigate = () => {
    navigate('/profile')
  }

  let userRole
  switch (myUser?.data?.role) {
    case 'CEO':
      userRole = '대표'
      break
    case 'MANAGER':
      userRole = '팀장'
      break
    case 'USER':
      userRole = '팀원'
      break
    case 'ADMIN':
      userRole = '관리자'
    default:
      break
  }

  if (myUser?.data?.teamName === 'common') {
    myUser.data.teamName = '무소속'
  }

  return (
    <>
      <S.ProfileWrapper>
        <S.TeamTitle>{myUser?.data?.role === 'CEO' ? 'CEO' : myUser?.data?.teamName}</S.TeamTitle>
        <S.ImageWrapper>
          {
            <S.UploadButton htmlFor="profileImage">
              <S.ProfileImageWrapper>
                <S.ProfileImage src={imageSrc} alt="noprofile" />
              </S.ProfileImageWrapper>
              {imageSrc === '/noprofile.png' && <S.AddIcon src="/plus.gif" />}
            </S.UploadButton>
          }
          <S.ProfileInput
            {...register('profileImage')}
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
          ></S.ProfileInput>
        </S.ImageWrapper>
        <S.NameWrapper>
          <S.Position>{userRole}</S.Position>
          <S.Name>{myUser?.data?.name}</S.Name>
        </S.NameWrapper>
        <S.EmailWrapper>
          <HiOutlineMail /> {myUser?.data?.email}
        </S.EmailWrapper>
        <S.PhoneWrapper>
          <TbPhone /> {myUser?.data?.phoneNumber}
        </S.PhoneWrapper>
        <S.StartWork>
          <BsPersonVideo /> {myUser?.data?.startWork}
        </S.StartWork>
        <S.EditButton onClick={onClickNavigate}>
          <S.EditTitle>개인정보수정</S.EditTitle>
        </S.EditButton>
      </S.ProfileWrapper>
    </>
  )
}

export default ProfileBar
