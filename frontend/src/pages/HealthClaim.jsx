import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { claimsApi } from '../api/claims'

export default function HealthClaim() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    hospital_name: '',
    admission_date: '',
    discharge_date: '',
    claim_amount: '',
    description: '',
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
      formData.append('hospital_name', form.hospital_name)
      formData.append('admission_date', form.admission_date)
      formData.append('discharge_date', form.discharge_date)
      formData.append('claim_amount', form.claim_amount)
      if (form.description) formData.append('description', form.description)
      files.forEach((f) => formData.append('files', f))
      await claimsApi.createHealth(formData)
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
      <h1>Create Health Claim</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="hospital_name"
          placeholder="Hospital Name *"
          value={form.hospital_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="admission_date"
          type="date"
          placeholder="Admission Date *"
          value={form.admission_date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="discharge_date"
          type="date"
          placeholder="Discharge Date *"
          value={form.discharge_date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="claim_amount"
          type="number"
          step="0.01"
          placeholder="Claim Amount *"
          value={form.claim_amount}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={inputStyle}
        />
        <label style={{ display: 'block', marginBottom: 8 }}>Upload Files (Hospital Bill, Reports, Prescriptions, Discharge Summary)</label>
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
