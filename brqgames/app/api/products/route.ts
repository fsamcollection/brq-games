import { NextResponse } from "next/server";
import data from "@/data/products.json";

export async function GET() {
  return NextResponse.json(data);
}
