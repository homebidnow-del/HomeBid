import { NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req: Request) {
  const { phone, code, userId } = await req.json();

  if (!phone || !code || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const check = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: phone,
      code,
    });

  if (check.status !== "approved") {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await supabaseAdmin
    .from("profiles")
    .update({ phone, phone_verified: true })
    .eq("id", userId);

  return NextResponse.json({ ok: true });
}
