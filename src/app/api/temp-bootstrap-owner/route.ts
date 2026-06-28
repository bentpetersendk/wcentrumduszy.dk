import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const allowedEmail = "bent.petersen@gmail.com";
const displayName = "Bent Petersen";
const expectedToken = "9f5a2f1e6e7f4f8a9d97b8d1d3aaf5df31db15db9cb2c1dd3e13dfdf97d6f951";

function tokenMatches(received: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expectedToken);

  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const receivedToken = request.headers.get("x-bootstrap-token") ?? "";

  if (!url || !serviceRoleKey) {
    return NextResponse.json({ error: "Missing runtime admin configuration." }, { status: 500 });
  }

  if (!tokenMatches(receivedToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || password.length < 20) {
    return NextResponse.json({ error: "A strong temporary password is required." }, { status: 400 });
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  let page = 1;
  let existingUser: { id: string } | null = null;

  while (!existingUser) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const match = data.users.find((user) => user.email?.toLowerCase() === allowedEmail);
    if (match) {
      existingUser = { id: match.id };
      break;
    }

    if (data.users.length < 200) break;
    page += 1;
  }

  const authResult = existingUser
    ? await supabase.auth.admin.updateUserById(existingUser.id, {
        email: allowedEmail,
        password,
        email_confirm: true,
        user_metadata: { display_name: displayName }
      })
    : await supabase.auth.admin.createUser({
        email: allowedEmail,
        password,
        email_confirm: true,
        user_metadata: { display_name: displayName }
      });

  if (authResult.error || !authResult.data.user) {
    return NextResponse.json({ error: authResult.error?.message ?? "Unable to create user." }, { status: 500 });
  }

  const { error: profileError } = await supabase.from("admin_profiles").upsert(
    {
      id: authResult.data.user.id,
      email: allowedEmail,
      display_name: displayName,
      role: "owner"
    },
    { onConflict: "id" }
  );

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    email: allowedEmail,
    userId: authResult.data.user.id,
    reusedExistingUser: Boolean(existingUser)
  });
}
