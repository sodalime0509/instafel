import { NextResponse } from "next/server";
import { getAllWikiPages } from "@/lib/wiki";

export async function GET() {
  const pages = await getAllWikiPages();
  return NextResponse.json(pages);
}
