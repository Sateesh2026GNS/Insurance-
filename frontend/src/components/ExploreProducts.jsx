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
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
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
  productLabel: {
    fontSize: '12px',
    color: '#374151',
    textAlign: 'center',
    fontWeight: 500,
  },
}

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

export default function ExploreProducts() {
  const navigate = useNavigate()

  const products = [
    { id: 'car', label: 'Car Insurance', icon: <CarIcon /> },
    { id: 'bike', label: 'Bike Insurance', icon: <BikeIcon /> },
    { id: 'personal-accident', label: 'Personal Accident', icon: <PersonalAccidentIcon /> },
    { id: 'motor-legal-aid', label: 'Motor Legal Aid', icon: <MotorLegalAidIcon /> },
  ]

  const handleViewAll = (e) => {
    e.preventDefault()
    navigate('/buy-policy')
  }

  const handleProductClick = (productId) => {
    navigate(`/buy-policy?type=${productId}`)
  }

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Explore Our Products</h2>
        <a style={styles.viewAllLink} onClick={handleViewAll}>
          View All &gt;
        </a>
      </div>
      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            onClick={() => handleProductClick(product.id)}
          >
            <div style={styles.iconContainer}>
              {product.icon}
            </div>
            <div style={styles.productLabel}>{product.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
