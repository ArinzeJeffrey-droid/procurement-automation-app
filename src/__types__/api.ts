import { Order } from "./order";

export interface GetOrdersResponse {
  orders: Order[];
}

export interface GetOrderResponse {
  order: Order;
}

export interface PostResponse {
  message: string ;
}

export interface ErrorResponse {
  error: string;
}
