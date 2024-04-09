import toast from "react-hot-toast";
import axiosInstance from "../axiosClient";

export async function getProjects() {
  try {
    const response = await axiosInstance.get('getProjects');
    return response;
  } catch (error) {
    console.log(error);
    toast(JSON.stringify(error));
  }
}