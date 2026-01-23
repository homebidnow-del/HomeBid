export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Twilio from "twilio";

export async function POST(req: Request) {
  return NextResponse.json({ started: true });
}
