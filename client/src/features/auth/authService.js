import axios from 'axios';

const API_URL = '/api/postusers/';

// Register user
const register = async (postuserData) => {
  const response = await axios.post(API_URL, postuserData);

  if (response.data) {
    localStorage.setItem('postuser', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (postuserData) => {
  const response = await axios.post(API_URL + 'login', postuserData);

  if (response.data) {
    localStorage.setItem('postuser', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('postuser');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
