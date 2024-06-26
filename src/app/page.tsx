"use client";
import OrderList from "@/components/OrderList";
import { useDeleteOrder, useOrders } from "./api/queries/order";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { toast } from "sonner";

export default function Home() {
  const { data, isLoading, error } = useOrders();

  const { mutate: deleteOrder } = useDeleteOrder();

  const handleDeleteOrder = (orderID: string) => {
    deleteOrder(orderID, {
      onSuccess: () => {
        toast.success("Order has been deleted!");
      },
      onError: () => {
        toast.error("An error occurred while deleting the order");
      },
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <main>
      {data.orders.length === 0 ? (
        <h1 className="text-center text-white">No orders found</h1>
      ) : (
        <OrderList orders={data.orders} deleteOrder={handleDeleteOrder} />
      )}
    </main>
  );
}
