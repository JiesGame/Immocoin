import Axios from 'axios';
import Cookies from 'js-cookie';

const API = Axios.create({ baseURL: 'http://127.0.0.1:3000' });

API.interceptors.request.use(({ headers, ...config }) => ({
    ...config,
    headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${headers.Authorization ||  Cookies.get('token')}`,
    },
}));

export default class APIManager {

  static async registerUser(email, password, password_confirmation) {
    try {
      const response = await API.post('/users', { "user": {email, password, password_confirmation} });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response);
      throw error;
    }
  }
}