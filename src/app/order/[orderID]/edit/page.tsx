"use client";
import { Order } from "@/__types__/order";
import { OrderForm } from "@/components/OrderForm";

export default function EditOrder() {
  const order: Order = {
    id: "ORD-001",
    itemName: "Carrot Cake",
    quantity: 2,
    status: "Delivered",
  };
  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <OrderForm
        existingOrder={order}
        onSubmit={(order) => console.log(order)}
      />
    </div>
  );
}
