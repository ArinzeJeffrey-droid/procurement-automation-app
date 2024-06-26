"use client";
import { OrderForm } from "@/components/OrderForm";

export default function CreateOrder() {
  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <OrderForm onSubmit={(order) => console.log(order)} />
    </div>
  );
}
