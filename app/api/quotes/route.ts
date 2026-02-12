import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category_id, name, email, phone, company, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        category_id: category_id || null,
        name,
        email,
        phone: phone || null,
        company: company || null,
        budget: budget || null,
        timeline: timeline || null,
        message,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating quote request:", error);
      return NextResponse.json(
        { error: "Failed to submit quote request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
