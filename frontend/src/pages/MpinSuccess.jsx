import { useNavigate } from 'react-router-dom'

const BLUE = '#2563EB'
const YELLOW = '#FFD700'
const ORANGE_BUTTON = '#F59E0B'
const DARK = '#1F2937'
const SKIN = '#D4A574'
const WHITE = '#FFFFFF'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
  },
  illustration: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: BLUE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    position: 'relative',
  },
  illustrationInner: {
    width: '120px',
    height: '120px',
  },
  congratulations: {
    fontSize: '24px',
    fontWeight: 700,
    color: DARK,
    textAlign: 'center',
    marginBottom: '12px',
  },
  message: {
    fontSize: '16px',
    fontWeight: 400,
    color: DARK,
    textAlign: 'center',
    marginBottom: '48px',
    lineHeight: 1.5,
  },
  continueButton: {
    width: '100%',
    maxWidth: '280px',
    padding: '18px 32px',
    borderRadius: '28px',
    border: 'none',
    backgroundColor: ORANGE_BUTTON,
    color: WHITE,
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}

// Person with yellow top, arms raised, white checkmark on chest, white crown
function SuccessIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Crown - white */}
      <path d="M38 22 L50 12 L62 22 L62 28 L38 28 Z" fill={WHITE} stroke={DARK} strokeWidth="1" />
      <rect x="44" y="18" width="12" height="10" fill={WHITE} />
      {/* Head */}
      <circle cx="50" cy="40" r="15" fill={SKIN} stroke={DARK} strokeWidth="1.2" />
      {/* Body - yellow top */}
      <path d="M32 55 L32 78 L68 78 L68 55 Q68 48 50 48 Q32 48 32 55" fill={YELLOW} stroke={DARK} strokeWidth="1.2" />
      {/* Arms raised - celebratory pose */}
      <path d="M22 48 Q18 42 15 48 Q18 54 22 48" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M78 48 Q82 42 85 48 Q82 54 78 48" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Hands open */}
      <circle cx="18" cy="50" r="5" fill={SKIN} />
      <circle cx="82" cy="50" r="5" fill={SKIN} />
      {/* Checkmark on chest - white with dark outline */}
      <path d="M40 66 L46 72 L60 58" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 66 L46 72 L60 58" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MpinSuccess() {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/dashboard')
  }

  return (
    <div style={styles.container}>
      <div style={styles.illustration}>
        <div style={styles.illustrationInner}>
          <SuccessIllustration />
        </div>
      </div>
      <h1 style={styles.congratulations}>Congratulations</h1>
      <p style={styles.message}>Your MPIN has been successfully setup.</p>
      <button style={styles.continueButton} onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}
