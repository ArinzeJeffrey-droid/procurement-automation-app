import { Order } from "@/__types__/order";
import OrderList from "@/components/OrderList";

const orders: Order[] = [
  {
    id: "ORD-001",
    itemName: "Carrot Cake",
    quantity: 2,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    itemName: "Chocolate Cake",
    quantity: 1,
    status: "Pending",
  },
  {
    id: "ORD-003",
    itemName: "Cheese Cake",
    quantity: 3,
    status: "Delivered",
  },
  {
    id: "ORD-004",
    itemName: "Fruit Cake",
    quantity: 1,
    status: "Pending",
  },
  {
    id: "ORD-005",
    itemName: "Red Velvet Cake",
    quantity: 2,
    status: "Delivered",
  },
];

export default function Home() {
  return (
    <main>
      <OrderList orders={orders} />
    </main>
  );
}
