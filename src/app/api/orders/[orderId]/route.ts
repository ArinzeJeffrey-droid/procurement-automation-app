import { ErrorResponse, GetOrderResponse } from "@/__types__/api";
import { Order } from "@/__types__/order";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const DATA_PATH = process.cwd() + "/src/data/db.json";

export async function GET(
  req: Request,
  context: any
): Promise<NextResponse<GetOrderResponse | ErrorResponse>> {
  try {
    const { orderId } = context.params;

    const data = await fs.readFile(DATA_PATH, "utf-8");
    const jsonData: Order[] = JSON.parse(data);

    const order = jsonData.find((order) => order.id === orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: any
): Promise<NextResponse<GetOrderResponse | ErrorResponse>> {
  try {
    const { orderId } = context.params;
    const updatedOrder: Order = await req.json();

    const data = await fs.readFile(DATA_PATH, "utf-8");
    const jsonData: Order[] = JSON.parse(data);

    const orderIndex = jsonData.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    jsonData[orderIndex] = updatedOrder;

    await fs.writeFile(DATA_PATH, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({ order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: any
): Promise<NextResponse<GetOrderResponse | ErrorResponse>> {
  try {
    const { orderId } = context.params;

    const data = await fs.readFile(DATA_PATH, "utf-8");
    const jsonData: Order[] = JSON.parse(data);

    const orderIndex = jsonData.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const deletedOrder = jsonData.splice(orderIndex, 1)[0];

    await fs.writeFile(DATA_PATH, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({ order: deletedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
