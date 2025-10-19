
import { NextRequest, NextResponse } from "next/server";
import { data } from "@/mocks/handlers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_: NextRequest) {
    const setCategories = new Set();
    data.forEach(d => setCategories.add(d.category));
    
    return NextResponse.json(Array.from(setCategories));
};
