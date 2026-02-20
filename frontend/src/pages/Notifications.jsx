import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../components/SideMenu'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    backgroundColor: '#FFA500',
    padding: '20px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  menuButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
  },
  backButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1F2937',
    flex: 1,
  },
  content: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
  },
  illustration: {
    width: '100%',
    maxWidth: '300px',
    marginBottom: '24px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#6B7280',
    textAlign: 'center',
  },
}

function EmptyNotificationsIllustration() {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Left person with magnifying glass */}
      <circle cx="80" cy="60" r="20" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="80" cy="100" rx="15" ry="20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="70" cy="55" r="8" fill="#1F2937" />
      <circle cx="70" cy="55" r="12" fill="none" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="50" y="40" width="20" height="15" rx="1" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="52" y="42" width="16" height="2" fill="#1F2937" />
      <rect x="52" y="46" width="12" height="2" fill="#1F2937" />
      <rect x="52" y="50" width="14" height="2" fill="#1F2937" />
      <circle cx="60" cy="48" r="2" fill="#FFD700" />
      
      {/* Right person with document */}
      <circle cx="220" cy="70" r="18" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="220" cy="105" rx="14" ry="18" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <rect x="200" y="50" width="40" height="50" rx="2" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <rect x="203" y="53" width="34" height="4" fill="#1F2937" />
      <rect x="203" y="60" width="26" height="2" fill="#1F2937" />
      <rect x="203" y="65" width="30" height="2" fill="#1F2937" />
    </svg>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Notification</h1>
        <button style={styles.menuButton} onClick={() => setMenuOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 6H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 18H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.illustration}>
          <EmptyNotificationsIllustration />
        </div>
        <div style={styles.emptyText}>No new notifications</div>
      </div>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
    </div>
  )
}
