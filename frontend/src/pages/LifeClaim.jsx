import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { claimsApi } from '../api/claims'

export default function LifeClaim() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    claim_subtype: 'death',
    claimant_name: '',
    bank_account: '',
    bank_ifsc: '',
  })
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('claim_subtype', form.claim_subtype)
      formData.append('claimant_name', form.claimant_name)
      if (form.bank_account) formData.append('bank_account', form.bank_account)
      if (form.bank_ifsc) formData.append('bank_ifsc', form.bank_ifsc)
      files.forEach((f) => formData.append('files', f))
      await claimsApi.createLife(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create claim')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { display: 'block', width: '100%', marginBottom: 10, padding: 8 }
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/dashboard">← Dashboard</Link>
      </nav>
      <h1>Create Life Claim</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>Claim Type</label>
        <select
          name="claim_subtype"
          value={form.claim_subtype}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="death">Death</option>
          <option value="maturity">Maturity</option>
        </select>
        <input
          name="claimant_name"
          placeholder="Claimant Name *"
          value={form.claimant_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="bank_account"
          placeholder="Bank Account Number"
          value={form.bank_account}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="bank_ifsc"
          placeholder="Bank IFSC Code"
          value={form.bank_ifsc}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={{ display: 'block', marginBottom: 8 }}>Upload Files (Death Certificate, ID Proof, Bank Passbook, Policy Document)</label>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Submitting...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  )
}
