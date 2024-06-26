"use client";
import OrderForm from "@/components/OrderForm";
import { useCreateOrder } from "../api/queries/order";
import { Order } from "@/__types__/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateOrder() {
  const router = useRouter();
  const { mutate: createOrder } = useCreateOrder();

  const onSubmit = (order: Order) => {
    createOrder(order, {
      onSuccess: () => {
        router.push("/");
        toast.success("Order has been placed!");
      },
      onError: () => {
        toast.error("An error occurred while placing the order");
      },
    });
  };
  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <OrderForm onSubmit={(order) => onSubmit(order)} />
    </div>
  );
}
