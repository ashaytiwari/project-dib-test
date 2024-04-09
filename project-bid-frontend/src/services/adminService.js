import toast from "react-hot-toast";

import axiosInstance from "../axiosClient";

export async function updateProjectStatus(params) {
  try {
    const response = await axiosInstance.post('updateProjectStatus', params);
    return response;
  } catch (error) {
    console.log(error);
    toast(JSON.stringify(error));
  }
}