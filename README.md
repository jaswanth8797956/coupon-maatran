# CouponMaatran (Modernized) • Peer Coupon & Voucher Exchange

A modernized, high-performance web platform designed for closed communities (corporate campuses, college tech parks, trusted teams) to exchange, swap, and share coupons and vouchers without payment gateway complications or financial fees.

Originally inspired by and upgraded from [vatinidian/CouponMaatran](https://github.com/vatinidian/CouponMaatran).

---

## 🚀 Key Modernization Upgrades

| Feature | Original 2019 App | Modern Rebuild |
| :--- | :--- | :--- |
| **Framework & Build** | Create React App (React 16.12) | **React 19 + TypeScript + Vite 6** |
| **Styling & UI** | Raw CSS with Material Icons | **Tailwind CSS v4 + Lucide Icons** |
| **State Management** | Redux 4.0 boilerplate | **React Context + Typed Storage Engine** |
| **Data Persistence** | MongoDB local dependency | **Reactive LocalStorage + Mockable REST API** |
| **Carousel Filtering** | Custom DOM pixel offset calculations | **Smooth Flex Carousel + Multi-Chip Filtering** |
| **Validations** | Basic HTML5 `setCustomValidity` | **Typed Form Validation with humorous safeguards** |
| **Trust & Handshake** | Planned/Conceptual in README | **Fully Interactive Handshake & Secret Code Reveal** |
| **Offers & Negotiation** | Planned/Conceptual in README | **Live In-App Proposal & Counter-Offer Hub** |

---

## 🌟 Core Features

1. **Dynamic Search & Sub-Filter Carousel**:
   - Scrollable filter chips covering categories (*Food & Dining*, *Entertainment*, *Shopping*, *Travel*, *Electronics*, *Subscriptions*), coupon types (*E-Voucher*, *Coupon Code*, *Discount*, *Gift Card*), and exchange types (*Cash*, *Free*, *Exchange*, *Any*).
   - Real-time search by title, description, category, and vendor.

2. **Coupon Cards & Economics**:
   - Compares Face Value vs. Requested Exchange Price with auto-calculated `% OFF` badge.
   - Highlights community giveaways (`FREE`) and coupon barter trades.
   - Expiration alert badges (*"Expiring in X days"*, *"Expired"*).
   - Seller trust ratings (⭐ 4.9) and campus office locations.

3. **Slide-Out Details & Offer Negotiation Drawer**:
   - Detailed terms, redemption URL, and validity schedule.
   - **Confidential Code Reveal**: Secret coupon code/PIN remains securely locked until the seller accepts an incoming offer.
   - Built-in proposal form allowing cash negotiation or coupon trade pitches with custom campus meetup spots (e.g. *Tower B Cafeteria*, *Lobby*).

4. **"Post a Coupon" Form with Original Validations**:
   - Preserves original humorous validation rule: *"Don't be greedy! Exchange price should not be higher than coupon price!"*
   - Start Date & End Date sanity checks.
   - Direct secret code entry for buyer handshake.

5. **Multi-User Simulation / Demo Switcher**:
   - 1-click switcher between demo users (*Jaswanth Kumar*, *Priya Sharma*, *Arun Venkatesh*, *Deepa Natarajan*) to easily test sending and accepting swap proposals in real-time.

6. **Community Trust & Etiquette Page**:
   - Highlights the 4 pillars: 0% Financial Friction, Campus Handshake, Peer Trust Score, and Secret Key Handshake.

---

## 🛠️ Getting Started

### 1. Set as Active Workspace
To work directly on this project in your IDE:
```
Open Folder: C:\Users\jaswa\.gemini\antigravity\scratch\coupon-maatran
```

### 2. Development Server
Run the local dev server:
```bash
cd "C:\Users\jaswa\.gemini\antigravity\scratch\coupon-maatran"
npm run dev
```

### 3. Production Build
```bash
npm run build
```
Built in `< 500ms` using Vite and TypeScript.
