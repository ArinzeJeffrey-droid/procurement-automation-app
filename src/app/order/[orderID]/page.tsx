import { Order } from "@/__types__/order";
import OrderDetail from "@/components/OrderDetail";

export default function OrderDetailsPage() {
  const order: Order = {
    id: "ORD-001",
    itemName: "Carrot Cake",
    quantity: 2,
    status: "Delivered",
  };

  return (
    <OrderDetail
      order={order}
      deleteOrder={() => console.log("Order deleted")}
    />
  );
}
