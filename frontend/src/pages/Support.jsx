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
  hamburgerMenu: {
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
    textAlign: 'center',
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
  content: {
    padding: '24px 16px',
    maxWidth: '420px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '24px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  sectionIcon: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1F2937',
  },
  contactItem: {
    marginBottom: '12px',
  },
  contactLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '4px',
  },
  contactValue: {
    fontSize: '16px',
    color: '#3B82F6',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  addressText: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.6',
  },
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
      <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08C5.16 1.08 5.28 2.04 5.52 2.96C5.64 3.4 5.56 3.88 5.24 4.2L3.4 6.04C4.52 8.6 6.4 10.48 8.96 11.6L10.8 9.76C11.12 9.44 11.6 9.36 12.04 9.48C12.96 9.72 13.92 9.84 14.92 9.84C15.52 9.84 16 10.32 16 10.92V13.92C16 14.52 15.52 15 14.92 15Z" fill="#FFD700" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#FFD700" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#FFD700" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
      <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="none" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#FFD700" strokeWidth="2" />
      <path d="M12 2C15.31 2 18.23 3.39 20.35 5.51C20.75 5.91 21.09 6.35 21.38 6.81M12 22C8.69 22 5.77 20.61 3.65 18.49C3.25 18.09 2.91 17.65 2.62 17.19M2.62 6.81C2.91 6.35 3.25 5.91 3.65 5.51M21.38 17.19C21.09 17.65 20.75 18.09 20.35 18.49" stroke="#FFD700" strokeWidth="2" />
    </svg>
  )
}

export default function Support() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`
  }

  const handleWebsiteClick = (url) => {
    window.open(`https://${url}`, '_blank')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Support</h1>
        <button style={styles.hamburgerMenu} onClick={handleMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 6H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 18H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <PhoneIcon />
              <div style={styles.sectionTitle}>CALL US - TOLL FREE</div>
            </div>
            <div style={styles.contactItem}>
              <div style={styles.contactLabel}>POLICY HOLDERS</div>
              <div style={styles.contactValue} onClick={() => handlePhoneClick('180030030000')}>
                180030030000
              </div>
            </div>
            <div style={styles.contactItem}>
              <div style={styles.contactLabel}>OTHERS</div>
              <div style={styles.contactValue} onClick={() => handlePhoneClick('18001033009')}>
                18001033009
              </div>
            </div>
            <div style={styles.contactItem}>
              <div style={styles.contactLabel}>CLAIM INTIMATION</div>
              <div style={styles.contactValue} onClick={() => handlePhoneClick('180030030000')}>
                180030030000
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <LocationIcon />
              <div style={styles.sectionTitle}>ADDRESS</div>
            </div>
            <div style={styles.addressText}>
              Insurance Co. Ltd. (In partnership with Sanlam, South Africa) E-8, EPIP, RIICO Industrial Area, Sitapura Jaipur - 302022 (Raj.)
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <EnvelopeIcon />
              <div style={styles.sectionTitle}>EMAIL</div>
            </div>
            <div style={styles.contactValue} onClick={() => handleEmailClick('chd@insurance.com')}>
              chd@insurance.com
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <GlobeIcon />
              <div style={styles.sectionTitle}>WEBSITE</div>
            </div>
            <div style={styles.contactValue} onClick={() => handleWebsiteClick('www.insurance.com')}>
              www.insurance.com
            </div>
          </div>
        </div>
      </div>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
    </div>
  )
}
