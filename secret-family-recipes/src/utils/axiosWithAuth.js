import axios from 'axios';

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'https://secret-family-recipes-bw.herokuapp.com/api'
  });
};
