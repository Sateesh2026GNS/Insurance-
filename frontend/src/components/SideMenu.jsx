import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/client'
import LogoutConfirm from './LogoutConfirm'

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    backgroundColor: '#FFD700',
    padding: '24px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  headerPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
    pointerEvents: 'none',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1,
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1,
  },
  viewProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#1F2937',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  menuList: {
    flex: 1,
    padding: '16px 0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderBottom: '1px solid #F3F4F6',
  },
  menuItemHover: {
    backgroundColor: '#FFFEF0',
  },
  menuIcon: {
    width: '24px',
    height: '24px',
    marginRight: '16px',
    flexShrink: 0,
  },
  menuText: {
    fontSize: '16px',
    color: '#374151',
    fontWeight: 500,
    flex: 1,
  },
  menuArrow: {
    fontSize: '18px',
    color: '#9CA3AF',
  },
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <circle cx="12" cy="8" r="4" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M6 20 C6 16 8 14 12 14 C16 14 18 16 18 20" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
    </svg>
  )
}

function MyPolicyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <path d="M6 4 L18 4 L18 20 L6 20 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="#1F2937" />
      <path d="M9 12 L11 14 L15 10" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BuyPolicyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <path d="M12 4 L20 8 L20 16 L12 20 L4 16 L4 8 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M12 8 L12 16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12 L16 12" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function QuickServicesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <ellipse cx="12" cy="18" rx="8" ry="4" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M12 8 L12 18" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
    </svg>
  )
}

function ChangeMpinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <circle cx="12" cy="12" r="8" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M12 8 L12 12 L15 15" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#1F2937" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <path d="M3 9L12 2L21 9V20C21 20.53 20.79 21.04 20.41 21.41C20.04 21.79 19.53 22 19 22H5C4.47 22 3.96 21.79 3.59 21.41C3.21 21.04 3 20.53 3 20V9Z" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M9 22V12H15V22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AboutUsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <rect x="4" y="6" width="16" height="12" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="6" y="8" width="12" height="2" fill="#1F2937" />
      <rect x="6" y="12" width="8" height="2" fill="#1F2937" />
      <rect x="6" y="16" width="10" height="2" fill="#1F2937" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <circle cx="12" cy="12" r="8" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M12 8 C10.34 8 9 9.34 9 11 C9 12.66 10.34 14 12 14" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#1F2937" />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.menuIcon}>
      <circle cx="12" cy="12" r="8" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M8 12 L16 12" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 8 L18 12 L14 16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SideMenu({ isOpen, onClose, onLogout }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (isOpen) {
      api.get('/users/me')
        .then((res) => setUser(res.data))
        .catch((err) => console.error('Failed to fetch user:', err))
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleViewProfile = () => {
    onClose()
    navigate('/profile')
  }

  const handleMenuItemClick = (path) => {
    onClose()
    navigate(path)
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false)
    onClose()
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'profile', label: 'View Profile', icon: <ProfileIcon />, path: '/profile', action: handleViewProfile },
    { id: 'my-policy', label: 'My Policy', icon: <MyPolicyIcon />, path: '/my-policies' },
    { id: 'buy-policy', label: 'Buy Policy', icon: <BuyPolicyIcon />, path: '/buy-policy' },
    { id: 'quick-services', label: 'Quick Services', icon: <QuickServicesIcon />, path: '/services' },
    { id: 'change-mpin', label: 'Change MPIN', icon: <ChangeMpinIcon />, path: '/mpin' },
    { id: 'about-us', label: 'About Us', icon: <AboutUsIcon />, path: '/about' },
    { id: 'support', label: 'Support', icon: <SupportIcon />, path: '/support' },
    { id: 'logout', label: 'LogOut', icon: <LogOutIcon />, action: handleLogoutClick },
  ]

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.drawer}>
        <div style={styles.header}>
          <div style={styles.headerPattern}></div>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#9CA3AF" />
                <path d="M6 20 C6 16 8 14 12 14 C16 14 18 16 18 20" fill="#9CA3AF" />
              </svg>
            </div>
          </div>
          <div style={styles.userName}>{user?.name?.toUpperCase() || 'USER'}</div>
          <button style={styles.viewProfileButton} onClick={handleViewProfile}>
            View Profile
          </button>
        </div>
        <div style={styles.menuList}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={styles.menuItem}
              onClick={item.action || (() => handleMenuItemClick(item.path))}
            >
              {item.icon}
              <span style={styles.menuText}>{item.label}</span>
              <span style={styles.menuArrow}>&gt;</span>
            </div>
          ))}
        </div>
      </div>
      <LogoutConfirm
        isOpen={showLogoutConfirm}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}
