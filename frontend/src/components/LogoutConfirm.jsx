const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px 24px',
    maxWidth: '320px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  questionText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1F2937',
    textAlign: 'center',
  },
  illustration: {
    width: '100%',
    maxWidth: '200px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FFD700',
    color: '#1F2937',
    border: 'none',
    borderRadius: '24px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    border: '2px solid #374151',
    borderRadius: '24px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
}

function LogoutIllustration() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Person */}
      <ellipse cx="80" cy="75" rx="25" ry="30" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="80" cy="50" r="18" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <rect x="70" y="100" width="20" height="25" rx="2" fill="#374151" />
      <rect x="72" y="102" width="16" height="3" fill="#FFFFFF" />
      <rect x="72" y="107" width="12" height="2" fill="#FFFFFF" />
      
      {/* Mobile Device */}
      <rect x="120" y="40" width="50" height="70" rx="4" fill="#E5E7EB" stroke="#1F2937" strokeWidth="2" />
      <rect x="125" y="50" width="40" height="50" rx="2" fill="#FFFFFF" />
      <rect x="135" y="60" width="20" height="20" rx="2" fill="#FFD700" />
      <path d="M145 75 L150 80 L145 85" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="100" r="4" fill="#FFD700" opacity="0.6" />
      <circle cx="45" cy="110" r="3" fill="#FFD700" opacity="0.4" />
      <path d="M150 30 Q160 25 165 30" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <path d="M155 35 Q165 30 170 35" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    </svg>
  )
}

export default function LogoutConfirm({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.questionText}>Are you sure to logout?</div>
        <div style={styles.illustration}>
          <LogoutIllustration />
        </div>
        <div style={styles.buttonsContainer}>
          <button style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.logoutButton} onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
