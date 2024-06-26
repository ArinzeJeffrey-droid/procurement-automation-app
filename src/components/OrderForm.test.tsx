import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import OrderForm, { OrderFormProps } from "./OrderForm";
import { Order } from "@/__types__/order";

const mockSubmit = jest.fn();

jest.mock("../lib/generateOrderId", () => ({
  __esModule: true,
  default: jest.fn(() => "ORD-001"),
}));

describe("OrderForm", () => {
  function subject(props: OrderFormProps) {
    return render(<OrderForm {...props} />);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default form values", () => {
    subject({ onSubmit: mockSubmit });
    expect(screen.getByLabelText(/Item Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(1);
  });

  it("renders correctly with existing order", () => {
    const existingOrder: Order = {
      id: "ORD-001",
      itemName: "Existing Item",
      quantity: 2,
      status: "Pending",
    };
    subject({ existingOrder, onSubmit: mockSubmit });

    expect(screen.getByLabelText(/Item Name/i)).toHaveValue(
      existingOrder.itemName
    );
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(
      existingOrder.quantity
    );
    expect(screen.getByText(/Edit order/i)).toBeInTheDocument();
  });

  it("calls onSubmit with the correct order data when the form is submitted", () => {
    subject({ onSubmit: mockSubmit });

    fireEvent.change(screen.getByLabelText(/Item name/i), {
      target: { value: "New Item" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "3" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Place Order/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      id: "ORD-001",
      itemName: "New Item",
      quantity: 3,
      status: "Pending",
    });
  });

  it("calls onSubmit with the existing order data when the form is submitted", () => {
    const existingOrder: Order = {
      id: "existing-id",
      itemName: "Existing Item",
      quantity: 2,
      status: "Pending",
    };
    subject({ existingOrder, onSubmit: mockSubmit });

    fireEvent.change(screen.getByLabelText(/Item Name/i), {
      target: { value: "Updated Item" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "4" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Edit order/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      ...existingOrder,
      itemName: "Updated Item",
      quantity: 4,
    });
  });
});
