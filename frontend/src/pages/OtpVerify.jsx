import { useEffect, useRef, useState } from 'react'
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
  title: { fontSize: 18, color: '#606770', textAlign: 'center', marginBottom: 8 },
  mobileLine: { textAlign: 'center', marginBottom: 18, color: '#3b3f45' },
  otpRow: { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 18 },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    border: '1px solid #d6d9de',
    textAlign: 'center',
    fontSize: 22,
  },
  footerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: '#5a6169' },
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
  buttonDisabled: { background: '#f0f0f0', color: '#999', cursor: 'not-allowed' },
  link: { color: '#2f80ed', cursor: 'pointer' },
}

export default function OtpVerify() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [seconds, setSeconds] = useState(30)
  const [devOtp, setDevOtp] = useState('')
  const inputsRef = useRef([])

  useEffect(() => {
    const m = localStorage.getItem('mobile') || ''
    if (!m) {
      navigate('/login')
      return
    }
    setMobile(m)
    inputsRef.current[0]?.focus()
    const lo = localStorage.getItem('lastOtp')
    if (lo) setDevOtp(lo)
  }, [navigate])

  useEffect(() => {
    setSeconds(30)
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(0, 1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    if (digit && index < 3) inputsRef.current[index + 1]?.focus()
  }

  const code = otp.join('')
  const isValid = code.length === 4

  const onVerify = async () => {
    if (!isValid) return
    try {
      const res = await api.post('/auth/login/verify', { mobile, otp: code }).then((r) => r.data)
      localStorage.setItem('token', res.access_token)
      navigate('/mpin')
    } catch (err) {
      alert(err.response?.data?.detail || 'Invalid or expired OTP')
    }
  }

  const resend = async () => {
    if (seconds > 0) return
    try {
      const r = await api.post('/auth/login/start', { mobile }).then((x) => x.data)
      if (r?.otp) {
        localStorage.setItem('lastOtp', String(r.otp))
        setDevOtp(String(r.otp))
      }
      setSeconds(30)
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to resend OTP')
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

      <p style={styles.title}>Enter the 4 digit OTP code to verify your</p>
      <p style={styles.mobileLine}>
        mobile number <strong>{mobile}</strong>{' '}
        <span style={styles.link} onClick={() => navigate('/login')}>✎</span>
      </p>

      <div style={styles.otpRow}>
        {otp.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            style={styles.box}
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>

      <div style={styles.footerRow}>
        <span style={styles.link} onClick={resend} aria-disabled={seconds > 0}>
          Resend OTP
        </span>
        <span>{`0:${seconds.toString().padStart(2, '0')} sec`}</span>
      </div>

      {devOtp && (
        <p style={{ textAlign: 'center', fontSize: 13, color: '#777', marginBottom: 12 }}>
          Dev hint: OTP is <strong>{devOtp}</strong>
        </p>
      )}

      <button
        style={{ ...styles.button, ...(isValid ? null : styles.buttonDisabled) }}
        disabled={!isValid}
        onClick={onVerify}
      >
        Verify
      </button>
    </div>
  )
}
