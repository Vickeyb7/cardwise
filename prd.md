# Product Requirements Document (PRD)

**Product Name:** CardWise  
**Product Category:** Fintech / Personal Finance  
**Target Market:** India  
**Target Platforms:** Web (Responsive Desktop & Mobile PWA)  
**Version:** 1.0 (Production-Ready MVP)  
**Status:** Implemented & Verified  

---

## 1. Executive Summary & Vision

### 1.1 Problem Statement
Indian credit card holders frequently possess between 2 to 6 credit cards across multiple issuers (e.g. HDFC Bank, Axis Bank, SBI Card, ICICI Bank, American Express, IDFC FIRST Bank). Each card operates with a labyrinth of reward mechanisms:
- Accelerated points on select merchant categories (e.g. 5X–10X on travel portals vs 1% base).
- Merchant-specific flat cashback (e.g. 5% on online shopping, 10% on food apps).
- Hard monthly reward caps (e.g. SBI Cashback ₹5,000/month, HDFC SmartBuy daily/monthly caps).
- Varying point-to-rupee valuation ratios (₹0.20 to ₹1.00 per point).
- Complex exclusions (fuel, utilities, wallet loads, rent).

Because comparing reward structures manually during transactions is cognitively overwhelming, users leave thousands of rupees in rewards on the table each year.

### 1.2 Solution
**CardWise** is an intelligent credit card rewards optimizer designed specifically for the Indian banking ecosystem. It enables users to:
1. Sign in instantly using their Google / Gmail account.
2. Select the credit card products they own (without entering sensitive card details).
3. Input a transaction amount, merchant name, or purchase category.
4. Receive instant, mathematically optimal card recommendations with itemized rupee-value breakdowns.
5. Track monthly reward caps, annual milestone projections, and historical arbitrage gaps.
6. Monitor bank policy devaluations and RBI regulatory changes in real time.

### 1.3 Zero-Sensitive-Data Architecture (Core Philosophy)
CardWise strictly operates on **publicly available reward tier rules**.
- **No credit card numbers or 16-digit PANs.**
- **No CVVs or expiry dates.**
- **No net banking passwords or OTPs.**
- Only the generic credit card product model (e.g. "HDFC Infinia" or "SBI Cashback") is linked to the user's account.

---

## 2. Target Personas

### Persona A: The Multi-Card Everyday Shopper (Priya)
- **Profile:** 28, Senior Marketing Associate in Bengaluru.
- **Card Arsenal:** HDFC Millennia, Amazon Pay ICICI, Swiggy HDFC.
- **Pain Point:** Frequently shops across Amazon, Blinkit, and Zomato; forgets which card provides 5% vs 1% or whether grocery purchases qualify for accelerated cashback.
- **Need:** Instant recommendation when checking out or budgeting.

### Persona B: The Travel & Points Maximizer (Rahul)
- **Profile:** 35, Tech Lead in Mumbai.
- **Card Arsenal:** HDFC Infinia, Axis Atlas, Amex Platinum Travel, SBI Cashback.
- **Pain Point:** Maximizing EDGE Miles vs SmartBuy points; keeping track of monthly reward caps so accelerated spend isn't wasted at 1% base rates.
- **Need:** Comprehensive breakdown of point valuations (₹/pt), milestone trackers, and monthly cap utilization alerts.

---

## 3. Product Goals & Non-Goals

### Goals
1. **Deterministic Optimization:** Provide instantaneous, transparent, and auditable calculations showing expected points, cashback, and net monetary rupee yield.
2. **Cap-Aware Routing:** Automatically track monthly cashback caps (e.g. ₹5,000 SBI Cashback cap) and fallback to secondary cards when exhausted.
3. **Public Bank Rules RAG:** Ground all calculations in official terms and conditions from HDFC, Axis, SBI, ICICI, etc.
4. **Frictionless Google Auth:** Enable 1-click Google / Gmail login so users can sync their card vault across mobile and desktop devices.
5. **Fluid Glassmorphism & Micro-Interactions:** Deliver a tactile, premium fintech experience utilizing WebGL shaders, liquid glass water physics, and sound synthesis.

### Non-Goals (Explicitly Out of Scope)
1. **Payment Processing:** CardWise does not process payments or initiate gateway charges.
2. **Storing Sensitive Credentials:** Never store card numbers, CVVs, or OTPs.
3. **SMS Scraping:** No background scraping of transactional SMS messages.
4. **Credit Card Applications:** CardWise is an unbiased optimizer, not an aggressive credit affiliate bazaar.

