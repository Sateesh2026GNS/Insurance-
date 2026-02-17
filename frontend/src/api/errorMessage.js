/**
 * Turn FastAPI error response detail into a string (safe to render in React).
 * detail can be a string, an array of { msg, loc, ... }, or a single object.
 */
export function getErrorMessage(detail, fallback = 'Something went wrong') {
  if (detail == null) return fallback
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    return detail.map((d) => (d?.msg != null ? d.msg : JSON.stringify(d))).join('. ') || fallback
  }
  if (typeof detail === 'object' && detail?.msg != null) return detail.msg
  return fallback
}
