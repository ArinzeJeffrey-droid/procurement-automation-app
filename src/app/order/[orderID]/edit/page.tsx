"use client";
import { Order } from "@/__types__/order";
import { useOrder, useUpdateOrder } from "@/app/api/queries";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { OrderForm } from "@/components/OrderForm";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditOrder() {
  const router = useRouter();
  const params = useParams();
  const orderID =
    typeof params.orderID === "string" ? params.orderID : params.orderID[0];

  const { data, isLoading, error } = useOrder(orderID);
  const { mutate: updateOrder } = useUpdateOrder();

  const onSubmit = (order: Order) => {
    updateOrder(order, {
      onSuccess: () => {
        router.push(`/order/${order.id}`);
        toast.success("Order has been updated!");
      },
      onError: () => {
        toast.error("An error occurred while updating the order");
      },
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <OrderForm
        existingOrder={data.order}
        onSubmit={(order) => onSubmit(order)}
      />
    </div>
  );
}
