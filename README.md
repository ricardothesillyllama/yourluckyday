# 今日大吉 · Your Lucky Day — PWA

A bilingual (Chinese/English) Progressive Web App for daily fortune,
lucky numbers, directions, horoscope, lottery picks & mini games.

---

## 🚀 Deploy in 10 minutes (free, no coding needed)

### Step 1 — Create icons (required)
The app needs 2 PNG icon files. Create them for free:

1. Go to https://www.canva.com (free account)
2. Create a 512×512px design:
   - Dark red background (#1e0a0a)
   - Golden "大吉" text in center
   - Export as PNG → save as `icon-512.png`
3. Resize to 192×192 → save as `icon-192.png`
4. Put both files in the `public/icons/` folder

**Quick alternative:** Use https://favicon.io/favicon-generator/
- Text: 大吉  |  Background: #1e0a0a  |  Color: #FFD700
- Download and rename files to icon-192.png and icon-512.png


### Step 2 — Add your Claude API key
The horoscope feature calls the Claude API. You need to proxy this
securely — never put your API key in frontend code.

**Option A: Vercel Edge Function (recommended)**

Create the file `api/fortune.js`:
```js
export const config = { runtime: "edge" };

export default async function handler(req) {
  const body = await req.json();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
```

Then in `src/App.jsx`, change the fetch URL from:
```
https://api.anthropic.com/v1/messages
```
to:
```
/api/fortune
```

**Option B: Skip for now**
The app works perfectly without the AI horoscope — it just shows a
static fallback message. You can add the API key later.


### Step 3 — Deploy to Vercel (free)

1. Go to https://github.com and create a free account
2. Create a new repository called `your-lucky-day`
3. Upload all these files to the repository
4. Go to https://vercel.com → sign in with GitHub
5. Click "New Project" → import your repository
6. Vercel auto-detects Vite — just click **Deploy**
7. Your app is live at `https://your-lucky-day.vercel.app`

**Add your API key to Vercel:**
- Vercel Dashboard → your project → Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your key from https://console.anthropic.com


### Step 4 — Custom domain (optional, ~$12/year)
- Buy a domain at Namecheap or GoDaddy (e.g. `jrida.app` or `yourluckyday.com`)
- In Vercel: Settings → Domains → add your domain
- Follow the DNS instructions (takes ~10 min)


---

## 💰 Monetization setup

### Google AdSense (web ads)
1. Apply at https://adsense.google.com (needs your live URL)
2. Once approved, replace the `[ AdSense — replace with your ad unit ]`
   placeholder in `src/App.jsx` AdBanner component with your real
   `<ins class="adsbygoogle">` code

### $0.99 payment (remove ads + unlock lottery)
Currently uses `localStorage` simulation. To accept real payments:

**Stripe (easiest for US):**
1. Sign up at https://stripe.com
2. Create a product priced at $0.99
3. Use Stripe Payment Links — no coding needed
4. Replace the `unlock` function's `alert()` with a redirect to your
   Stripe payment link
5. Use Stripe webhooks to confirm payment and set the premium flag

**LemonSqueezy (alternative, simpler):**
https://www.lemonsqueezy.com — even simpler than Stripe for solo
developers, handles tax automatically


---

## 📱 How users "install" the PWA

**iPhone (Safari):**
1. Open your URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down → "Add to Home Screen"
4. App appears on home screen like a native app!

**Android (Chrome):**
1. Open your URL in Chrome
2. Tap the 3-dot menu
3. "Add to Home screen" or "Install app"

**Share this instruction** with your users — add it to your app's
welcome screen or a simple "How to install" page.


---

## 🔌 WeChat sharing (important!)

For WeChat sharing to work with a preview image, add this to your
`index.html` (already included):
```html
<meta property="og:image" content="/icons/icon-512.png" />
```
When someone shares your URL in WeChat, it will show the 大吉 icon
and description automatically.


---

## 📂 File structure

```
your-lucky-day/
├── index.html          ← PWA shell with all meta tags
├── vite.config.js      ← Build config with PWA plugin
├── package.json        ← Dependencies
├── src/
│   ├── main.jsx        ← React entry point
│   └── App.jsx         ← Full app (edit this to customize)
├── public/
│   ├── manifest.json   ← PWA manifest (app name, colors, icons)
│   └── icons/
│       ├── favicon.svg ← Browser tab icon (auto-generated)
│       ├── icon-192.png  ← YOU NEED TO CREATE THIS (see Step 1)
│       └── icon-512.png  ← YOU NEED TO CREATE THIS (see Step 1)
└── api/
    └── fortune.js      ← Create this for Claude API proxy (Step 2)
```


---

## 🛠 Local development (optional)

If you want to test locally before deploying:
```bash
npm install
npm run dev
```
Open http://localhost:5173

To build for production:
```bash
npm run build
```
