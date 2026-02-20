import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

const styles = {
  container: {
    maxWidth: 420,
    margin: '40px auto',
    padding: '24px 20px',
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    color: '#222',
  },
  illustration: {
    height: 160,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #f4f6fb 0%, #ffffff 100%)',
    border: '1px solid #eef2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#606770', marginBottom: 12 },
  inputWrap: {
    border: '1px solid #d6d9de',
    borderRadius: 12,
    padding: '10px 12px',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    fontSize: 16,
    border: 'none',
    outline: 'none',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
    color: '#3b3f45',
    fontSize: 14,
  },
  terms: { fontSize: 13, color: '#5a6169', marginBottom: 18 },
  link: { color: '#2f80ed', textDecoration: 'none' },
  button: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 28,
    border: 'none',
    fontSize: 18,
    fontWeight: 600,
    background: '#f6b10a',
    color: '#121212',
    cursor: 'pointer',
  },
  buttonDisabled: {
    background: '#f0f0f0',
    color: '#999',
    cursor: 'not-allowed',
  },
}

export default function Login() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [consentWhatsApp, setConsentWhatsApp] = useState(false)

  const handleMobileChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    setMobile(onlyDigits.slice(0, 10))
  }

  const isValid = mobile.length === 10

  const handleContinue = async (e) => {
    e.preventDefault()
    if (!isValid) return
    try {
      const res = await api.post('/auth/login/start', { mobile, consent_whatsapp: consentWhatsApp }).then((r) => r.data)
      // Persist for next step
      localStorage.setItem('mobile', mobile)
      localStorage.setItem('whatsappConsent', consentWhatsApp ? '1' : '0')
      if (res?.otp) localStorage.setItem('lastOtp', String(res.otp))
      // Go to OTP verify screen
      navigate('/login/verify')
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to start login')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.illustration}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="4" y="2" width="12" height="20" rx="3" stroke="#c9ced6" strokeWidth="1.3" fill="#fff" />
          <circle cx="17.5" cy="6.5" r="2.8" fill="#f6b10a" />
          <path d="M7 6h6M7 9h6M7 12h6" stroke="#aab1bb" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>

      <h1 style={styles.title}>Welcome!</h1>
      <p style={styles.subtitle}>Enter your 10 digit mobile number</p>

      <div style={styles.inputWrap}>
        <input
          style={styles.input}
          value={mobile}
          onChange={handleMobileChange}
          placeholder="Mobile Number"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
        />
      </div>

      <label style={styles.checkboxRow}>
        <input type="checkbox" checked={consentWhatsApp} onChange={(e) => setConsentWhatsApp(e.target.checked)} />
        Allow us to send you messages on WhatsApp
      </label>

      <p style={styles.terms}>
        By clicking continue you agree to our{' '}
        <a href="#" style={styles.link}>Terms &amp; Conditions</a>
      </p>

      <button
        style={{ ...styles.button, ...(isValid ? null : styles.buttonDisabled) }}
        onClick={handleContinue}
        disabled={!isValid}
      >
        Continue
      </button>
    </div>
  )
}
