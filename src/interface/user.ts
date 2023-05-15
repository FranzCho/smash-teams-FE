export interface UserResponse {
  email: string
  name: string
  phoneNumber: string
  profileImage: string | undefined
  role: string
  startWork: string
  teamName: string
  userId: number
}

export interface TeamResponse {
  teamCount: number
  teamId: number
  teamName: string
}
