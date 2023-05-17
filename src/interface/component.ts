export interface LoginInputProps {
  isValid: boolean
}

export interface ProfileImageProps {
  profileImage: FileList
}

export interface ProfileResponseData {
  data: {
    profileImage: string
  }
}

export interface EditProfileResponseData {
  status: number
  msg: string
}

export interface EditProfileFormProps {
  curPassword: string
  newPassword: string
  passwordConfirm: string
  phoneNumber: string
  startWork: string
}
