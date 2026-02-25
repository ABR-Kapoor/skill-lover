# Skill Lover 🚀
### AI-Powered Career Planning Platform

> **Empowering students & professionals to own their career journey — one week at a time.**

Skill Lover is a full-stack, enterprise-grade web application that leverages **Google Gemini Pro AI** to help users navigate their career trajectories through intelligent roadmap generation and ATS resume optimization — all wrapped in a premium, modern UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Gemini_Pro-AI-4285F4?style=flat-square&logo=google)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Core Features](#-core-features)
3. [System Architecture](#-system-architecture)
4. [Tech Stack](#-tech-stack)
5. [Database Schema](#-database-schema)
6. [API Reference](#-api-reference)
7. [Getting Started](#-getting-started)
8. [Environment Variables](#-environment-variables)
9. [Deployment](#-deployment)
10. [Project Structure](#-project-structure)

---

## 🎯 Overview

**Skill Lover** solves a root problem faced by millions of students and professionals: *"I know I need to grow my career — but I have no idea where to start or how to structure my path."*

The platform delivers two AI-powered services:

| Module | Description | Credit Cost |
|--------|-------------|-------------|
| 🗺️ AI Roadmap Generator | Personalized week-by-week career roadmaps | 1 credit |
| 📄 ATS Resume Analyzer | Resume ATS compatibility scoring & feedback | 1 credit |
| 📚 Resource Library | Curated educational resources database | Free |
| 💳 Credit Management | Transaction-based credit system | Variable |

### Project Metrics
- **Lines of Code:** ~10,893 (10.9 KLOC)
- **Components:** 68
- **API Endpoints:** 11
- **Database Tables:** 5
- **Development Time:** ~20–25 hours

---

## ✨ Core Features

### 🗺️ AI Roadmap Generator

Generate a fully personalized, **week-by-week career learning roadmap** powered by Google Gemini Pro.

**Career Path Types:**
- `Entrepreneur` — For founders building their own venture (marketing, tech, ops, sales focus)
- `Job Seeker` — For those targeting specific roles at companies

**Intensity Modes:**

| Mode | Duration | Hours/Day | Total Weeks |
|------|----------|-----------|-------------|
| 🟢 Chill | 6 months | 2 hrs/day | 24 weeks |
| 🟡 Regular | 3 months | 4 hrs/day | 12 weeks |
| 🔴 Intense | 1.5 months | 6 hrs/day | 6 weeks |

**Each roadmap includes:**
- ✅ Week-by-week **milestones** with learning objectives
- ✅ **Tasks** with priority levels (High / Medium / Low) and estimated hours
- ✅ **Time allocation** breakdown (Learning / Practice / Projects / Networking)
- ✅ **Tools & platforms** to master per phase
- ✅ **Success metrics** to track real progress
- ✅ Curated **resource links** attached to each task
- ✅ Export as **PDF** or **Markdown**
- ✅ Custom editing of generated roadmaps

---

### 📄 ATS Resume Analyzer

Upload a **PDF or DOCX** resume and receive a comprehensive ATS compatibility analysis.

**Analysis Output:**

| Section | Weight | Evaluated For |
|---------|--------|---------------|
| Work Experience | 30% | Quantified achievements, action verbs |
| Skills | 20% | Technical skills, tools, certifications |
| Professional Summary | 15% | Clarity, keyword density, relevance |
| Formatting | 15% | ATS compatibility, document structure |
| Education | 10% | Degrees, institutions, relevance |
| Contact Information | 10% | Email, phone, LinkedIn presence |

**Deliverables per analysis:**
- 🔢 **ATS Score** (0–100) with section-by-section breakdown
- ✅ Identified **strengths** of your resume
- ⚠️ Detected **weaknesses** holding you back
- 🔍 **Missing keywords** that recruiters look for
- 📌 Actionable **improvement suggestions** per section
- 🎯 Optional **Job Description matching** — paste a JD and get laser-targeted feedback

---

### 📚 Resource Library

A curated, filterable database of learning materials — completely **free to access**.

- **Types:** Courses, Videos, Articles, Books, Tools, Templates
- **Difficulties:** Beginner, Intermediate, Advanced
- **Filters:** Free/Paid, Tags, Platform, Rating, Author
- **30+ hand-picked resources** across Programming, Design, Business, AI/ML, Career

---

### 💳 Credit System

A transparent, pay-as-you-go SaaS credit model:

| Operation | Credits |
|-----------|---------|
| Signup Bonus | +2 free credits |
| Roadmap Generation | −1 credit |
| ATS Analysis | −1 credit |
| Credit Purchase | +4 credits (₹20) |

All transactions are logged with full audit trail in the `credit_transactions` table.

---

## 🏗️ System Architecture

The application implements a **Server-Side Rendering (SSR)** architecture using Next.js App Router with clean layer separation:

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  Next.js App Router | React 19 | Tailwind CSS | Framer Motion  │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                          │
│  API Routes | Server Actions | Middleware | Zod Validation      │
├─────────────────────────────────────────────────────────────────┤
│                      INTEGRATION LAYER                          │
│  Clerk Auth | Google Gemini Pro AI | Supabase Storage          │
├─────────────────────────────────────────────────────────────────┤
│                      DATA ACCESS LAYER                          │
│  Neon Serverless PostgreSQL | Connection Pooling               │
└─────────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
Client → Clerk (OAuth/Email) → Webhook → Database Sync
                                   ↓
              user.created → INSERT into users + 2 free credits
              user.updated → UPDATE users record
              user.deleted → CASCADE DELETE all user data
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.10 | React framework with App Router & SSR |
| React | 19.2.1 | UI component library |
| TypeScript | 5.x | Static type checking |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| Framer Motion | 12.x | Smooth animations & transitions |
| shadcn/ui | Latest | Radix-based accessible UI components |
| Lucide React | 0.561.0 | Icon library |

### Backend & Services

| Technology | Purpose |
|------------|---------|
| Neon PostgreSQL | Serverless primary database |
| Clerk | Authentication (OAuth + Email) |
| Google Gemini Pro | AI roadmap & resume analysis |
| Supabase Storage | Resume file uploads |
| Svix | Clerk webhook signature verification |

### Utility Libraries

| Library | Purpose |
|---------|---------|
| @react-pdf/renderer | Professional PDF document generation |
| pdf2json | PDF text extraction for analysis |
| mammoth | DOCX file parsing |
| react-hook-form | Form state management |
| zod | Schema validation |
| date-fns | Date manipulation |
| react-dropzone | Drag-and-drop file upload |

---

## 🗄️ Database Schema

The database uses **Neon Serverless PostgreSQL** with the following 5-table relational schema:

### Entity Relationship

```
                          ┌─────────────────┐
                          │     USERS       │
                          │─────────────────│
                          │ PK  id (UUID)   │
                          │     clerk_id    │
                          │     email       │
                          │     credits     │
                          │     is_premium  │
                          └────────┬────────┘
                                   │
         ┌─────────────────────────┼──────────────────────────┐
         │ 1:N                     │ 1:N                      │ 1:N
         ▼                         ▼                          ▼
┌──────────────────┐    ┌─────────────────────┐   ┌─────────────────────┐
│    ROADMAPS      │    │    ATS_ANALYSES      │   │ CREDIT_TRANSACTIONS │
│──────────────────│    │─────────────────────│   │─────────────────────│
│ type             │    │ resume_filename      │   │ transaction_type    │
│ intensity        │    │ ats_score (0–100)    │   │ credits_changed     │
│ target_role      │    │ analysis_result JSON │   │ credits_after       │
│ content (JSONB)  │    │ job_description      │   │ amount_paid (INR)   │
└──────────────────┘    └─────────────────────┘   └─────────────────────┘

                          ┌─────────────────┐
                          │    RESOURCES    │  (standalone, no FK)
                          │─────────────────│
                          │ type, url, tags │
                          │ platform, price │
                          │ difficulty      │
                          └─────────────────┘
```

To set up the database, run `neon-schema.sql` in your Neon SQL editor.

---

## 📡 API Reference

All protected endpoints require valid **Clerk authentication**.

### Roadmap Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/roadmap/generate` | Generate a new AI roadmap (costs 1 credit) |
| `GET` | `/api/roadmap/list` | List all roadmaps for current user |
| `GET` | `/api/roadmap/[id]` | Get a specific roadmap by ID |
| `PUT` | `/api/roadmap/[id]` | Update/edit an existing roadmap |
| `DELETE` | `/api/roadmap/[id]` | Delete a roadmap |

**Generate Roadmap — Request Body:**
```json
{
  "type": "entrepreneur | job_seeker",
  "targetRole": "Full Stack Developer",
  "intensity": "chill | regular | intense",
  "currentSkills": ["HTML", "CSS", "JavaScript"]
}
```

**Error Codes:**
| Status | Meaning |
|--------|---------|
| 400 | Invalid input parameters |
| 401 | Unauthorized |
| 402 | Insufficient credits |
| 404 | User not found |
| 500 | Server error |

---

### ATS Analysis Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ats/extract-text` | Upload PDF/DOCX and extract text |
| `POST` | `/api/ats/analyze` | Analyze extracted resume text (costs 1 credit) |
| `GET` | `/api/ats/[id]` | Retrieve a past analysis by ID |

**Analyze — Request Body:**
```json
{
  "resumeText": "...",
  "resumeFilename": "my-resume.pdf",
  "jobDescription": "Optional JD text for matching"
}
```

---

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/credits` | Get current credit balance |
| `GET` | `/api/user/profile` | Get user profile |
| `POST` | `/api/webhooks/clerk` | Clerk webhook for user sync (internal) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **Neon** account → [neon.tech](https://neon.tech)
- **Clerk** account → [clerk.com](https://clerk.com)
- **Google AI Studio** account → [aistudio.google.com](https://aistudio.google.com)
- **Supabase** account (for file storage) → [supabase.com](https://supabase.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skill-lover.git
cd skill-lover
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.template .env.local
```

Fill in your keys in `.env.local` (see [Environment Variables](#-environment-variables) below).

### 4. Setup the Database

1. Create a new project on [Neon](https://neon.tech)
2. Open the **SQL Editor** in your Neon dashboard
3. Paste and run the contents of **`neon-schema.sql`**
4. Copy your `DATABASE_URL` from Neon's connection string

### 5. Setup Clerk

1. Create a new application at [clerk.com](https://clerk.com)
2. Enable **Email/Password** and/or **OAuth** providers
3. Go to **Webhooks** → Add endpoint: `https://your-domain/api/webhooks/clerk`
4. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
5. Copy the **Webhook Secret** to `CLERK_WEBHOOK_SECRET`

### 6. Setup Supabase Storage

1. Create a new Supabase project
2. Go to **Storage** → Create a bucket named **`resumes`**
3. Set bucket to **Public**
4. Copy your project URL and anon key

### 7. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click **Get API Key** → Create new key
3. Add it to `.env.local` as `GEMINI_API_KEY`

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔐 Environment Variables

Create a `.env.local` file from the template:

```env
# ── Neon Database ──────────────────────────────────────────
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require

# ── Clerk Authentication ───────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=whsec_...

# ── Google Gemini AI ───────────────────────────────────────
GEMINI_API_KEY=AIza...

# ── Supabase Storage ───────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ── App Configuration ──────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SkillLover

# ── Credits & Pricing ──────────────────────────────────────
CREDITS_PER_PURCHASE=4
CREDIT_PRICE_INR=20
FREE_CREDITS=2
```

> ⚠️ **Never commit `.env.local`** — it is already excluded by `.gitignore`.

---

## 📁 Project Structure

```
skill-lover/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth route group
│   │   ├── sign-in/                  # Clerk sign-in page
│   │   └── sign-up/                  # Clerk sign-up page
│   ├── (dashboard)/                  # Protected dashboard group
│   │   ├── ats/                      # ATS Resume Analyzer page
│   │   ├── dashboard/                # Main dashboard overview
│   │   ├── resources/                # Resource library page
│   │   ├── roadmaps/                 # Roadmap list & detail pages
│   │   └── settings/                 # User settings page
│   ├── api/                          # API route handlers
│   │   ├── ats/analyze/              # POST — analyze resume
│   │   ├── ats/extract-text/         # POST — parse PDF/DOCX
│   │   ├── ats/[id]/                 # GET — fetch analysis
│   │   ├── roadmap/generate/         # POST — generate roadmap
│   │   ├── roadmap/list/             # GET — list roadmaps
│   │   ├── roadmap/[id]/             # GET/PUT/DELETE roadmap
│   │   ├── user/credits/             # GET — credit balance
│   │   ├── user/profile/             # GET — user profile
│   │   └── webhooks/clerk/           # POST — Clerk webhook
│   ├── about/                        # Public about page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Landing page
│
├── components/
│   ├── ats/                          # ATS analyzer UI components
│   ├── landing/                      # Landing page sections & 3D scenes
│   │   └── 3d/                       # Three.js / Framer 3D scenes
│   ├── layout/                       # Sidebar, Navbar, Shell
│   ├── resources/                    # Resource library components
│   ├── roadmap/                      # Roadmap viewer & form components
│   ├── shared/                       # Reusable shared components
│   └── ui/                           # shadcn/ui primitives
│
├── lib/
│   ├── clerk/                        # Clerk helper functions
│   ├── data/                         # Static data definitions (resources, etc.)
│   ├── db/                           # Database query functions
│   │   ├── neon.ts                   # Neon client setup
│   │   ├── users.ts                  # User CRUD
│   │   ├── roadmaps.ts               # Roadmap CRUD
│   │   ├── ats.ts                    # ATS analysis CRUD
│   │   └── credits.ts                # Credit operations
│   ├── gemini/                       # Google Gemini AI integration
│   │   ├── client.ts                 # Gemini API client
│   │   └── prompts.ts                # System prompts for AI
│   ├── generators/                   # PDF & Markdown export generators
│   ├── parsers/                      # PDF & DOCX text parsers
│   ├── supabase/                     # Supabase storage client
│   └── utils/                        # General utilities & helpers
│
├── types/                            # TypeScript type definitions
├── public/                           # Static assets
├── neon-schema.sql                   # ⭐ Database schema — run this in Neon
├── middleware.ts                     # Clerk route protection middleware
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to **GitHub**
2. Go to [vercel.com](https://vercel.com) → **Import Project**
3. Select your repository
4. Add all **Environment Variables** from `.env.local` in the Vercel dashboard
5. Set **Build Command:** `npm run build`
6. Set **Output Directory:** `.next`
7. Click **Deploy** 🚀

> Make sure your Clerk webhook URL is updated to your production domain after deployment.

---

## 🎯 Target Audience & Real-World Impact

| Audience | Problem Solved |
|----------|---------------|
| 🎓 Final-year students | No structured plan for placements → AI roadmap in 2 minutes |
| 📄 Fresh graduates | Resume filtered by ATS before a human sees it → Score + fix it |
| 🔄 Career switchers | No idea how to transition domains → Tailored roadmap from current skills |
| 🚀 Aspiring entrepreneurs | Overwhelming to start → Structured venture-building path |
| ⏱️ Busy professionals | Limited time to upskill → Intensity modes fit any schedule |

> **"Skill Lover replaces what previously required a career counselor, a resume expert, and 50+ hours of research — and does it in under 2 minutes."**

---

## 📝 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [Google Gemini](https://ai.google.dev/) — AI backbone of the platform
- [Neon](https://neon.tech/) — Serverless PostgreSQL database
- [Clerk](https://clerk.com/) — Authentication made simple
- [Supabase](https://supabase.com/) — Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible components

---

<div align="center">

**Built with ❤️ for students and professionals who deserve better career tools.**

[⭐ Star this repo](https://github.com/your-username/skill-lover) · [🐛 Report Bug](https://github.com/your-username/skill-lover/issues) · [💡 Request Feature](https://github.com/your-username/skill-lover/issues)

</div>
