export type OrderStatus = "Delivered" | "Pending";

export interface Order {
  id: string;
  itemName: string;
  quantity: number;
  status: OrderStatus;
}
