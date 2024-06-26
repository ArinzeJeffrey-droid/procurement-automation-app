import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { Order } from "@/__types__/order";
import {
  ErrorResponse,
  GetOrdersResponse,
  PostResponse,
} from "@/__types__/api";

const DATA_PATH = process.cwd() + "/src/data/db.json";

export async function GET(): Promise<
  NextResponse<GetOrdersResponse | ErrorResponse>
> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const jsonData = JSON.parse(data);

    return NextResponse.json({ orders: jsonData }, { status: 200 });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<PostResponse | ErrorResponse>> {
  try {
    const newOrder: Order = await req.json();
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const jsonData: Order[] = JSON.parse(data);

    jsonData.push(newOrder);

    await fs.writeFile(DATA_PATH, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
