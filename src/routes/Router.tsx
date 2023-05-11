import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import AdminPage from '../pages/adminPage'
import DayOffPage from '../pages/dayoffPage'
import HomePage from '../pages/homePage'
import ManagePage from '../pages/managePage'
import NightShiftPage from '../pages/nightshiftPage'
import ProfilePage from '../pages/profilePage'
import HistoryPage from '../pages/historyPage'
import SideBar from '../components/common/sidebar'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<SideBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path=":id" element={<AdminPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dayoff" element={<DayOffPage />} />
          <Route path="/nightshift" element={<DayOffPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
