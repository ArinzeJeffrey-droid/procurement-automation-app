import { Order } from "@/__types__/order";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/orders");
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while fetching orders");
      }
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while fetching an order");
      }
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Order) => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify(order),
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while creating an order");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Order) => {
      try {
        const response = await fetch(`/api/orders/${order.id}`, {
          method: "PUT",
          body: JSON.stringify(order),
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while updating an order");
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`/api/orders/${id}`, {
          method: "DELETE",
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while deleting an order");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
