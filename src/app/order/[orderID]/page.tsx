import { Badge } from "@/components/ui/badge";

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
      <p className="text-gray-700">
        <span className="font-semibold">Status:</span>{" "}
        <Badge variant="default">{order.status}</Badge>
      </p>
    </div>
  );
}
