import toast from "react-hot-toast";

import axiosInstance from "../axiosClient";

export async function loginUser(params) {
  try {
    const response = await axiosInstance.post('login', params);
    return response;
  } catch (error) {
    console.log(error);
    toast(JSON.stringify(error));
  }
}

export async function registerUser(params) {
  try {
    const response = await axiosInstance.post('userRegistration', params);
    return response;
  } catch (error) {
    console.log(error);
    toast(JSON.stringify(error));
  }
}