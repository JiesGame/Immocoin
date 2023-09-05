import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://127.0.0.1:3000';

const headerFetch = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Cookies.get('token')}`
}

export const registerFetch = async (data) => {
  const registerURL = `${baseURL}/users`
  const registerBody = {
    "user": {
      "email" : data.email,
      "password": data.password,
      "password_confirmation": data.password_confirmation
    }
  }
  return axios.post(registerURL, registerBody, { headerFetch })
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
  const registerURL = `${baseURL}/users/sign_in`
  const registerBody = {
    "user": {
      "email" : data.email,
      "password": data.password,
    }
  }
  return axios.post(registerURL, registerBody, { headerFetch })
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
