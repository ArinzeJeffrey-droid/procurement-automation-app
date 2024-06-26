import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function OrderDetails() {
  const order = {
    id: "ORD-001",
    itemName: "Carrot Cake",
    quantity: 2,
    status: "Delivered",
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Order ID:</span> {order.id}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Item Name:</span> {order.itemName}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Quantity:</span> {order.quantity}
      </p>
      <div className="text-gray-700 flex items-center">
        <span className="font-semibold">Status:</span>
        <Badge variant="default" className="ml-4">
          {order.status}
        </Badge>
      </div>

      <hr className="my-6" />

      <div className="flex justify-end items-center">
        <Button variant="destructive" size="sm">
          Delete Order
        </Button>
      </div>
    </div>
  );
}
