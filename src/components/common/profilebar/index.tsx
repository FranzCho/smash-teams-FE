import { useMutation, useQuery } from 'react-query'
import * as S from './style'
import { ProfileUpdateRequest, getUser, profileUpdate } from '../../../apis/services/Auth'
import { AxiosError } from 'axios'
import { LoginResponseData } from '../../../apis/interface/Auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { theme } from '../../../styles/Theme'
interface ProfileImageProps {
  profileImage: FileList
}

interface ProfileResponseData {
  data: {
    profileImage: string
  }
}

function ProfileBar() {
  const { data: myUser, refetch } = useQuery<LoginResponseData, AxiosError>('myUser', getUser)

  const [imageSrc, setImageSrc] = useState<string>('')
  const { mutate } = useMutation<ProfileResponseData, AxiosError, ProfileUpdateRequest>(profileUpdate, {
    onSuccess: (data) => {
      setImageSrc(data.data.profileImage)
    },
  })

  console.log(myUser?.data?.profileImage)
  useEffect(() => {
    if (myUser?.data?.profileImage) {
      setImageSrc(myUser?.data?.profileImage)
    }
  }, [myUser])

  const { register, watch } = useForm<ProfileImageProps>()
  const avatar = watch('profileImage')
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
          if (myUser) {
            mutate({ userId: myUser.data?.id, profileImage: blob })
            refetch()
          }
        }
      })
    }
  }, [avatar])
  switch (myUser?.data?.role) {
    case 'CEO':
      myUser.data.role = '대표'
      break
    case 'MANAGER':
      myUser.data.role = '팀장'
      break
    case 'USER':
      myUser.data.role = '팀원'
      break
    default:
      break
  }
  if (myUser?.data?.teamName === 'common') {
    myUser.data.teamName = '무소속'
  }
  return (
    <>
      <S.ProfileWrapper>
        <S.TeamTitle>{myUser?.data?.teamName}</S.TeamTitle>
        <S.ImageWrapper>
          {
            <S.UploadButton htmlFor="profileImage">
              <S.ProfileImageWrapper>
                <S.ProfileImage src={imageSrc || '/noprofile.png'} alt="noprofile" />
              </S.ProfileImageWrapper>
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
          <S.Position>{myUser?.data?.role}</S.Position>
          <S.Name>{myUser?.data?.name}</S.Name>
        </S.NameWrapper>
        <S.EmailWrapper>{myUser?.data?.email}</S.EmailWrapper>
        <S.PhoneWrapper>{myUser?.data?.phoneNumber}</S.PhoneWrapper>
        <S.StartWork>{myUser?.data?.startWork}</S.StartWork>
        <S.EditButton>
          <S.EditTitle>개인정보수정</S.EditTitle>
        </S.EditButton>
      </S.ProfileWrapper>
    </>
  )
}

export default ProfileBar
