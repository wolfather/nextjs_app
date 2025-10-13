
import { NextRequest, NextResponse } from "next/server";
import { data } from "@/mocks/handlers";

export async function GET(req: Request) {
    return NextResponse.json(data);
};
