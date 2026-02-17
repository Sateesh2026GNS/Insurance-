import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { claimsApi } from '../api/claims'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [claims, setClaims] = useState([])

  useEffect(() => {
    api
      .get('/users/me')
      .then((res) => setUser(res.data))
      .catch(() => navigate('/login'))
  }, [navigate])

  useEffect(() => {
    if (user) {
      claimsApi.stats().then(setStats).catch(() => setStats({ total: 0, PENDING: 0, APPROVED: 0, REJECTED: 0 }))
      claimsApi.list().then(setClaims).catch(() => setClaims([]))
    }
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>

  const policyValidity = user.policy_start_date && user.policy_end_date
    ? `${user.policy_start_date} to ${user.policy_end_date}`
    : 'N/A'

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
      <nav style={{ marginBottom: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/claims/health">Create Health Claim</Link>
        <Link to="/claims/life">Create Life Claim</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 24, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Policy Type</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{user.policy_type?.toUpperCase() || 'N/A'}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Policy Validity</div>
          <div style={{ fontSize: 14 }}>{policyValidity}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Total Claims</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{stats?.total ?? 0}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Pending</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#f59e0b' }}>{stats?.PENDING ?? 0}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Approved</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#22c55e' }}>{stats?.APPROVED ?? 0}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ fontSize: 14, color: '#666' }}>Rejected</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#ef4444' }}>{stats?.REJECTED ?? 0}</div>
        </div>
      </div>

      <h2 style={{ marginTop: 32 }}>My Claims</h2>
      {claims.length === 0 ? (
        <p>No claims yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: 8 }}>Claim ID</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Type</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Reviewer Comment</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{c.id}</td>
                <td style={{ padding: 8 }}>{c.claim_type} {c.claim_subtype ? `(${c.claim_subtype})` : ''}</td>
                <td style={{ padding: 8 }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: c.status === 'APPROVED' ? '#dcfce7' : c.status === 'REJECTED' ? '#fee2e2' : '#fef3c7',
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: 8 }}>{c.reviewer_comment || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
