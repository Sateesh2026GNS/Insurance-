import { useNavigate } from 'react-router-dom'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
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
    padding: '20px 16px',
    maxWidth: '420px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '16px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  optionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  optionCardHover: {
    backgroundColor: '#FFFEF0',
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    border: '2px solid #FFD700',
    backgroundColor: '#FFFEF0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
  },
  optionLabel: {
    fontSize: '11px',
    color: '#374151',
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: '1.3',
  },
}

// Icon components
function CarIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="8" y="20" width="44" height="24" rx="4" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="12" y="24" width="12" height="8" rx="1" fill="#1F2937" />
      <rect x="36" y="24" width="12" height="8" rx="1" fill="#1F2937" />
      <circle cx="18" cy="42" r="4" fill="#1F2937" />
      <circle cx="42" cy="42" r="4" fill="#1F2937" />
      <line x1="20" y1="20" x2="24" y2="16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="16" x2="44" y2="20" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BikeIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="18" cy="42" r="6" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="18" cy="42" r="3" fill="#1F2937" />
      <circle cx="42" cy="42" r="6" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="42" cy="42" r="3" fill="#1F2937" />
      <path d="M18 42 L30 20 L42 42" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <rect x="26" y="18" width="8" height="4" rx="1" fill="#1F2937" />
      <line x1="18" y1="42" x2="12" y2="36" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="42" x2="48" y2="36" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GoodsCarryingIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="8" y="20" width="44" height="28" rx="4" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="12" y="24" width="12" height="8" rx="1" fill="#1F2937" />
      <rect x="28" y="24" width="20" height="8" rx="1" fill="#1F2937" />
      <circle cx="18" cy="48" r="4" fill="#1F2937" />
      <circle cx="42" cy="48" r="4" fill="#1F2937" />
      <rect x="28" y="32" width="20" height="12" fill="#FFD700" stroke="#1F2937" strokeWidth="1" />
    </svg>
  )
}

function PassengerCarryingIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="8" y="18" width="44" height="30" rx="4" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="12" y="22" width="12" height="8" rx="1" fill="#1F2937" />
      <rect x="36" y="22" width="12" height="8" rx="1" fill="#1F2937" />
      <circle cx="18" cy="48" r="4" fill="#1F2937" />
      <circle cx="42" cy="48" r="4" fill="#1F2937" />
      <circle cx="30" cy="34" r="3" fill="#1F2937" />
      <rect x="26" y="38" width="8" height="8" rx="1" fill="#1F2937" />
    </svg>
  )
}

function MotorLegalAidIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="8" width="36" height="44" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="12" y="8" width="36" height="12" fill="#8B4513" />
      <circle cx="30" cy="42" r="6" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <path d="M24 42 L30 36 L36 42" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="48" x2="30" y2="52" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="50" x2="34" y2="50" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PersonalAccidentIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="30" cy="18" r="8" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="10" ry="14" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <path d="M20 28 L16 32 L20 36" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="34" r="2" fill="#1F2937" />
      <line x1="16" y1="34" x2="12" y2="38" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="38" x2="8" y2="40" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HomeInsuranceIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M30 8 L12 22 L12 48 L48 48 L48 22 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="2" strokeLinejoin="round" />
      <rect x="24" y="32" width="12" height="16" fill="#1F2937" />
      <rect x="26" y="34" width="8" height="6" fill="#FFD700" />
      <path d="M18 22 L30 14 L42 22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CriticalCareIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M30 12 L40 22 L40 38 L30 48 L20 38 L20 22 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 24 L34 28 L30 32 L26 28 Z" fill="#EF4444" />
      <circle cx="30" cy="28" r="2" fill="#EF4444" />
    </svg>
  )
}

function HospitalDailyCashIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="20" cy="35" rx="8" ry="12" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <path d="M20 23 L20 35 L28 35" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 12 L40 22 L40 38 L30 48 L20 38 L20 22 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function VectorCareIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="20" cy="35" rx="8" ry="12" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <path d="M20 30 L20 40" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 20 Q40 20 45 30 Q40 40 30 40 Q20 40 15 30 Q20 20 30 20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <line x1="30" y1="25" x2="30" y2="35" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function BuyPolicy() {
  const navigate = useNavigate()

  const motorInsurance = [
    { id: 'car', label: 'Car Insurance', icon: <CarIcon /> },
    { id: 'bike', label: 'Bike Insurance', icon: <BikeIcon /> },
    { id: 'goods-carrying', label: 'Goods Carrying', icon: <GoodsCarryingIcon /> },
    { id: 'passenger-carrying', label: 'Passenger Carrying', icon: <PassengerCarryingIcon /> },
    { id: 'motor-legal-aid', label: 'Motor legal Aid', icon: <MotorLegalAidIcon /> },
  ]

  const nonMotorInsurance = [
    { id: 'personal-accident', label: 'Personal Accident', icon: <PersonalAccidentIcon /> },
    { id: 'home', label: 'Home Insurance', icon: <HomeInsuranceIcon /> },
  ]

  const healthInsurance = [
    { id: 'critical-care', label: 'Critical Care', icon: <CriticalCareIcon /> },
    { id: 'hospital-daily-cash', label: 'Hospital Daily Cash', icon: <HospitalDailyCashIcon /> },
    { id: 'vector-care', label: 'Vector Care', icon: <VectorCareIcon /> },
  ]

  const handleBack = () => {
    navigate(-1)
  }

  const handleOptionClick = (optionId) => {
    // Navigate to policy purchase flow
    console.log('Selected option:', optionId)
    // You can add navigation logic here
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Buy Policy</h1>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Motor Insurance */}
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Motor Insurance</h2>
          <div style={styles.optionsGrid}>
            {motorInsurance.map((option) => (
              <div
                key={option.id}
                style={styles.optionCard}
                onClick={() => handleOptionClick(option.id)}
              >
                <div style={styles.iconContainer}>
                  {option.icon}
                </div>
                <div style={styles.optionLabel}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Motor Insurance */}
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Non-Motor Insurance</h2>
          <div style={styles.optionsGrid}>
            {nonMotorInsurance.map((option) => (
              <div
                key={option.id}
                style={styles.optionCard}
                onClick={() => handleOptionClick(option.id)}
              >
                <div style={styles.iconContainer}>
                  {option.icon}
                </div>
                <div style={styles.optionLabel}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Insurance */}
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Health Insurance</h2>
          <div style={styles.optionsGrid}>
            {healthInsurance.map((option) => (
              <div
                key={option.id}
                style={styles.optionCard}
                onClick={() => handleOptionClick(option.id)}
              >
                <div style={styles.iconContainer}>
                  {option.icon}
                </div>
                <div style={styles.optionLabel}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
