export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  return NextResponse.json({ ok: true });
}
