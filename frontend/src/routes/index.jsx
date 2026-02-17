import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import OtpVerify from '../pages/OtpVerify'
import SetMpin from '../pages/SetMpin'
import HealthClaim from '../pages/HealthClaim'
import LifeClaim from '../pages/LifeClaim'

export const routes = [
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login/verify', element: <OtpVerify /> },
  { path: '/mpin', element: <SetMpin /> },
  { path: '/claims/health', element: <HealthClaim /> },
  { path: '/claims/life', element: <LifeClaim /> },
  { path: '/', element: <Login /> },
]
