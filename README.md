# JobFinder Platform

JobFinder is a premium, modern, and high-performance job board portal built with Next.js 16, React 19, Tailwind CSS, HeroUI, and Better Auth. It connects top talent with world-class companies through frictionless applications, active job boards, and automated subscription tracking.

## 🚀 Key Features

* **Advanced Job Search & Filtering:** Live browse queries, categories, types, and remote-friendly filter toggles.
* **Public Companies Directory:** Discover approved organizations hiring on the platform. Search and filter by industry tag.
* **Multi-Role Dashboards:**
  * **Seeker Dashboard:** Monthly applications tracker with plan limit checks, direct CV applications, status log.
  * **Recruiter Dashboard:** Manage posted jobs, add new vacancies, register company credentials, verify analytics.
  * **Admin Console:** Direct user management (change roles, suspend/activate account, delete users), list posted jobs, view payment transactions, configure settings.
* **Subscription Tiers & Payments:** Integrated checkout session flow via Stripe, active subscription records management.
* **Robust Auth & Recoveries:** Structured Better Auth social/email credentials, email verification flows, and **Forgot Password** self-recovery.

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js 16 (App Router)
* **Library UI Component:** HeroUI (formerly NextUI) & Motion (animations)
* **CSS System:** Tailwind CSS v4
* **Database Driver:** MongoDB & MongoClient
* **Authentication Adapter:** Better Auth with MongoDB Adapter
* **Payment Gateway:** Stripe API

---

## 📋 Environment Variables Config

Create a `.env` or `.env.local` file in your root folder and set the following parameters:

```env
# Better Auth Configurations
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret

# MongoDB Config
MONGODB_URI=your_mongodb_connection_string
DB_NAME=project-1

# Auth Client Credentials
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Server API Integration
NEXT_PUBLIC_BACKEND_URL=https://project-1-backend-chi.vercel.app
NEXT_PUBLIC_IMAGE_BB_UPLOAD_API=your_imgbb_upload_api_key

# Payment Gateways
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 💻 Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
