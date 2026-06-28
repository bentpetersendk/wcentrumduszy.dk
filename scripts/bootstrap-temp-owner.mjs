import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.TEMP_OWNER_EMAIL;
const password = process.env.TEMP_OWNER_PASSWORD;
const displayName = process.env.TEMP_OWNER_DISPLAY_NAME || "Bent Petersen";

if (!url || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

if (!email || !password) {
  throw new Error("TEMP_OWNER_EMAIL and TEMP_OWNER_PASSWORD are required.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function findUserByEmail(targetEmail) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;

    const user = data.users.find((item) => item.email?.toLowerCase() === targetEmail.toLowerCase());
    if (user) return user;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

const existingUser = await findUserByEmail(email);

const user =
  existingUser
    ? (
        await supabase.auth.admin.updateUserById(existingUser.id, {
          email,
          password,
          email_confirm: true,
          user_metadata: { display_name: displayName }
        })
      ).data.user
    : (
        await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { display_name: displayName }
        })
      ).data.user;

if (!user) {
  throw new Error("Failed to create or update the temporary owner account.");
}

const { error: profileError } = await supabase.from("admin_profiles").upsert(
  {
    id: user.id,
    email,
    display_name: displayName,
    role: "owner"
  },
  { onConflict: "id" }
);

if (profileError) throw profileError;

console.log(JSON.stringify({ userId: user.id, email, displayName, role: "owner", reusedExistingUser: Boolean(existingUser) }, null, 2));
