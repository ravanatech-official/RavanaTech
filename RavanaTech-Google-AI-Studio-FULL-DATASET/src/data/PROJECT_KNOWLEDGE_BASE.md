# Ravana Tech — Project Master Knowledge Base & Architecture

> **Document Version:** 1.0.0  
> **Repository:** `ravanatech-official/RavanaTech`  
> **Primary Owner / Founder:** Shanthapriya Silva  
> **Contact Email:** `hello.ravanatech@gmail.com` / `info.ravanatech@gmail.com`  
> **WhatsApp:** `+94 78 847 0610` (`wa.me/94788470610`)  
> **Public Production Domain:** `https://ravanatech.com/`  
> **Firebase Project (Hosting & Firestore):** `raavanaatec` (`https://raavanaatec.web.app`)

---

## 1. Brand Identity & Positioning
- **Brand Name:** Ravana Tech
- **Founder:** Shanthapriya Silva
- **Primary Business:** Simple, clean, mobile-first website design and practical digital solutions for small businesses in Sri Lanka.
- **Core Truthful Claim:**
  > *"20 years of diverse professional experience combined with an emerging focus on modern web development and AI-assisted digital solutions."*
  *(Never state "20 years of web development experience", do not invent clients, do not use fake case study statistics or fake testimonials).*
- **Positioning Statement:** *"Simple Websites for Growing Small Businesses — AI-Assisted • Mobile-First • Practical • Affordable"*
- **Target Market:** Small businesses across Sri Lanka (Bakeries, Cafes, Salons, Florists, Fitness Trainers, Realtors, Local Professionals).

---

## 2. Platform Architecture & Ecosystem
- **Google Account:** `hello.ravanatech@gmail.com`
- **GitHub Repository:** `https://github.com/ravanatech-official/RavanaTech.git`
- **Firebase Project ID:** `raavanaatec`
- **Live Staging URL:** `https://raavanaatec.web.app` & `https://raavanaatec.firebaseapp.com`
- **Framework:** React 19 SPA, Vite 6, Tailwind CSS v4, React Router 7.
- **Iconography & Motion:** `lucide-react`, `motion`
- **Database:** Cloud Firestore (`inquiries` collection with strict validation in `firestore.rules`).
- **Auth:** Firebase Auth (`getAuth`) for protected `/admin/*` routes.

---

## 3. Core Features & Routes
### Public Pages
- `/` — Homepage (Conversion-oriented 11-step journey: Hero, Value Strip, Problem->Solution, Featured Concepts, Why Ravana Tech, Founder Story, FAQs, Lead CTA).
- `/services` — 5 core website solutions (Business, Menu & WhatsApp Ordering, Booking & Appointments, Product Showcase, Real Estate & Professional) with transparent starting prices from Rs. 18,000.
- `/projects` — Turnkey Concept Showcase Gallery with 6 interactive concept projects.
- `/projects/:slug` — Individual breakdown pages (`/projects/bakery`, `/projects/cafe`, `/projects/salon`, `/projects/flora`, `/projects/real-estate`, `/projects/personal-trainer`).
- `/about` — Founder background, AI-assisted development philosophy, technical capabilities, and CV modal.
- `/blog` & `/blog/:slug` — Knowledge base with 5 localized practical small-business articles.
- `/contact` — High-conversion lead capture form with instant 1-tap WhatsApp pre-filled forwarder.
- `/privacy` — Transparent data handling policy.
- `/404` — Clean recovery page.

### 6 Standalone Live Concept Demos
- `/demo/bakery` — Crumb & Crust Bakery (Menu & WhatsApp Ordering)
- `/demo/cafe` — Ceylon Roast Specialty Cafe (Menu, Gallery, Table Reservation)
- `/demo/salon` — The Grooming Lounge Salon (Service Catalog, Appointment Request)
- `/demo/flora` — Petals & Stems Flower Shop (Bouquet Catalog, Greeting Card Input)
- `/demo/real-estate` — Prime Habitat Real Estate (Property Listings, Viewing Requests)
- `/demo/personal-trainer` — Peak Form Fitness Coaching (Training Programs, Consultation Booking)

### Admin Portal (Protected)
- `/admin/login` — Administrative authentication via Firebase Auth.
- `/admin/inquiries` — Real-time inquiry manager with lead status tracking (`new`, `contacted`, `closed`).
- `/admin/projects` — Concept showcase CMS management.
- `/admin/blog` — Knowledge base article management.

---

## 4. Key Improvements & Growth Roadmap
1. **Interactive Price & Package Calculator**: Let potential clients select their needs (e.g. number of pages, WhatsApp ordering, Google Maps registration) and receive an instant transparent estimate with 1-tap WhatsApp handoff.
2. **Sinhala / English Bilingual Toggle**: Provide Sinhala language option for local Sri Lankan business owners.
3. **Before vs. After Comparison**: Clear visual contrast showing the friction of relying solely on social media vs. having a fast Ravana Tech mobile site.
4. **Additional Concepts**: Expand to Doctor/Dental Clinic, Rent-a-Car/Taxi Service, and Boutique Clothing.
5. **Printable QR Code Menu Generator**: Added value for restaurants and cafes.

---

## 5. Official 15-Platform Account Ecosystem & Central Config
All URLs and statuses are maintained centrally in `src/lib/config.ts` under `ACCOUNT_ECOSYSTEM`.

### 🔴 Core Discovery & Leads (8 Accounts)
1. **Facebook Business Page**: `https://web.facebook.com/RavanaTechOfficial` (`active`)
2. **Instagram Professional**: `https://www.instagram.com/ravanatechofficial` (`coming_soon`)
3. **WhatsApp Business**: `https://wa.me/94788470610` (`active`)
4. **LinkedIn (Founder Personal)**: `https://www.linkedin.com/in/shanthapriya-silva` (`coming_soon`)
5. **LinkedIn (Company Page)**: `https://www.linkedin.com/company/ravanatech` (`coming_soon`)
6. **YouTube Channel**: `https://www.youtube.com/@RavanaTechOfficial` (`coming_soon`)
7. **TikTok Business**: `https://www.tiktok.com/@ravanatechofficial` (`coming_soon`)
8. **Threads Profile**: `https://www.threads.net/@ravanatechofficial` (`coming_soon`)

### 🟡 Search & Creative Portfolio (5 Accounts)
9. **Google Business Profile (Search/Maps)**: `https://maps.google.com/?q=Ravana+Tech+Sri+Lanka` (`coming_soon`)
10. **Pinterest Business**: `https://www.pinterest.com/ravanatechofficial` (`coming_soon`)
11. **X (Twitter) Professional**: `https://x.com/RavanaTech` (`coming_soon`)
12. **GitHub Personal & Org**: `https://github.com/ravanatech-official` (`active`)
13. **Behance Portfolio**: `https://www.behance.net/ravanatech` (`coming_soon`)

### 🔵 Freelance Marketplaces (2 Accounts)
14. **Fiverr Pro / Seller**: `https://www.fiverr.com/ravanatech` (`coming_soon`)
15. **Upwork Agency / Freelancer**: `https://www.upwork.com/freelancers/~ravanatech` (`coming_soon`)

### How to update links as you create new accounts:
Simply open `src/lib/config.ts`, find the platform key in `ACCOUNT_ECOSYSTEM`, change `url: '...'` to your live profile link and switch `status: 'active'`. The changes will instantly reflect across the Contact page, Footer, and Navigation across the entire website!

