import { useMutation, useQuery } from "@tanstack/react-query";
import request from "app/api/client/request";
import { toast } from "react-toastify";

export const getCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: request.Cart?.get,
  });
};
