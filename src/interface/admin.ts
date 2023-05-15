import { TeamResponse, UserResponse } from './user'

export interface AddTeamProps {
  teamInfo: TeamResponse[]
  refetch: () => {}
}

export interface AddTeamItemProps {
  team: TeamResponse
  refetch: () => {}
}

export interface UserInfoProps {
  userList: UserResponse[]
  teamList: string[]
  refetch: () => {}
}

export interface UserInfoItemProps {
  user: UserResponse
  team: string[]
  refetch: () => {}
}

export type Role = { [key: string]: string }
