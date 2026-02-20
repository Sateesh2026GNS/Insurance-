import { useNavigate } from 'react-router-dom'
import QuickServices from '../components/QuickServices'
import ServicesGrid from '../components/ServicesGrid'

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
    padding: '24px 16px',
    maxWidth: '420px',
    margin: '0 auto',
  },
}

export default function Services() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Quick Services</h1>
      </div>
      <div style={styles.content}>
        <QuickServices />
        <ServicesGrid />
      </div>
    </div>
  )
}
