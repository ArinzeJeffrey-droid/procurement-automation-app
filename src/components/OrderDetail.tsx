import { Order } from "@/__types__/order";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export interface OrderDetailProps {
  order: Order;
  deleteOrder: () => void;
}

export default function OrderDetail({ order, deleteOrder }: OrderDetailProps) {
  return (
    <div className="max-w-lg mx-auto bg-gray-darker border border-gray-lighter text-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 ">Order Details</h1>
      <p className="text-gray-700 mb-2 text-white">
        <span className="font-semibold text-muted-foreground">Order ID:</span> {order.id}
      </p>
      <p className="text-gray-700 mb-2 text-white">
        <span className="font-semibold text-muted-foreground">Item Name:</span> {order.itemName}
      </p>
      <p className="text-gray-700 mb-2 text-white">
        <span className="font-semibold text-muted-foreground">Quantity:</span> {order.quantity}
      </p>
      <div className="text-gray-700 flex items-center">
        <span className="font-semibold text-muted-foreground">Status:</span>
        <Badge variant="default" className="ml-4">
          {order.status}
        </Badge>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between">
        <Button size="sm" asChild>
          <Link href={`/order/${order.id}/edit`}>Edit Order</Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={deleteOrder}>
          Delete Order
        </Button>
      </div>
    </div>
  );
}
