# Backend Integration Architecture & Database Schema
**Portfolio System for MD FOYSAL AL NUR**

This document details the database schema and cloud integration instructions for **Firebase** and **Supabase**, complementing the client-side reactive storage layer in `js/db.js`.

---

## 1. Unified Schema Architecture

The portfolio data engine operates on 9 core collections/tables:

### `profile`
- `name` (String): Full legal name (`MD FOYSAL AL NUR`)
- `brandName` (String): Monogram brand (`FOYSAL AL NUR`)
- `tagline` (String): `"Creative Mind. Technical Vision. Digital Excellence."`
- `roles` (Array<String>): 8 animated hero typewriter titles
- `heroIntro` (String): Professional summary
- `email` (String): `faysalnur416@gmail.com`
- `phone` (String): `+8801855669424`
- `location` (String): `Dhaka, Bangladesh`
- `activeCV` (String): Active downloadable CV file path
- `portraitImage` (String): Path or Base64 URI of transparent cutout

### `about`
- `heading` (String): `"Beyond Creativity. Driven by Technology."`
- `intro` (String): Personal narrative
- `journey` (Array<String>): Core discipline tags
- `strengths` (Array<{ title: string, desc: string }>): 4 pillars

### `skills`
- `id` (String): Unique identifier
- `name` (String): Skill discipline
- `desc` (String): Full description
- `capabilities` (Array<String>): 3 concrete capabilities ("What I Can Do")
- `tools` (Array<String>): Software & tools list
- `visible` (Boolean): Public display state

### `tools` (Floating Arena Collection)
- `id` (String): Unique identifier
- `name` (String): Software / brand title
- `cat` (String): Creative discipline category
- `speed` (Number): Float velocity multiplier (0.5x, 1.0x, 1.5x)
- `desc` (String): Brief capability
- `link` (String): Official software website
- `svg` (String): Authentic vector SVG markup
- `visible` (Boolean): Display in single arena

### `projects` (8 Galleries)
- `id` (String): Unique identifier
- `category` (Enum): `uiux` | `webdev` | `video` | `photography` | `videography` | `graphic` | `marketing` | `technical`
- `name` (String): Project title
- `desc` (String): Summary description
- `tools` (Array<String>): Frameworks and software used
- `details` (String): Project outcomes & deliverables
- `link` (String | null): Live preview / Figma URL
- `visible` (Boolean): Public display status

### `experience` & `education`
- Experience timeline records (personal & practice vs formal appointments)
- Academic credentials (Northern University, Cumilla Polytechnic, Kadior High School)

### `contact_inbox`
- `id` (String): Message identifier
- `name` (String): Visitor name
- `email` (String): Visitor email
- `service` (String): Requested service
- `subject` (String): Inquired topic
- `message` (String): Full text
- `timestamp` (ISO String): Submission date & time
- `read` (Boolean): Inbox review status

### `feedback`
- `id` (String): Feedback identifier
- `name` (String): Client / collaborator name
- `role` (String): Title or organization
- `email` (String | null): Private contact
- `rating` (Number): 1 to 5 stars
- `quote` (String): Endorsement message
- `approved` (Boolean): Moderation status (`false` by default)
- `createdAt` (ISO String): Submission timestamp

---

## 2. Firebase Cloud Firestore Setup

To sync with Firebase:
1. Initialize Firebase App in your project:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
   // Use environment variables from .env.example
   ```
2. Deploy Firestore Security Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read for portfolio collections
       match /profile/{doc} { allow read: true; allow write: if request.auth != null; }
       match /skills/{doc} { allow read: true; allow write: if request.auth != null; }
       match /tools/{doc} { allow read: true; allow write: if request.auth != null; }
       match /projects/{doc} { allow read: true; allow write: if request.auth != null; }
       match /experience/{doc} { allow read: true; allow write: if request.auth != null; }
       match /education/{doc} { allow read: true; allow write: if request.auth != null; }

       // Public can read only approved reviews
       match /feedback/{doc} {
         allow read: if resource.data.approved == true || request.auth != null;
         allow create: if request.resource.data.approved == false;
         allow update, delete: if request.auth != null;
       }

       // Public can submit contact messages; only admin can read
       match /contact_inbox/{doc} {
         allow create: true;
         allow read, update, delete: if request.auth != null;
       }
     }
   }
   ```

---

## 3. Supabase PostgreSQL Schema Setup

Run the following SQL snippet in the Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Contact Inbox Table
create table public.contact_inbox (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  service text default 'general',
  subject text not null,
  message text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  read boolean default false not null
);

-- Feedback & Reviews Table
create table public.feedback (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text default 'Client',
  email text,
  rating integer check (rating >= 1 and rating <= 5) default 5,
  quote text not null,
  approved boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.contact_inbox enable row level security;
alter table public.feedback enable row level security;

-- Public can insert inquiries and unapproved reviews
create policy "Allow public contact insert" on public.contact_inbox for insert with check (true);
create policy "Allow public feedback insert" on public.feedback for insert with check (approved = false);

-- Public can view approved reviews only
create policy "Allow public read approved feedback" on public.feedback for select using (approved = true);
```

---

## 4. Local Database Persistence (`js/db.js`)
In the current zero-dependency environment, `js/db.js` provides full reactive persistence via browser storage, dispatches `portfolioDBChange` events across windows and tabs, and supports single-click JSON export and import for seamless cloud migration.
