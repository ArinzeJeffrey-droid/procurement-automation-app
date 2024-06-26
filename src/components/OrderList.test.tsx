import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import OrderList, { OrderListProps } from "./OrderList";
import { Order } from "@/__types__/order";

const orders: Order[] = [
  {
    id: "ORD-001",
    itemName: "Item 1",
    quantity: 1,
    status: "Pending",
  },
  {
    id: "ORD-002",
    itemName: "Item 2",
    quantity: 2,
    status: "Delivered",
  },
];
const mockDeleteOrder = jest.fn();

describe("OrderList", () => {
  function subject(props: OrderListProps) {
    return render(<OrderList {...props} />);
  }

  it("renders a table", () => {
    subject({ orders: [], deleteOrder: mockDeleteOrder });
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders a table caption", () => {
    subject({ orders: [], deleteOrder: mockDeleteOrder });
    expect(screen.getByRole("caption")).toBeInTheDocument();
  });

  it("renders a row for each order", () => {
    subject({ orders, deleteOrder: mockDeleteOrder });

    expect(screen.getAllByRole("row")).toHaveLength(orders.length + 1);
  });

  it("displays the order details correctly", () => {
    subject({ orders, deleteOrder: mockDeleteOrder });
    orders.forEach((order) => {
      expect(screen.getByText(order.id)).toBeInTheDocument();
      expect(screen.getByText(order.itemName)).toBeInTheDocument();
      expect(screen.getByText(order.quantity.toString())).toBeInTheDocument();
      expect(screen.getByText(order.status)).toBeInTheDocument();
    });
  });

  it("calls deleteOrder with the correct order ID when the delete button is clicked", () => {
    subject({ orders, deleteOrder: mockDeleteOrder });
    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteOrder).toHaveBeenCalledWith(orders[0].id);
  });
});
