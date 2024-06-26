import { renderHook, waitFor } from "@testing-library/react";
import { useOrders, useCreateOrder, useDeleteOrder } from "./order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "@/__types__/order";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

const mockOrder: Order = {
  id: "ORD-001",
  itemName: "New Order",
  quantity: 1,
  status: "Pending",
};

describe("useCreateOrder", () => {
  it("creates order successfully", async () => {
    const mockMutation = jest.fn().mockResolvedValue(mockOrder);
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutation });

    const { result } = renderHook(() => useCreateOrder());

    await result.current.mutate(mockOrder);

    expect(mockMutation).toHaveBeenCalledWith(mockOrder);
  });
});

describe("useOrders", () => {
  it("fetches orders successfully", async () => {
    const mockOrders = [
      {
        id: "ORD-001",
        itemName: "New Order",
        quantity: 1,
        status: "Pending",
      },
    ];
    const mockQuery = jest.fn().mockResolvedValue(mockOrders);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      refetch: mockQuery,
    });

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockOrders);
    });
  });
});

describe("useDeleteOrder", () => {
  it("deletes order successfully", async () => {
    const mockMutation = jest.fn().mockResolvedValue(mockOrder);
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutation });

    const { result } = renderHook(() => useDeleteOrder());

    await result.current.mutate(mockOrder.id);

    expect(mockMutation).toHaveBeenCalledWith(mockOrder.id);
  });
});
