import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "@/app/api/client/request";

export const getSliders = () => {
  return useQuery({
    queryKey: ["Sliders"],
    queryFn: () => request.Slider.getSliders(),
  });
};

export const addSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: any) => request.Slider.addSlider(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Sliders"] }); // Sliders verisini yeniden getir
    },
  });
};

export const deleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: any) => request.Slider.deleteSlider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Sliders"] }); // Sliders verisini yeniden getir
    },
  });
};
