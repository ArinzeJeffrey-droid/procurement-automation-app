import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import OrderDetail, { OrderDetailProps } from "./OrderDetail";
import { Order } from "@/__types__/order";

const mockDeleteOrder = jest.fn();
const order: Order = {
  id: "ORD-001",
  itemName: "Item 1",
  quantity: 1,
  status: "Pending",
};

describe("OrderDetail", () => {
  function subject(props: OrderDetailProps) {
    return render(<OrderDetail {...props} />);
  }

  it("renders correctly with order details", () => {
    subject({ order, deleteOrder: mockDeleteOrder });

    expect(screen.getByText(/order details/i)).toBeInTheDocument();
    expect(screen.getByText(/order id:/i)).toBeInTheDocument();
    expect(screen.getByText(order.id)).toBeInTheDocument();
    expect(screen.getByText(/item name:/i)).toBeInTheDocument();
    expect(screen.getByText(order.itemName)).toBeInTheDocument();
    expect(screen.getByText(/quantity:/i)).toBeInTheDocument();
    expect(screen.getByText(order.quantity.toString())).toBeInTheDocument();
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    expect(screen.getByText(order.status)).toBeInTheDocument();
  });

  it("calls deleteOrder when the delete button is clicked", () => {
    subject({ order, deleteOrder: mockDeleteOrder });

    fireEvent.click(screen.getByRole("button", { name: /Delete Order/i }));

    expect(mockDeleteOrder).toHaveBeenCalled();
  });
});
