import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { notificationsApi } from '../api/notifications'
import ExploreProducts from '../components/ExploreProducts'
import QuickServices from '../components/QuickServices'
import ServicesGrid from '../components/ServicesGrid'
import SideMenu from '../components/SideMenu'

const DASHBOARD_BG_IMAGE = 'https://img.freepik.com/free-vector/insurance-services-concept-abstract-3d-sphere-globe-with-icons-hand_127544-1099.jpg?semt=ais_hybrid&w=740&q=80'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    backgroundColor: '#FFD700',
    padding: '20px 16px',
    position: 'relative',
    overflow: 'hidden',
  },
  headerPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  hamburgerMenu: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
  },
  hamburgerIcon: {
    width: '20px',
    height: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: '2px',
    backgroundColor: '#666',
    borderRadius: '1px',
  },
  welcomeText: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1F2937',
    flex: 1,
    marginLeft: '12px',
  },
  notificationBell: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#EF4444',
    border: '2px solid rgba(255, 255, 255, 0.9)',
  },
  bellIcon: {
    width: '20px',
    height: '20px',
  },
  content: {
    padding: '24px 16px',
    maxWidth: '420px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  policyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'visible',
    minHeight: '200px',
  },
  policyText: {
    fontSize: '16px',
    color: '#1F2937',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  policyTextBold: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '24px',
  },
  addPolicyButton: {
    width: '100%',
    maxWidth: '200px',
    padding: '14px 18px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: '#374151',
    color: '#FFD700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '16px',
  },
  plusIcon: {
    fontSize: '20px',
    fontWeight: 300,
  },
  illustrationContainer: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '140px',
    height: '140px',
    zIndex: 1,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
}

