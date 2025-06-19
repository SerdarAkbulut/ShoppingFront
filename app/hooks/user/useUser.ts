import request from "@/app/api/client/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const getUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: () => request.User.getUserDetails(),
    staleTime: Infinity,
  });
};
export const updateUserDetails = () => {
  return useMutation({
    mutationFn: (values: any) => request.User.updateUserDetails(values),
  });
};
export const forgotPassword = () => {
  return useMutation({
    mutationFn: (values: any) => request.User.forgotPassword(values),
    onSuccess: () => {
      toast.success("Email Gönderildi");
    },
  });
};

export const checktoken = (email: string, token: string) => {
  const encodedToken = encodeURIComponent(token);
  return useQuery({
    queryKey: ["CheckToken"],
    queryFn: () => request.User.checkToken(email, encodedToken),
  });
};
export const checkTokenApi = async (email: string, token: string) => {
  const encodedToken = encodeURIComponent(token);
  const response = await axios.get(
    `https://localhost:7277/api/user/check-token?email=${email}&token=${encodedToken}`
  );
  return response.data;
};
