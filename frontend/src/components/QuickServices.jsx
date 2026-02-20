import { useNavigate } from 'react-router-dom'

const styles = {
  section: {
    marginTop: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F2937',
  },
  viewAllLink: {
    fontSize: '14px',
    color: '#3B82F6',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #FFD700',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  serviceCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  serviceLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    textAlign: 'center',
  },
  illustration: {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

function QuickRenewalIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="60" cy="60" r="25" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <rect x="45" y="70" width="30" height="30" rx="4" fill="#374151" />
      <rect x="48" y="73" width="24" height="18" rx="1" fill="#FFD700" />
      <rect x="52" y="78" width="16" height="2" fill="#1F2937" />
      <rect x="52" y="83" width="12" height="2" fill="#1F2937" />
      <path d="M85 50 L95 40 L105 50" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <rect x="90" y="35" width="20" height="25" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="93" y="38" width="14" height="3" fill="#1F2937" />
      <rect x="93" y="43" width="10" height="2" fill="#1F2937" />
      <rect x="93" y="47" width="12" height="2" fill="#1F2937" />
    </svg>
  )
}

function ClaimIntimationIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="60" cy="50" r="20" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="60" cy="75" rx="15" ry="20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="100" y="30" width="25" height="35" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="103" y="33" width="19" height="4" fill="#1F2937" />
      <rect x="103" y="39" width="15" height="2" fill="#1F2937" />
      <rect x="103" y="43" width="17" height="2" fill="#1F2937" />
      <rect x="130" y="30" width="25" height="35" rx="2" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
      <rect x="133" y="33" width="19" height="4" fill="#1F2937" />
      <rect x="133" y="39" width="15" height="2" fill="#1F2937" />
      <rect x="133" y="43" width="17" height="2" fill="#1F2937" />
      <rect x="160" y="30" width="25" height="35" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="163" y="33" width="19" height="4" fill="#1F2937" />
      <rect x="163" y="39" width="15" height="2" fill="#1F2937" />
      <rect x="163" y="43" width="17" height="2" fill="#1F2937" />
    </svg>
  )
}

function DownloadFormsIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="60" cy="50" r="20" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="60" cy="75" rx="15" ry="20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="50" y="65" width="20" height="25" rx="2" fill="#374151" />
      <rect x="52" y="67" width="16" height="3" fill="#FFD700" />
      <rect x="52" y="72" width="12" height="2" fill="#FFD700" />
      <rect x="52" y="76" width="14" height="2" fill="#FFD700" />
      <rect x="100" y="40" width="30" height="40" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="103" y="43" width="24" height="4" fill="#1F2937" />
      <rect x="103" y="49" width="18" height="2" fill="#1F2937" />
      <rect x="103" y="53" width="20" height="2" fill="#1F2937" />
      <path d="M130 50 L140 40 L150 50" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="140" y1="40" x2="140" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function UploadDocumentIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="60" cy="50" r="20" fill="#D4A574" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="60" cy="75" rx="15" ry="20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="50" y="65" width="20" height="25" rx="2" fill="#374151" />
      <rect x="52" y="67" width="16" height="3" fill="#FFD700" />
      <rect x="52" y="72" width="12" height="2" fill="#FFD700" />
      <rect x="52" y="76" width="14" height="2" fill="#FFD700" />
      <ellipse cx="120" cy="50" rx="25" ry="20" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <path d="M110 50 L120 40 L130 50" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="120" y1="40" x2="120" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <rect x="150" y="40" width="30" height="35" rx="2" fill="#FFD700" stroke="#1F2937" strokeWidth="2" />
      <rect x="153" y="43" width="24" height="3" fill="#1F2937" />
      <rect x="153" y="48" width="18" height="2" fill="#1F2937" />
      <rect x="153" y="52" width="20" height="2" fill="#1F2937" />
    </svg>
  )
}

export default function QuickServices() {
  const navigate = useNavigate()

  const services = [
    { id: 'quick-renewal', label: 'Quick Renewal', illustration: <QuickRenewalIllustration /> },
    { id: 'claim-intimation', label: 'Claim Intimation', illustration: <ClaimIntimationIllustration /> },
    { id: 'download-forms', label: 'Download Forms', illustration: <DownloadFormsIllustration /> },
    { id: 'upload-document', label: 'Upload Document', illustration: <UploadDocumentIllustration /> },
  ]

  const handleViewAll = (e) => {
    e.preventDefault()
    navigate('/services')
  }

  const handleServiceClick = (serviceId) => {
    console.log('Service clicked:', serviceId)
    // Add navigation logic here
  }

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quick Services</h2>
        <a style={styles.viewAllLink} onClick={handleViewAll}>
          View All &gt;
        </a>
      </div>
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
