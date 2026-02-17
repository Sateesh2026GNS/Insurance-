export { api } from './client'
export const authApi = {
	loginStart: (mobile, consent_whatsapp = false) =>
		api.post('/auth/login/start', { mobile, consent_whatsapp }).then((r) => r.data),
	loginVerify: (mobile, otp) => api.post('/auth/login/verify', { mobile, otp }).then((r) => r.data),
}
