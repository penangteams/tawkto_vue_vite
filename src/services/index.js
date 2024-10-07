/** @format */
//https://dev.to/julfikarhaidar/implementation-axios-and-vuejs-with-separate-service-2603

import axios from "axios";
const BASE_URL = "http://localhost:8000";

export async function fetchCatDatas() {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
}

export async function fetchArtDatas() {
  const response = await axios.get(`${BASE_URL}/articles`);
  return response.data;
}

export async function fetchCatDetail(id) {
  const response = await axios.get(`${BASE_URL}/categories/${id}`);
  return response.data;
}
