import { rest } from 'msw'
import users from './users.json'
import loginInfo from './loginInfo.json'
import main from './main.json'
import mySchedule from './mySchedule.json'
import superSchedule from './superSchedule.json'
import adminUserList from './adminUserList.json'
import adminPermissions from './adminPermissions.json'
import teamList from './teamList.json'

// export const handlers = [
//   // 회원가입
//   rest.post('/join', async (req, res, ctx) => {
//     const newUser = await req.json()
//     users.push(newUser)

//     return res(ctx.status(200), ctx.json([...users, newUser]))
//   }),

//   // 로그인
//   rest.post('/login', async (req, res, ctx) => {
//     const { email, password } = await req.json()
//     const userEmail = loginInfo.find((user) => user.email === email)
//     const userPw = loginInfo.find((user) => user.password === password)

//     if (!userEmail) {
//       return res(ctx.status(400), ctx.json({ message: '가입되지 않은 회원입니다.' }))
//     }
//     if (!userPw) {
//       return res(ctx.status(400), ctx.json({ message: '비밀번호가 일치하지 않습니다.' }))
//     }

//     const user = users.find((user) => user.email === email)
//     return res(ctx.status(200), ctx.json(user))
//   }),

//   // 로그아웃 우선 형식상 넣어놓음..
//   rest.post('/logout', async (req, res, ctx) => {
//     const { refreshToken } = await req.json()
//     if (!refreshToken) {
//       return res(ctx.status(400), ctx.json({ message: '로그인이 되어있지 않습니다.' }))
//     }
//     return res(ctx.status(200), ctx.json({ message: '로그아웃 되었습니다.' }))
//   }),

//   // 이메일 중복 확인
//   rest.post('/check', async (req, res, ctx) => {
//     const { email } = await req.json()
//     const user = users.find((user) => user.email === email)
//     if (!user) {
//       return res(ctx.status(400), ctx.json({ message: '중복된 이메일입니다.' }))
//     }
//     return res(ctx.status(200), ctx.json({ message: '사용 가능한 이메일입니다.' }))
//   }),

//   // 유저 정보 조회
//   rest.get('/users', async (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(users))
//   }),

//   // 유저 정보 수정
//   rest.post('/users', async (req, res, ctx) => {
//     const { email, name, phoneNumber, startWork, profileImage } = await req.json()

//     const user = users.find((user) => user.email === email)
//     if (!user) {
//       return res(ctx.status(400), ctx.json({ message: '가입되지 않은 회원입니다.' }))
//     }

//     user.name = name
//     user.phoneNumber = phoneNumber
//     user.startWork = startWork
//     user.profileImage = profileImage

//     return res(ctx.status(200), ctx.json(user))
//   }),

//   // 유저 정보 삭제 우선 형식상 넣어놓음..
//   rest.post('/auth/user/id/delete', async (req, res, ctx) => {
//     const { email } = await req.json()

//     const user = users.find((user) => user.email === email)
//     if (!user) {
//       return res(ctx.status(400), ctx.json({ message: '가입되지 않은 회원입니다.' }))
//     }

//     const index = users.indexOf(user)
//     users.splice(index, 1)

//     return res(ctx.status(200), ctx.json(users))
//   }),

//   // 유저 정보 조회
//   rest.get('/users/:id', async (req, res, ctx) => {
//     const { id } = req.params
//     const user = users.find((user) => user.id === Number(id))
//     if (!user) {
//       return res(ctx.status(400), ctx.json({ message: '가입되지 않은 회원입니다.' }))
//     }
//     return res(ctx.status(200), ctx.json(user))
//   }),

//   // 메인페이지 조회
//   rest.get('/auth/user/main', async (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(main))
//   }),

//   // 유저 개인 스케줄 조회
//   rest.get('/auth/user/schedule', async (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(mySchedule))
//   }),

//   // 매니저 오너 스케줄 조회
//   rest.get('/auth/super/schedule', async (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(superSchedule))
//   }),

//   // 연차,반차,당직 신청
//   rest.post('/auth/user/:userId/approve', async (req, res, ctx) => {
//     const { userId } = req.params
//     const { email, startDate, endDate, type, reason } = await req.json()
//     const user = users.find((user) => user.userId === Number(userId))
//     if (!user) {
//       return res(ctx.status(400), ctx.json({ message: '가입되지 않은 회원입니다.' }))
//     }
//     const scheduleId = superSchedule.length + 1
//     const schedule = {
//       scheduleId,
//       email,
//       startDate,
//       endDate,
//       type,
//       reason,
//       status: 'FIRST',
//     }
//     mySchedule.push(schedule)
//     return res(ctx.status(200), ctx.json(schedule))
//   }),

//   // 관리자  승인, 거절
//   rest.post('/auth/super/schedule/order', async (req, res, ctx) => {
//     const { scheduleId, status } = await req.json()
//     const schedule = superSchedule.find((schedule) => schedule.scheduleId === scheduleId)
//     if (!schedule) {
//       return res(ctx.status(400), ctx.json({ message: '스케줄이 존재하지 않습니다.' }))
//     }
//     schedule.status = status
//     return res(ctx.status(200), ctx.json(schedule))
//   }),

//   // 관리자 권한설정페이지 전체보기
//   rest.get('/auth/admin/user', async (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(adminPermissions))
//   }),

// 유저 권한 검색 아직 완성되지 않음

// // 관리자 권한설정페이지 권한변경 //데이터 확실하지 않음
// rest.post('/auth/admin/user/update', async (req, res, ctx) => {
//   const { userId, teamName, role } = await req.json()
//   const user = adminUserList.find((user) => user.userId === userId)
//   if (!user) {
//     return res(ctx.status(400), ctx.json({ message: '유저가 존재하지 않습니다.' }))
//   }
//   user.role = role
//   user.teamName = teamName
//   return res(ctx.status(200), ctx.json(user))
// }),

// //  관리자 팀추가 //데이터 확실하지 않음
// rest.post('/auth/admin/team/add', async (req, res, ctx) => {
//   const { teamName } = await req.json()
//   const team = teamList.find((team) => team.teamName === teamName)
//   if (team) {
//     return res(ctx.status(400), ctx.json({ message: '이미 존재하는 팀입니다.' }))
//   }
//   teamList.push({
//     teamId: teamList.length + 1,
//     teamName,
//   })
//   return res(ctx.status(200), ctx.json(teamList))
// }),

// //  관리자 팀삭제 //데이터 확실하지 않음
// rest.post('/auth/admin/team/delete', async (req, res, ctx) => {
//   const { teamId } = await req.json()
//   const team = teamList.find((team) => team.teamId === teamId)
//   if (!team) {
//     return res(ctx.status(400), ctx.json({ message: '존재하지 않는 팀입니다.' }))
//   }
//   const index = teamList.indexOf(team)
//   teamList.splice(index, 1)
//   return res(ctx.status(200), ctx.json(teamList))
// }),
// ]
