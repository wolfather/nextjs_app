
import { NextResponse } from "next/server";
import { data } from "@/mocks/handlers";

export async function GET() {
    return NextResponse.json(data);
};
