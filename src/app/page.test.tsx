// @ts-nocheck
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDeleteOrder, useOrders } from "./api/queries/order";
import Home from "./page";

jest.mock("./api/queries/order", () => ({
  useOrders: jest.fn(),
  useDeleteOrder: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const orders = [
  { id: "order-1", itemName: "Item 1", quantity: 1, status: "Pending" },
  { id: "order-2", itemName: "Item 2", quantity: 2, status: "Delivered" },
];

const mockUseOrders = useOrders as jest.MockedFunction<typeof useOrders>;
const mockUseDeleteOrder = useDeleteOrder as jest.MockedFunction<
  typeof useDeleteOrder
>;
mockUseDeleteOrder.mockReturnValue({
  mutate: jest.fn(),
});

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator while fetching orders", async () => {
    mockUseOrders.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isFetching: true,
    });

    render(<Home />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("renders error message when fetching orders fails", async () => {
    mockUseOrders.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("An error occurred"),
      isError: true,
    });

    render(<Home />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("renders order list when orders are fetched", async () => {
    mockUseOrders.mockReturnValue({
      data: { orders },
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    render(<Home />);

    expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("deletes order when delete button is clicked", async () => {
    mockUseOrders.mockReturnValue({
      data: { orders },
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /Delete/i })[0]);

    expect(mockUseDeleteOrder).toHaveBeenCalledTimes(1);
  });
});
