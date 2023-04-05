import axios from "axios";
export const API_URL = process.env.REACT_APP_STAGING_API_URL;
console.log("🚀 ~ file: request.js:3 ~ API_URL:", API_URL);
export const LOGIN = "login";
export const REGISTER = "register";
export const UPDATE_PROFILE = "edit";
export const FORGOT_PASSWORD = "forgot-passord";
export const CHANGE_PASSWORD = "change-passord";
export const LIST = "unknown";

export function login(email, password) {
  return axios.post(`${API_URL}${LOGIN}`, {
    email,
    password,
  });
}

export function signUp(payload) {
  return axios.post(`${API_URL}${REGISTER}`, payload);
}

export function updateProfile(payload) {
  return axios.post(`${API_URL}${UPDATE_PROFILE}`, payload);
}

export function forgotPassword(payload) {
  return axios.post(`${API_URL}${FORGOT_PASSWORD}`, payload);
}
export function changePassword(payload) {
  return axios.post(`${API_URL}${CHANGE_PASSWORD}`, payload);
}

export function getUserList() {
  return axios.get(`${API_URL}${LIST}`);
}
