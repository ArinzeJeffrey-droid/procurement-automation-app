"use client";
import { useDeleteOrder, useOrder } from "@/app/api/queries/order";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import OrderDetail from "@/components/OrderDetail";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderID =
    typeof params.orderID === "string" ? params.orderID : params.orderID[0];

  const { data, isLoading, error } = useOrder(orderID);
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleDeleteOrder = () => {
    deleteOrder(orderID, {
      onSuccess: () => {
        router.push("/");
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
    <OrderDetail order={data.order} deleteOrder={() => handleDeleteOrder()} />
  );
}
