import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import OtpVerify from '../pages/OtpVerify'
import SetMpin from '../pages/SetMpin'
import MpinSuccess from '../pages/MpinSuccess'
import HealthClaim from '../pages/HealthClaim'
import LifeClaim from '../pages/LifeClaim'
import BuyPolicy from '../pages/BuyPolicy'
import AddPolicy from '../pages/AddPolicy'
import MyPolicies from '../pages/MyPolicies'
import Profile from '../pages/Profile'
import Notifications from '../pages/Notifications'
import Services from '../pages/Services'
import About from '../pages/About'
import Support from '../pages/Support'

export const routes = [
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login/verify', element: <OtpVerify /> },
  { path: '/mpin', element: <SetMpin /> },
  { path: '/mpin/success', element: <MpinSuccess /> },
  { path: '/claims/health', element: <HealthClaim /> },
  { path: '/claims/life', element: <LifeClaim /> },
  { path: '/buy-policy', element: <BuyPolicy /> },
  { path: '/add-policy', element: <AddPolicy /> },
  { path: '/my-policies', element: <MyPolicies /> },
  { path: '/profile', element: <Profile /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/services', element: <Services /> },
  { path: '/about', element: <About /> },
  { path: '/support', element: <Support /> },
  { path: '/', element: <Login /> },
]
