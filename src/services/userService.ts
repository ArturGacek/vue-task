import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function fetchUsers() {
  return axios.get(`${BASE_URL}/users`).then((response) => response.data);
}

export function fetchUserById(id: string) {
  return axios.get(`${BASE_URL}/users/${id}`).then((response) => response.data);
}
