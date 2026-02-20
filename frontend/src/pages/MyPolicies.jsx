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
    backgroundColor: '#FFD700',
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
    maxWidth: '250px',
    marginBottom: '24px',
  },
  textContainer: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  textLine1: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
  },
  textLine2: {
    fontSize: '14px',
    color: '#6B7280',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '280px',
  },
  addPolicyButton: {
    backgroundColor: '#FFD700',
    color: '#1F2937',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  buyPolicyButton: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

function FamilyShieldIllustration() {
  return (
    <svg viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Large Shield Background */}
      <path
        d="M125 40 L180 65 L180 120 Q180 165 125 195 Q70 165 70 120 L70 65 Z"
        fill="#FFD700"
        stroke="#1F2937"
        strokeWidth="3"
      />
      {/* Man (left) - holding baby */}
      <circle cx="95" cy="140" r="16" fill="#D4A574" />
      <ellipse cx="95" cy="170" rx="14" ry="20" fill="#374151" />
      {/* Baby in man's arms */}
      <circle cx="85" cy="130" r="10" fill="#D4A574" />
      <ellipse cx="85" cy="145" rx="8" ry="12" fill="#374151" />
      {/* Woman (center-right) - yellow shirt */}
      <circle cx="125" cy="135" r="15" fill="#D4A574" />
      <ellipse cx="125" cy="165" rx="12" ry="18" fill="#FFD700" />
      {/* Child (right) */}
      <circle cx="155" cy="140" r="11" fill="#D4A574" />
      <ellipse cx="155" cy="165" rx="9" ry="14" fill="#374151" />
      {/* Decorative dashed circles */}
      <circle cx="50" cy="85" r="3" fill="#1F2937" opacity="0.4" />
      <circle cx="200" cy="90" r="3" fill="#1F2937" opacity="0.4" />
      <circle cx="45" cy="125" r="3" fill="#1F2937" opacity="0.4" />
      <circle cx="205" cy="120" r="3" fill="#1F2937" opacity="0.4" />
      {/* Decorative diamond shapes */}
      <rect x="48" y="175" width="6" height="6" fill="#1F2937" opacity="0.25" transform="rotate(45 51 178)" />
      <rect x="196" y="180" width="6" height="6" fill="#1F2937" opacity="0.25" transform="rotate(45 199 183)" />
      {/* Dashed circles around shield */}
      <circle cx="125" cy="125" r="75" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.3" />
      <circle cx="125" cy="125" r="95" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.2" />
    </svg>
  )
}

export default function MyPolicies() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleAddPolicy = () => {
    navigate('/add-policy')
  }

  const handleBuyPolicy = () => {
    navigate('/buy-policy')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>My Policies</h1>
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
          <FamilyShieldIllustration />
        </div>
        <div style={styles.textContainer}>
          <div style={styles.textLine1}>Currently you have no policy.</div>
          <div style={styles.textLine2}>You can add existing policy or buy a new policy</div>
        </div>
        <div style={styles.buttonsContainer}>
          <button style={styles.addPolicyButton} onClick={handleAddPolicy}>
            <span>+</span>
            <span>Add Policy</span>
          </button>
          <button style={styles.buyPolicyButton} onClick={handleBuyPolicy}>
            Buy Policy
          </button>
        </div>
      </div>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
    </div>
  )
}
