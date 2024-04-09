import toast from "react-hot-toast";
import axiosInstance from "../axiosClient";

export async function applyForBid(params) {
  try {
    const response = await axiosInstance.post('applyForBid', params);
    return response;
  } catch (error) {
    console.log(error);
    toast(JSON.stringify(error));
  }
}