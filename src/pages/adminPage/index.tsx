import { useParams } from 'react-router-dom'
import * as S from './style'
import { AiFillPlusCircle } from 'react-icons/ai'
import UserInfoContainer from '../../components/userInfo/userInfoContainer'
import { UserInfoItem } from '../../components/userInfo/userInfoItem/style'
import DropDown from '../../components/common/dropdown'
import { useEffect, useState } from 'react'
import AddTeamContainer from '../../components/addTeam/addTeamContainer'
import { useQuery } from 'react-query'
import { getAdmin } from '../../apis/services/Admin'
import { TeamResponse, UserResponse } from '../../interface/user'

// 관리자 유저 권한 설정 페이지
function AdminPage() {
  const [teamList, setTeamName] = useState(['전체보기'])
  const [teamInfo, setTeamInfo] = useState<TeamResponse[]>([])
  const [userList, setUserList] = useState<UserResponse[]>([])
  const [adminQueryData, setAdminQueryData] = useState({ teamName: '', keyword: '', page: 0 })
  const { data, isLoading, error, refetch } = useQuery(['admin'], () =>
    getAdmin(adminQueryData.teamName, adminQueryData.keyword, adminQueryData.page).then((a) => {
      return a.data
    }),
  )
  // 팀 리스트 및 유저 리스트 설정
  useEffect(() => {
    if (!isLoading) {
      setTeamInfo([])
      setTeamName(['전체보기'])
      setUserList([])
      // pages
      const pageNum = data.totalPages
      const pagesCopy = [...pages]
      pagesCopy.length = pageNum
      pagesCopy.fill(0)
      setPages(() => pagesCopy)

      // teamlist
      data.teamList.map((teamlist: TeamResponse) => {
        if (teamlist.teamName === 'admin' || teamlist.teamName === 'common') {
        } else {
          setTeamInfo((teamInfo) => [...teamInfo, teamlist])
          setTeamName((teamList) => [...teamList, teamlist.teamName])
        }
      })
      data.userList.map((userlist: UserResponse) => {
        if (userlist.role === 'ADMIN') {
        } else {
          setUserList((userList) => [...userList, userlist])
        }
      })
    }
  }, [data])

  const params = useParams()
  const [isAddTeam, setIsAddTeam] = useState(false)
  const [pages, setPages] = useState([1])

  const handleLinkClick = (list: string) => {
    if (list === '전체보기') {
      setAdminQueryData({ teamName: '', keyword: '', page: 0 })
    } else {
      setAdminQueryData({ teamName: `${list}`, keyword: '', page: 0 })
    }
  }
  const [isTeam, setIsTeam] = useState('전체보기')

  useEffect(() => {
    refetch()
  }, [adminQueryData])

  const [userSearchInput, setUserSearchInput] = useState('')
  return (
    <>
      <S.AdminWrapper
        onClick={() => {
          if (isAddTeam) {
            setIsAddTeam((isAddTeam) => !isAddTeam)
          }
        }}
      >
        <S.TeamBar>
          {teamList.map((list, key) => {
            return (
              <S.TopBarList
                key={key}
                click={isTeam === list ? 'true' : 'false'}
                onClick={() => {
                  handleLinkClick(list)
                  setIsTeam(list)
                }}
              >
                {list}
              </S.TopBarList>
            )
          })}
          <S.TopBarAddIcon
            onClick={() => {
              setIsAddTeam((isAddTeam) => !isAddTeam)
            }}
          >
            <AiFillPlusCircle size="20px" color="#AA2727" />
          </S.TopBarAddIcon>
        </S.TeamBar>
        <S.Admin>
          <S.AdminSearch>
            <input
              type="text"
              placeholder="검색할 이름을 입력해주세요."
              onChange={(e) => {
                setUserSearchInput(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setAdminQueryData({ ...adminQueryData, keyword: userSearchInput })
                }
              }}
            ></input>
            <button
              onClick={() => {
                setAdminQueryData({ ...adminQueryData, keyword: userSearchInput })
              }}
            >
              검색
            </button>
          </S.AdminSearch>
          <UserInfoContainer userList={userList} teamList={teamList} refetch={refetch} />
          <S.TotalPage>
            {pages.map((arr, i) => {
              const isPage = adminQueryData.page === i
              return (
                <S.PageButton
                  key={i}
                  isPage={isPage}
                  onClick={() => {
                    setAdminQueryData({ ...adminQueryData, page: i })
                  }}
                >
                  {i + 1}
                </S.PageButton>
              )
            })}
          </S.TotalPage>
        </S.Admin>
      </S.AdminWrapper>
      {isAddTeam ? <AddTeamContainer teamInfo={teamInfo} refetch={refetch} /> : <></>}
    </>
  )
}

export default AdminPage
