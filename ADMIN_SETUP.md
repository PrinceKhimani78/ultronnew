# Ultron Financials Admin Panel & Supabase Setup Guide

This document outlines the setup, database migration, authentication, RLS security verification, and administrative workflow for the internal Ultron Lead Management Admin Panel at `/admin`.

---

## 1. Environment Variables Configuration

Create a `.env.local` file in the project root based on [.env.example](file:///d:/ultronnew/ultronnew/.env.example):

```env
# Public Supabase URL & Anon Key (Safe for Browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-actual-anon-key

# Server-Only Secret Key (NEVER expose to browser code)
SUPABASE_SECRET_KEY=your-actual-secret-key-or-service-role-key

# Optional Notification Resend API Key
RESEND_API_KEY=re_your_resend_api_key
NOTIFICATION_EMAIL=admin@ultronfinancials.com
```

---

## 2. Supabase Database Migration

Apply the version-controlled SQL migration file located at:
`supabase/migrations/20260812000000_create_admin_schema.sql`

You can run this migration via:

1. **Supabase CLI**: `npx supabase db push`
2. **Supabase Dashboard SQL Editor**: Paste and execute the contents of `20260812000000_create_admin_schema.sql`.

### Migration Artifacts Created:

- **Enums**: `admin_role`, `enquiry_status`, `enquiry_priority`, `delivery_status`
- **Tables**: `admin_profiles`, `enquiries`, `enquiry_notes`, `enquiry_activity`, `integration_deliveries`
- **Sequence & Generator**: `generate_enquiry_reference()` creating concurrency-safe `UF-2026-000101` reference numbers.
- **Security-Definer RPC Functions**:
  - `update_enquiry_with_activity(...)`
  - `add_enquiry_note_with_activity(...)`
  - `archive_enquiry_with_activity(...)`
  - `is_active_admin(user_id)`
- **RLS & Grants**: `REVOKE ALL ON ALL TABLES FROM anon;` Direct table access from the `anon` role is revoked. All public lead insertions are securely routed through `/api/enquiries`.

---

## 3. Creating the First Administrator Account

Because public administrator registration is strictly disabled, create the initial administrator using either of the following methods:

### Method A: Supabase Dashboard + SQL Editor (Recommended)

1. In the Supabase Dashboard, go to **Authentication -> Users -> Add User -> Create User**.
2. Enter the administrator's email and password (e.g. `admin@ultronfinancials.com`).
3. Copy the generated User `id` (UUID).
4. Go to **SQL Editor** and insert the matching `admin_profiles` record:

```sql
INSERT INTO public.admin_profiles (id, full_name, role, is_active)
VALUES ('PASTE-THE-USER-UUID-HERE', 'Ultron Admin', 'super_admin', true);
```

---

## 4. Admin Panel Access & Routes

- **Admin Login**: `http://localhost:3000/admin/login`
- **Protected Overview Dashboard**: `http://localhost:3000/admin`
- **Enquiry Management Data Table**: `http://localhost:3000/admin/enquiries`
- **Enquiry Detail View**: `http://localhost:3000/admin/enquiries/[id]`

---

## 5. Verification Commands

Run full verification locally:

```bash
npm run verify
```

This executes TypeScript typechecking (`tsc --noEmit`), ESLint compliance (`eslint .`), and Next.js production build (`next build`).
