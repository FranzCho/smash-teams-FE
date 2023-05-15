import { Outlet } from 'react-router-dom'
import Navbar from '../navbar'
import Header from '../header'
import { ContensWrapper, LayoutWrapper, SideBar } from './style'
import ProfileBar from '../profilebar'

function Layout() {
  return (
    <LayoutWrapper>
      <Header />
      <ContensWrapper>
        <SideBar>
          <Navbar />
          <ProfileBar />
        </SideBar>
        <Outlet />
      </ContensWrapper>
    </LayoutWrapper>
  )
}

export default Layout
