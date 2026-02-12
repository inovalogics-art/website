import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const [
    { data: categories },
    { data: services },
    { data: projects },
    { data: testimonials },
    { data: settings },
  ] = await Promise.all([
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("services").select("*, category:categories(*)").eq("is_active", true).order("sort_order"),
    supabase.from("projects").select("*, category:categories(*)").eq("is_active", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("site_settings").select("*"),
  ]);

  const settingsMap: Record<string, unknown> = {};
  settings?.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return NextResponse.json({
    categories: categories || [],
    services: services || [],
    projects: projects || [],
    testimonials: testimonials || [],
    settings: settingsMap,
  });
}
