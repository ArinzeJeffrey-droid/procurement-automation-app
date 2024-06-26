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
import Link from "next/link";
import { Button } from "./ui/button";

interface OrderListProps {
  orders: Order[];
  deleteOrder: (orderID: string) => void;
}

const orderStatusClasses: Record<OrderStatus, "default" | "destructive"> = {
  Delivered: "default",
  Pending: "destructive",
};

export default function OrderList({ orders, deleteOrder }: OrderListProps) {
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
            <TableCell className="text-right">
              <Link href={`/order/${order.id}`} className="mr-4">
                View
              </Link>
              <Link href={`/order/${order.id}/edit`}>Edit</Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteOrder(order.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
