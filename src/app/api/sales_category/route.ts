
import { NextResponse } from "next/server";
import { data } from "@/mocks/handlers";

export async function GET(_: Request) {
    const setCategories = new Set();
    data.forEach(d => setCategories.add(d.category));
    
    return NextResponse.json(Array.from(setCategories));
};
