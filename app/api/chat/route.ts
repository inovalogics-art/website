import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, message, sender = "user" } = body;

    if (!session_id || !message) {
      return NextResponse.json(
        { error: "Session ID and message are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Save user message
    await supabase.from("chat_messages").insert({
      session_id,
      sender,
      message,
    });

    // Generate bot response based on keywords
    let botResponse = "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or book a consultation.";

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("quote")) {
      botResponse = "For pricing information, I recommend filling out our quote request form. Each project is unique, and we provide custom quotes based on your specific requirements. Would you like me to direct you to the quote form?";
    } else if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
      botResponse = "We offer a range of services including Web Development, Mobile Development, UI/UX Design, Custom Software, and Graphic Design. Check out our Services section for more details!";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("call") || lowerMessage.includes("talk")) {
      botResponse = "You can book a free consultation using our booking system, or reach us at contact@inovalogics.com. We typically respond within 24 hours!";
    } else if (lowerMessage.includes("portfolio") || lowerMessage.includes("work") || lowerMessage.includes("project")) {
      botResponse = "Check out our Portfolio section to see some of our recent work! We have delivered over 250 successful projects across various industries.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      botResponse = "Hello! Welcome to Inovalogics. How can I assist you today? Feel free to ask about our services, pricing, or book a consultation.";
    }

    // Save bot response
    const { data } = await supabase
      .from("chat_messages")
      .insert({
        session_id,
        sender: "bot",
        message: botResponse,
      })
      .select()
      .single();

    return NextResponse.json({ success: true, response: botResponse, data });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", session_id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ messages: messages || [] });
}
