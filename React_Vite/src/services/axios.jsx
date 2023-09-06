import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://127.0.0.1:3000';

export const registerFetch = async (data) => {
  const fetchURL = `${baseURL}/users`
  const fetchBody = {
    "user": {
      "email" : data.email,
      "password": data.password,
      "password_confirmation": data.password_confirmation
    }
  }
  return axios.post(
    fetchURL, fetchBody
  )
  .then(response => {
    console.log('Response data:', response.data);
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}

export const loginFetch = async (data, setUserInfo) => {
  const fetchURL = `${baseURL}/users/sign_in`
  const fetchBody = {
    "user": {
      "email" : data.email,
      "password": data.password,
    }
  }
  return axios.post(
    fetchURL, fetchBody
  )
  .then(response => {
    console.log('Response data:', response.data);
    Cookies.set('token',response.headers.get('Authorization').split(" ")[1], { expires: 7 });
    Cookies.set('userInfo', JSON.stringify({"id":response.data.user.id, "email":response.data.user.email}), { expires: 7 });
    setUserInfo({"id":response.data.user.id, "email":response.data.user.email, "token":Cookies.get('token')});
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}

export const forgotPasswordFetch = async (data) => {
  const fetchURL = `${baseURL}/password/forgot`
  const fetchBody = {
    "email": data.email,
  }
  return axios.post(
    fetchURL, fetchBody
  )
  .then(response => {
    console.log('Response data:', response.data);
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}

export const resetPasswordFetch = async (data, token) => {
  const fetchURL = `${baseURL}/password/reset/${token}`
  const fetchBody = {
    "password": data.password,
  }
  return axios.put(    
    fetchURL, fetchBody
  )
  .then(response => {
    console.log('Response data:', response.data);
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}

export const changeProfileFetch = async (data, token, userID, setUserInfo) => {
  const fetchURL = `${baseURL}/users/${userID}`
  const fetchBody = {
    "user": {
      "email": data.email,
      "password": data.password,
      "current_password": data.current_password,
    },
  }
  return axios.put(
      fetchURL, fetchBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  .then(response => {
    console.log('Response data:', response.data);
    Cookies.set("userInfo", JSON.stringify({ id: response.data.id, email: response.data.email }), { expires: 7 });
    setUserInfo({id: response.data.id, email: response.data.email, token: Cookies.get("token")});
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}

export const deleteProfileFetch = async (data, token, setUserInfo) => {
  const fetchURL = `${baseURL}/users/destroy_with_password`
  return axios.post(
    fetchURL, {data},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  )
  .then(response => {
    console.log('Response data:', response.data);
    Cookies.remove("token");
    Cookies.remove("userInfo");
    setUserInfo(null);
    return response.data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}