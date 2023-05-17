import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Outlet, useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../utils/cookies'

function ProtectedRouter() {
  const queryClient = useQueryClient()
  const token = getCookie('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      queryClient.clear()
      navigate('/login')
      return
    }
  }, [token, navigate])

  return <Outlet />
}

export default ProtectedRouter
