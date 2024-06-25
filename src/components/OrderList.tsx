import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Order, OrderStatus } from "@/__types__/order";

interface OrderListProps {
  orders: Order[];
}

const orderStatusClasses: Record<OrderStatus, "default" | "destructive"> = {
  Delivered: "default",
  Pending: "destructive",
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <Table>
      <TableCaption>A list of your orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.itemName}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell className="text-right">
              <Badge variant={orderStatusClasses[order.status]}>
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
