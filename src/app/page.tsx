"use client";
import OrderList from "@/components/OrderList";
import { useOrders } from "./api/queries";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Home() {
  const { data, isLoading, error } = useOrders();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <main>
      <OrderList orders={data.orders} />
    </main>
  );
}
