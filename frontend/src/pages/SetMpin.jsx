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
  heading: { fontSize: 20, fontWeight: 700, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#606770', textAlign: 'center', marginBottom: 14 },
  row: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  eye: { width: 24, height: 24, color: '#8a8f98' },
  boxes: { display: 'flex', gap: 12 },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    border: '1px solid #d6d9de',
    textAlign: 'center',
    fontSize: 22,
  },
  labelRight: { marginLeft: 'auto', color: '#2a6f3b', fontWeight: 600 },
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
}

function Eye({ onClick }) {
  return (
    <svg onClick={onClick} style={styles.eye} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="button">
      <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Z" stroke="#8a8f98" strokeWidth="1.3"/>
      <circle cx="12" cy="12" r="3" stroke="#8a8f98" strokeWidth="1.3"/>
    </svg>
  )
}

export default function SetMpin() {
  const navigate = useNavigate()
  const [mpin, setMpin] = useState(['', '', '', ''])
  const [confirm, setConfirm] = useState(['', '', '', ''])
  const [show, setShow] = useState(false)
  const inputsA = useRef([])
  const inputsB = useRef([])

  useEffect(() => { inputsA.current[0]?.focus() }, [])

  const handleRowChange = (arr, setArr, ref, idx, val) => {
    const digit = val.replace(/\D/g, '').slice(0, 1)
    const next = [...arr]
    next[idx] = digit
    setArr(next)
    if (digit && idx < 3) ref.current[idx + 1]?.focus()
  }

  const valA = mpin.join('')
  const valB = confirm.join('')
  const valid = valA.length === 4 && valB.length === 4 && valA === valB

  const onSubmit = async () => {
    if (!valid) return
    try {
      await api.post('/auth/mpin/set', { mpin: valA, confirm_mpin: valB })
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to set MPIN')
    }
  }

  const renderBoxes = (arr, setArr, ref) => (
    <div style={styles.boxes}>
      {arr.map((d, i) => (
        <input
          key={i}
          ref={(el) => (ref.current[i] = el)}
          style={styles.box}
          inputMode="numeric"
          maxLength={1}
          value={show ? d : d ? '•' : ''}
          onChange={(e) => handleRowChange(arr, setArr, ref, i, e.target.value)}
        />
      ))}
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.illustration}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="4" y="2" width="12" height="20" rx="3" stroke="#c9ced6" strokeWidth="1.3" fill="#fff" />
          <circle cx="17.5" cy="6.5" r="2.8" fill="#f6b10a" />
          <path d="M7 6h6M7 9h6M7 12h6" stroke="#aab1bb" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>
      <h2 style={styles.heading}>Setup MPIN</h2>
      <p style={styles.subtitle}>Enter your 4 digit MPIN</p>

      <div style={styles.row}>
        <Eye onClick={() => setShow((s) => !s)} />
        {renderBoxes(mpin, setMpin, inputsA)}
        <span style={styles.labelRight}>Enter MPIN</span>
      </div>

      <div style={styles.row}>
        <Eye onClick={() => setShow((s) => !s)} />
        {renderBoxes(confirm, setConfirm, inputsB)}
        <span style={styles.labelRight}>Confirm MPIN</span>
      </div>

      <button
        style={{ ...styles.button, ...(valid ? null : styles.buttonDisabled) }}
        disabled={!valid}
        onClick={onSubmit}
      >
        Set MPIN
      </button>
    </div>
  )
}
