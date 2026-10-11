# CCAT Master Pro Prep 🎯

An authentic, high-fidelity **Criteria Cognitive Aptitude Test (CCAT)** preparation and simulation platform. Built with React 19, Vite, Tailwind CSS, and pure mathematical vector SVGs.

Designed to train test-takers to reach the **45+ Elite Protocol** score under official test conditions: **50 questions in 15 minutes** (18 seconds per question) with strict forward-only progression and zero backtracking.

---

## 🔗 Repository & Live Deployment

- **Live Application (Vercel):** [https://ccat-test.vercel.app](https://ccat-test.vercel.app) *(also accessible directly via the **"Production"** link under Deployments in the GitHub sidebar)*
- **GitHub Repository:** [https://github.com/yatharthsachdeva23/CCAT-Test](https://github.com/yatharthsachdeva23/CCAT-Test)
- **Deployment Platform:** Deployed on **[Vercel](https://vercel.com/)** with automated CI/CD builds on every git push.

---

## 🌟 Key Features

- **57 Unique Full Simulations (2,850 Questions):**
  - **Tests 1–30:** Original baseline practice suite with authentic CCAT question archetypes.
  - **Tests 31–57:** Brand new pristine suite with 100% non-repeating questions, unique mathematical scenarios, advanced verbal analogies, and randomized vector spatial transformations.
- **Authentic CCAT Distribution per Test:**
  - **22 Math & Logic Questions:** Word problems, work rates, velocity, probability, number series, modular arithmetic.
  - **17 Verbal Reasoning Questions:** Advanced vocabulary antonyms, analogies, classification odd-one-out, sentence completions, logic syllogisms.
  - **11 Spatial Reasoning Questions:** 3×3 matrices, next-in-series progressions, odd-one-out figures, spatial folding, shape analogies.
- **Strict Forward-Only Engine:**
  - True to the real CCAT: once a question is answered or skipped, you cannot go back.
  - 15:00 countdown timer with auditory warnings at 5:00 and 1:00 remaining.
- **1-Minute UltraFast Sprint Mode:**
  - Rapid-fire drill mode to train snap pattern-recognition and sub-8-second execution.
- **AI Speed Coach (Google Gemini Integration):**
  - Instant question explanations, speed elimination shortcuts, and personalized cognitive diagnostic breakdowns.
- **Pure Vector SVGs:**
  - Every spatial diagram is rendered natively in scalable SVG with zero raster blurring or color giveaways.

---

## 🔒 Data Privacy & Multi-User Architecture

### 100% Client-Side Isolated Storage
- **Zero Shared Databases or Telemetry:** All test attempts, response histories, and personal analytics are stored strictly within the user's browser using `localStorage`.
- **Fresh for Everyone on GitHub:** When you upload this repository to GitHub or host it publicly, **your personal test history is never committed to Git**. Anyone who clones the repo or visits your deployment starts with a **100% clean, fresh profile** (0 attempts, 57 unattempted tests).
- **One-Click Backup & Restore:**
  - **Backup Progress (JSON):** Click the **"Backup Progress (JSON)"** button on the Dashboard to save a timestamped copy of all your completed tests and scores to your computer.
  - **Restore Progress:** Upload your backup JSON file at any time on any device to restore your exact progress.
  - **Reset to Fresh:** Want to practice from scratch or let a friend test on your device? Click **"Reset to Fresh"** to reset your local browser state without affecting your saved JSON backups.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `pnpm`

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/yatharthsachdeva23/CCAT-Test.git

# 2. Navigate into the project directory
cd CCAT-Test

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser to [http://localhost:5173/](http://localhost:5173/) to start practicing.

---

## 🤖 Optional: Setting Up AI Coach (Google Gemini)

The AI Coach and real-time speed shortcuts use Google's free Gemini API.

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and paste your API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
4. Restart your Vite development server (`npm run dev`).

*(Note: `.env` is already configured in `.gitignore` so your personal API key will never be pushed to GitHub.)*

---

## 📦 Production Build & Deployment

### Build for Production Locally
```bash
npm run build
```
This bundles the optimized production app into the `dist/` directory.

### Deploying on Vercel (Recommended & Configured)
This project is pre-configured for **Vercel** with custom single-page app rewrites (`vercel.json`):

1. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com/) and click **"Add New"** > **"Project"**.
   - Select your GitHub repository: `yatharthsachdeva23/CCAT-Test`.
2. **Build & Output Settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Environment Variables (Optional):**
   - If you want the live AI Coach enabled on your public deployment, add `VITE_GEMINI_API_KEY` under Vercel's **Environment Variables** settings.
4. **Instant CI/CD:**
   - Click **Deploy**. Every push to the repository automatically triggers an instant, zero-downtime production deployment on Vercel!

---

## 🛠️ Project Structure

```
├── src/
│   ├── components/         # React UI Components (Dashboard, TestRunner, ScoreReview, AICoach, SVG Renderer)
│   ├── data/
│   │   ├── testCatalog.js      # Procedural 50-question test synthesizer for Tests 1–57
│   │   ├── newSuiteMath.js     # 594 math questions for Tests 31–57 (100% unique templates)
│   │   ├── newSuiteVerbal.js   # 459 verbal questions for Tests 31–57 (100% unique vocabulary/analogies)
│   │   ├── newSuiteSpatial.js  # 297 procedural spatial SVGs for Tests 31–57
│   │   ├── mathBank.js         # Math question bank for Tests 1–30
│   │   ├── verbalBank.js       # Verbal question bank for Tests 1–30
│   │   ├── spatialBank.js      # Spatial SVG bank for Tests 1–30
│   │   └── patternEngine.js    # Speed analytics, time-trap detection & scoring
│   ├── services/           # Gemini AI coaching & speed tricks
│   ├── utils/
│   │   └── storage.js          # Lightweight attempt serializer, backup/restore & localStorage handlers
│   ├── App.jsx             # Main routing & state controller
│   └── main.jsx            # Application entrypoint
├── scripts/                # Suite generation, validation & audit scripts
├── public/                 # Static assets & icons
├── vercel.json             # Vercel SPA routing rewrite configuration
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules (protects API keys, user backups & node_modules)
└── vite.config.js          # Vite configuration with Tailwind CSS & relative base path
```

---

## 📜 Disclaimer
This software is an independent educational training tool designed for cognitive aptitude enhancement and CCAT preparation. It is not affiliated with, endorsed by, or associated with Criteria Corp.
