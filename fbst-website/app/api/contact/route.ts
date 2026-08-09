import { NextRequest, NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/cms";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

const REASONS = ["support", "referral", "partnership", "funding", "safeguarding", "other"];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field: real users never fill this in; bots often do.
  if (isNonEmptyString(body.company_website)) {
    return NextResponse.json({ ok: true }); // silently accept, do nothing
  }

  const name = isNonEmptyString(body.name) ? body.name.trim().slice(0, 200) : "";
  const contact = isNonEmptyString(body.contact) ? body.contact.trim().slice(0, 200) : "";
  const reasonRaw = typeof body.reason === "string" ? body.reason : "";
  const reason = REASONS.includes(reasonRaw) ? reasonRaw : "";
  const preferredMethod = isNonEmptyString(body.preferredMethod)
    ? body.preferredMethod.trim().slice(0, 100)
    : "";
  const preferredTime = isNonEmptyString(body.preferredTime)
    ? body.preferredTime.trim().slice(0, 100)
    : undefined;
  const message = isNonEmptyString(body.message) ? body.message.trim().slice(0, 4000) : "";
  const consent = body.consent === true;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please share a name or preferred name.";
  if (!contact) errors.contact = "Please share a safe email or phone number.";
  if (!reason) errors.reason = "Please choose a reason for contact.";
  if (!preferredMethod) errors.preferredMethod = "Please choose a preferred contact method.";
  if (!message) errors.message = "Please add a short message.";
  if (!consent) errors.consent = "Please confirm consent to be contacted.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  await saveContactSubmission({
    name,
    contact,
    reason,
    preferredMethod,
    preferredTime,
    message,
    consent,
  });

  return NextResponse.json({ ok: true });
}
