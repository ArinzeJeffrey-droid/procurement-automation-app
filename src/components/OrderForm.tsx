import { Order } from "@/__types__/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateOrderId from "@/lib/generateOrderId";
import { useState } from "react";

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  existingOrder?: Order;
}

export function OrderForm({ onSubmit, existingOrder }: OrderFormProps) {
  const [order, setOrder] = useState<Order>(
    existingOrder || {
      id: generateOrderId(),
      itemName: "",
      quantity: 1,
      status: "Pending",
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(order);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                type="text"
                value={order.itemName}
                onChange={(e) =>
                  setOrder({ ...order, itemName: e.target.value })
                }
                placeholder="Name of order item"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={order.quantity}
                onChange={(e) =>
                  setOrder({ ...order, quantity: parseInt(e.target.value) })
                }
                type="number"
                min={1}
                placeholder="Quantity of order item"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>{existingOrder ? "Edit order" : "Place order"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
