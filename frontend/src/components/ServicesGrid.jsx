import { useNavigate } from 'react-router-dom'

const styles = {
  section: {
    marginTop: '24px',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #FFD700',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    minHeight: '140px',
  },
  serviceCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  serviceLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#374151',
    textAlign: 'center',
    lineHeight: '1.3',
  },
  illustration: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

function PolicyDocumentIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#374151" />
      <rect x="90" y="25" width="35" height="45" rx="2" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <rect x="93" y="28" width="29" height="4" fill="#1F2937" />
      <rect x="93" y="35" width="22" height="2" fill="#1F2937" />
      <rect x="93" y="40" width="25" height="2" fill="#1F2937" />
      <rect x="130" y="25" width="35" height="45" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="133" y="28" width="29" height="4" fill="#1F2937" />
      <rect x="133" y="35" width="22" height="2" fill="#1F2937" />
      <rect x="133" y="40" width="25" height="2" fill="#1F2937" />
    </svg>
  )
}

function PremiumCalculatorIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#374151" />
      <rect x="90" y="20" width="50" height="60" rx="4" fill="#9CA3AF" stroke="#1F2937" strokeWidth="2" />
      <rect x="95" y="30" width="40" height="8" rx="1" fill="#FFFFFF" />
      <rect x="95" y="42" width="40" height="8" rx="1" fill="#FFFFFF" />
      <rect x="95" y="54" width="40" height="8" rx="1" fill="#FFFFFF" />
      <circle cx="105" cy="66" r="4" fill="#FFD700" />
      <circle cx="120" cy="66" r="4" fill="#FFD700" />
      <circle cx="135" cy="66" r="4" fill="#FFD700" />
    </svg>
  )
}

function CashlessGaragesIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#374151" />
      <rect x="85" y="30" width="50" height="50" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="100" cy="50" r="3" fill="#1F2937" />
      <circle cx="120" cy="50" r="3" fill="#1F2937" />
      <circle cx="100" cy="65" r="3" fill="#1F2937" />
      <circle cx="120" cy="65" r="3" fill="#1F2937" />
      <circle cx="110" cy="40" r="8" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <circle cx="110" cy="40" r="4" fill="#1F2937" />
    </svg>
  )
}

function BlogsIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#374151" />
      <rect x="45" y="60" width="10" height="15" rx="1" fill="#FFD700" />
      <rect x="47" y="62" width="6" height="2" fill="#1F2937" />
      <rect x="47" y="66" width="4" height="2" fill="#1F2937" />
      <rect x="90" y="25" width="40" height="50" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="93" y="28" width="34" height="4" fill="#1F2937" />
      <rect x="93" y="35" width="26" height="2" fill="#1F2937" />
      <rect x="93" y="40" width="30" height="2" fill="#1F2937" />
      <path d="M130 30 L140 20 L150 30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClaimStatusIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#FFD700" />
      <rect x="90" y="25" width="35" height="45" rx="2" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <rect x="93" y="28" width="29" height="4" fill="#1F2937" />
      <rect x="93" y="35" width="22" height="2" fill="#1F2937" />
      <rect x="130" y="25" width="35" height="45" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="133" y="28" width="29" height="4" fill="#1F2937" />
      <rect x="133" y="35" width="22" height="2" fill="#1F2937" />
      <path d="M100 50 L120 50 L120 60 L100 60 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <circle cx="110" cy="55" r="3" fill="#1F2937" />
      <circle cx="110" cy="55" r="6" fill="none" stroke="#1F2937" strokeWidth="1" />
    </svg>
  )
}

function PreinspectionStatusIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="40" r="18" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="12" ry="16" fill="#FFD700" />
      <circle cx="100" cy="50" r="15" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <circle cx="100" cy="50" r="12" fill="#FFD700" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M95 50 L98 53 L105 46" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="130" cy="50" r="12" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <circle cx="130" cy="50" r="8" fill="#1F2937" />
      <circle cx="130" cy="50" r="4" fill="#FFFFFF" />
      <path d="M125 50 L128 50 L128 53 L125 53" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function ServicesGrid() {
  const navigate = useNavigate()

  const services = [
    { id: 'policy-document', label: 'Policy Document', illustration: <PolicyDocumentIllustration /> },
    { id: 'premium-calculator', label: 'Premium Calculator', illustration: <PremiumCalculatorIllustration /> },
    { id: 'cashless-garages', label: 'Cashless Garages', illustration: <CashlessGaragesIllustration /> },
    { id: 'blogs', label: 'Blogs', illustration: <BlogsIllustration /> },
    { id: 'claim-status', label: 'Claim Status', illustration: <ClaimStatusIllustration /> },
    { id: 'preinspection-status', label: 'Preinspection Status', illustration: <PreinspectionStatusIllustration /> },
  ]

  const handleServiceClick = (serviceId) => {
    console.log('Service clicked:', serviceId)
    // Add navigation logic here
  }

  return (
    <div style={styles.section}>
      <div style={styles.servicesGrid}>
        {services.map((service) => (
          <div
            key={service.id}
            style={styles.serviceCard}
            onClick={() => handleServiceClick(service.id)}
          >
            <div style={styles.illustration}>
              {service.illustration}
            </div>
            <div style={styles.serviceLabel}>{service.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
