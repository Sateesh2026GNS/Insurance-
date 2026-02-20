import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

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
  section: {
    marginBottom: '24px',
  },
  sectionLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '12px',
  },
  policyTypeContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  policyTypeButton: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '20px',
    border: '2px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  policyTypeButtonActive: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    outline: 'none',
    marginBottom: '20px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  radioButton: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #D1D5DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FFD700',
  },
  radioButtonInner: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#FFD700',
  },
  radioLabel: {
    fontSize: '16px',
    color: '#374151',
    fontWeight: 500,
  },
  dateInputContainer: {
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#FFD700',
    color: '#1F2937',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '24px',
  },
}

export default function AddPolicy() {
  const navigate = useNavigate()
  const [policyType, setPolicyType] = useState('Motor')
  const [policyNumber, setPolicyNumber] = useState('')
  const [identificationType, setIdentificationType] = useState('registration')
  const [identificationValue, setIdentificationValue] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = async () => {
    if (!policyNumber.trim()) {
      alert('Please enter Policy Number')
      return
    }

    setLoading(true)
    try {
      const payload = {
        policy_number: policyNumber,
        policy_type: policyType.toLowerCase(),
      }

      if (policyType === 'Motor') {
        if (!identificationValue.trim()) {
          alert('Please enter identification details')
          setLoading(false)
          return
        }
        payload[identificationType] = identificationValue
      } else if (policyType === 'Non-Motor') {
        if (!mobileNumber.trim()) {
          alert('Please enter Mobile Number')
          setLoading(false)
          return
        }
        payload.mobile = mobileNumber
      } else if (policyType === 'Health') {
        if (!dateOfBirth.trim()) {
          alert('Please enter Date of Birth')
          setLoading(false)
          return
        }
        payload.date_of_birth = dateOfBirth
      }

      await api.post('/policies/link', payload)
      alert('Policy added successfully!')
      navigate('/my-policies')
    } catch (err) {
      console.error('Failed to add policy:', err)
      alert(err.response?.data?.detail || 'Failed to add policy. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>Add Policy</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.section}>
          <div style={styles.sectionLabel}>Policy Type</div>
          <div style={styles.policyTypeContainer}>
            {['Motor', 'Non-Motor', 'Health'].map((type) => (
              <button
                key={type}
                style={{
                  ...styles.policyTypeButton,
                  ...(policyType === type ? styles.policyTypeButtonActive : {}),
                }}
                onClick={() => {
                  setPolicyType(type)
                  setIdentificationValue('')
                  setMobileNumber('')
                  setDateOfBirth('')
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <input
            type="text"
            style={styles.inputField}
            placeholder="Policy Number"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
        </div>

        {policyType === 'Motor' && (
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Select any one from the below</div>
            <div style={styles.radioGroup}>
              {[
                { id: 'registration', label: 'Registration number', placeholder: 'Eg:TN01AA1111' },
                { id: 'engine', label: 'Engine / Motor number', placeholder: 'Enter engine number' },
                { id: 'chassis', label: 'Chassis number', placeholder: 'Enter chassis number' },
              ].map((option) => (
                <div key={option.id}>
                  <div
                    style={styles.radioOption}
                    onClick={() => setIdentificationType(option.id)}
                  >
                    <div
                      style={{
                        ...styles.radioButton,
                        ...(identificationType === option.id ? styles.radioButtonSelected : {}),
                      }}
                    >
                      {identificationType === option.id && <div style={styles.radioButtonInner} />}
                    </div>
                    <span style={styles.radioLabel}>{option.label}</span>
                  </div>
                  {identificationType === option.id && (
                    <input
                      type="text"
                      style={{ ...styles.inputField, marginTop: '8px', marginBottom: '0' }}
                      placeholder={option.placeholder}
                      value={identificationValue}
                      onChange={(e) => setIdentificationValue(e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {policyType === 'Non-Motor' && (
          <div style={styles.section}>
            <input
              type="tel"
              style={styles.inputField}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        )}

        {policyType === 'Health' && (
          <div style={styles.section}>
            <div style={styles.dateInputContainer}>
              <input
                type="date"
                style={styles.inputField}
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
          </div>
        )}

        <button
          style={styles.submitButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Policy'}
        </button>
      </div>
    </div>
  )
}