---

## 4. Feature Specifications

### 4.1 Feature 1: User Authentication & Cloud Sync
- **Google / Gmail Authentication:** Instant 1-click sign-in powered by Firebase Auth (`GoogleAuthProvider`).
- **Cloud Firestore Persistence:** User credit card portfolios, cap usage, and display preferences saved securely under `/users/{userId}`.
- **Cross-Device Sync:** Real-time listeners (`onSnapshot`) sync additions/removals across mobile and desktop.
- **Guest Fallback:** Full application functionality available in local storage mode without mandatory login.

### 4.2 Feature 2: Credit Card Portfolio Vault
- **Supported Banks:** HDFC Bank, Axis Bank, SBI Card, ICICI Bank, American Express, IDFC FIRST Bank, Airtel Axis, Tata Neu, etc.
- **Card Management:** Add, remove, and inspect cards with realistic 3D tactile card representations.
- **Executive KPI Strip:** Active card count, estimated annual rewards earned, annual fees payable, and 100% official verification badge.
- **Card Dossier:** Point currency names, point conversion rates, forex markup percentages, fee waiver targets, and direct links to official bank documentation.

### 4.3 Feature 3: Real-Time Purchase Reward Optimizer
- **Inputs:**
  - Purchase Amount (₹).
  - Merchant Name (with autocomplete for Amazon, Flipkart, Swiggy, Zomato, Uber, MakeMyTrip, Tata Neu, etc.).
  - Spend Category (Online Shopping, Flights, Hotels, Dining, Grocery, Utilities, Fuel).
  - Channel (Online vs POS/Offline).
- **Calculations & Output:**
  - Evaluates user's owned cards and ranks them by net rupee yield.
  - Displays points earned, effective reward rate (%), and net rupee value.
  - Identifies the "Best Card to Use" with accelerated rules applied.
  - Warns if the purchase hits a monthly cap or is an excluded category (e.g. fuel or rent).
  - Highlights the "Best in India" card if the user does not currently own the optimal card.

### 4.4 Feature 4: Analytics & Historical Arbitrage
- **6-Month Points Comparison (Bar Chart):** Recharts visualization comparing accumulated points versus optimal potential points.
- **Arbitrage Yield Breakdown:** Highlighting the root causes of unclaimed rewards (SmartBuy multipliers, flat 5% online shopping, co-branded dining).
- **Annual Projection Sparkline:** 12-month cumulative growth curve projecting total annual savings.

### 4.5 Feature 5: Policy Radar (Knowledge Base & RAG)
- **Devaluation Alerts:** Up-to-date tracking of reward reductions (e.g. Axis Atlas milestone adjustments, HDFC lounge access spend criteria).
- **Bank Terms & Conditions Search:** Verified documentation references with direct bank portal links.

---

## 5. UI/UX Design Standards

- **Top Bar Contract:** Clean brand mark, centralized liquid glass navigation dock, and right-hand action controls.
- **Liquid Glass Navbar ("Waterline"):** WebGL water droplet shader that stretches toward clicked tabs, splits on jumps, and merges with a ripple effect; synthesized WebAudio "plip" sound; eligible fintech icons (`Sparkles`, `CreditCard`, `TrendingUp`, `Layers`, `Radar`).
- **Liquid Metal Shader Buttons:** WebGL liquid metal fragment shader with interactive 3D perspective and click ripples applied to primary actions (*"Optimize ₹ Spend"* and *"Add More Cards"*).
- **Glassmorphism Theme System:** Unified `backdrop-blur-xl bg-white/70 dark:bg-[#121318]/70 border-white/20 dark:border-white/10` across all cards, navigation bars, and data containers.
- **Dual Visual Modes:** Classic Wealth Light Mode and Obsidian Reserve Dark Mode.

---

## 6. Success Metrics & KPIs

| Metric | Target |
| :--- | :--- |
| **Recommendation Latency** | < 50ms (deterministic client-side calculation) |
| **Cloud Sync Latency** | < 500ms over Firestore real-time websockets |
| **Rule Accuracy** | 100% alignment with official bank terms |
| **Authentication Drop-off** | < 5% via 1-click Google OAuth flow |
