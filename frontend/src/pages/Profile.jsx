import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
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
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
    position: 'relative',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#FFD700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #FFFFFF',
    cursor: 'pointer',
  },
  editProfileButton: {
    backgroundColor: '#F3F4F6',
    color: '#3B82F6',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fieldContainer: {
    marginBottom: '20px',
  },
  fieldLabel: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '8px',
    fontWeight: 500,
  },
  fieldValue: {
    fontSize: '16px',
    color: '#1F2937',
    paddingBottom: '8px',
    borderBottom: '1px solid #E5E7EB',
  },
  fieldInput: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    outline: 'none',
  },
  dateInputContainer: {
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#FF8C00',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '24px',
  },
}

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users/me')
      .then((res) => {
        setUser(res.data)
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          mobile: res.data.mobile || '',
          date_of_birth: res.data.date_of_birth || '',
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err)
        setLoading(false)
        if (err.response?.status === 401) {
          navigate('/login')
        }
      })
  }, [navigate])

  const [menuOpen, setMenuOpen] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = async () => {
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        date_of_birth: formData.date_of_birth || null,
      }
      const res = await api.patch('/users/me', updateData)
      setUser(res.data)
      setEditing(false)
    } catch (err) {
      console.error('Failed to update user:', err)
      alert('Failed to update profile. Please try again.')
    }
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Profile Screen</h1>
        <button style={styles.menuButton} onClick={() => setMenuOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 6H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 18H21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#9CA3AF" />
              <path d="M6 20 C6 16 8 14 12 14 C16 14 18 16 18 20" fill="#9CA3AF" />
            </svg>
          </div>
          {editing && (
            <div style={styles.cameraIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 4H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
          )}
          {!editing && (
            <button style={styles.editProfileButton} onClick={handleEdit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <div style={styles.fieldContainer}>
          <div style={styles.fieldLabel}>Full Name</div>
          {editing ? (
            <input
              type="text"
              style={styles.fieldInput}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Full Name"
            />
          ) : (
            <div style={styles.fieldValue}>{user?.name || '-'}</div>
          )}
        </div>

        <div style={styles.fieldContainer}>
          <div style={styles.fieldLabel}>Email-ID</div>
          {editing ? (
            <input
              type="email"
              style={styles.fieldInput}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email-ID"
            />
          ) : (
            <div style={styles.fieldValue}>{user?.email || '-'}</div>
          )}
        </div>

        <div style={styles.fieldContainer}>
          <div style={styles.fieldLabel}>Mobile Number</div>
          <div style={styles.fieldValue}>{user?.mobile || '-'}</div>
        </div>

        <div style={styles.fieldContainer}>
          <div style={styles.fieldLabel}>Date of birth</div>
          {editing ? (
            <div style={styles.dateInputContainer}>
              <input
                type="date"
                style={styles.fieldInput}
                value={formData.date_of_birth}
                onChange={(e) => handleChange('date_of_birth', e.target.value)}
                placeholder="Date of birth"
              />
              <div style={styles.dateIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#9CA3AF" strokeWidth="2" />
                </svg>
              </div>
            </div>
          ) : (
            <div style={styles.fieldValue}>{user?.date_of_birth || '-'}</div>
          )}
        </div>

        {editing && (
          <button style={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
    </div>
  )
}