// Family illustration: man holding baby (left), woman (right), child (center), shield above, dashed circles and diamonds
function FamilyShieldIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Large Shield Background */}
      <path
        d="M100 30 L150 50 L150 100 Q150 140 100 170 Q50 140 50 100 L50 50 Z"
        fill="#FFD700"
        stroke="#1F2937"
        strokeWidth="2.5"
      />
      {/* Man (left) - holding baby */}
      <circle cx="75" cy="115" r="13" fill="#D4A574" />
      <ellipse cx="75" cy="138" rx="11" ry="16" fill="#374151" />
      {/* Baby in man's arms */}
      <circle cx="68" cy="108" r="8" fill="#D4A574" />
      <ellipse cx="68" cy="118" rx="6" ry="9" fill="#374151" />
      {/* Woman (center-right) - yellow shirt */}
      <circle cx="100" cy="112" r="12" fill="#D4A574" />
      <ellipse cx="100" cy="135" rx="10" ry="15" fill="#FFD700" />
      {/* Child (right) */}
      <circle cx="125" cy="115" r="9" fill="#D4A574" />
      <ellipse cx="125" cy="132" rx="7" ry="11" fill="#374151" />
      {/* Decorative dashed circles */}
      <circle cx="40" cy="70" r="2.5" fill="#1F2937" opacity="0.4" />
      <circle cx="160" cy="75" r="2.5" fill="#1F2937" opacity="0.4" />
      <circle cx="35" cy="105" r="2.5" fill="#1F2937" opacity="0.4" />
      <circle cx="165" cy="100" r="2.5" fill="#1F2937" opacity="0.4" />
      {/* Decorative diamond shapes */}
      <rect x="38" y="145" width="5" height="5" fill="#1F2937" opacity="0.25" transform="rotate(45 40.5 147.5)" />
      <rect x="157" y="150" width="5" height="5" fill="#1F2937" opacity="0.25" transform="rotate(45 159.5 152.5)" />
      {/* Dashed circles around shield */}
      <circle cx="100" cy="100" r="60" fill="none" stroke="#1F2937" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
      <circle cx="100" cy="100" r="75" fill="none" stroke="#1F2937" strokeWidth="1" strokeDasharray="4 3" opacity="0.2" />
    </svg>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [hasPolicy, setHasPolicy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    
    setLoading(true)
    setError(null)
    
    api
      .get('/users/me')
      .then((res) => {
        setUser(res.data)
        const policyExists = res.data.policy_number && res.data.policy_start_date && res.data.policy_end_date
        setHasPolicy(!!policyExists)
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err)
        setLoading(false)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        } else if (err.code === 'ERR_NETWORK' || !err.response) {
          // Network error or backend not available
          setError('Unable to connect to server. Please check if the backend is running.')
        } else {
          setError(err.response?.data?.detail || `Failed to load dashboard: ${err.message || 'Unknown error'}`)
        }
      })
  }, [navigate])

  useEffect(() => {
    if (user) {
      // Try to fetch notification count, but don't fail if endpoint doesn't exist
      try {
        if (notificationsApi && typeof notificationsApi.unreadCount === 'function') {
          notificationsApi
            .unreadCount()
            .then((res) => setUnreadCount(res?.unread_count || 0))
            .catch((err) => {
              console.error('Failed to fetch notification count:', err)
              setUnreadCount(0)
            })
        }
      } catch (err) {
        console.error('Notification API not available:', err)
        setUnreadCount(0)
      }
    }
  }, [user])

  const handleAddPolicy = () => {
    navigate('/add-policy')
  }

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleNotificationClick = () => {
    navigate('/notifications')
  }

  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '16px', color: '#666' }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('${DASHBOARD_BG_IMAGE}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: -1,
      }} />
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <div style={{ fontSize: '18px', color: '#EF4444', marginBottom: '12px', fontWeight: 600 }}>Error</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>{error}</div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setError(null)
                setLoading(true)
                api.get('/users/me')
                  .then((res) => {
                    setUser(res.data)
                    const policyExists = res.data.policy_number && res.data.policy_start_date && res.data.policy_end_date
                    setHasPolicy(!!policyExists)
                    setLoading(false)
                    setError(null)
                  })
                  .catch((err) => {
                    console.error('Failed to fetch user:', err)
                    setLoading(false)
                    if (err.response?.status === 401) {
                      localStorage.removeItem('token')
                      navigate('/login')
                    } else if (err.code === 'ERR_NETWORK' || !err.response) {
                      setError('Unable to connect to server. Please check if the backend is running.')
                    } else {
                      setError(err.response?.data?.detail || `Failed to load dashboard: ${err.message || 'Unknown error'}`)
                    }
                  })
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#374151',
                color: '#FFD700',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Retry
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #374151',
                backgroundColor: 'transparent',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }

  if (!user) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '16px', color: '#666' }}>No user data available</div>
      </div>
    )
  }

  return (
    <>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url('${DASHBOARD_BG_IMAGE}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      zIndex: -1,
    }} />
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerPattern}></div>
        <div style={styles.headerContent}>
          <button style={styles.hamburgerMenu} onClick={handleMenuClick}>
            <div style={styles.hamburgerIcon}>
              <div style={styles.hamburgerLine}></div>
              <div style={styles.hamburgerLine}></div>
              <div style={styles.hamburgerLine}></div>
            </div>
          </button>
          <div style={styles.welcomeText}>Welcome Back!</div>
          <button style={styles.notificationBell} onClick={handleNotificationClick}>
            {unreadCount > 0 && <div style={styles.notificationBadge}></div>}
            <svg style={styles.bellIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {!hasPolicy ? (
          <div style={styles.policyCard}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', minHeight: '160px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: '1', zIndex: 2, position: 'relative', paddingRight: '16px' }}>
                <div style={styles.policyText}>Currently you have</div>
                <div style={styles.policyTextBold}>no existing policy</div>
                <button style={styles.addPolicyButton} onClick={handleAddPolicy}>
                  <span style={styles.plusIcon}>+</span>
                  <span>Add Policy</span>
                </button>
              </div>
              <div style={styles.illustrationContainer}>
                <FamilyShieldIllustration />
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.policyCard}>
            <div style={styles.policyText}>Policy Number: {user.policy_number}</div>
            <div style={styles.policyText}>
              {user.policy_start_date} to {user.policy_end_date}
            </div>
          </div>
        )}
        
        {/* Explore Our Products Section */}
        <ExploreProducts />
        
        {/* Quick Services Section */}
        <QuickServices />
        
        {/* Services Grid Section */}
        <ServicesGrid />
      </div>
      
      {/* Side Menu */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
    </div>
    </>
  )
}
