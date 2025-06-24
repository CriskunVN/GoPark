
import API from '@/lib/api';

export async function loginUser(email: string, password: string) {
  try {
    const res = await API.post('/users/login', { email, password });

    const token = res.data?.token;
    if (!token) return { error: 'No token received' };

    // Chỉ chạy khi ở browser
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }

    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Login failed' };
  }
}
