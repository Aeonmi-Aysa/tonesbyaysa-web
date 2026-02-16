# Tones by Aysa - Web App

Progressive Web App for frequency wellness.

## 🚀 Live Site
https://tonesbyaysa.netlify.app

## ✨ Features
- **Manifestation Hub** - Set intentions and track progress
- **Frequency Composer** - Create custom 6-layer frequency baths
- **Favorites** - Save and organize your favorite frequencies
- **420+ Frequencies** - Complete library across 22 categories
- **86 Frequency Baths** - Pre-built wellness combinations

## 🛠️ Tech Stack
- HTML5, JavaScript, CSS3
- Web Audio API
- Supabase (Auth & Database)
- Stripe (Payments)
- Netlify (Hosting & Functions)

## 🏃 Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Aeonmi-Aysa/tonesbyaysa-web.git
   cd tonesbyaysa-web
   ```

2. **Set up environment:**
   ```bash
   cp _config.js.example _config.js
   ```
   Then edit `_config.js` with your real Supabase and Stripe keys.

3. **Run a local server:**
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using Node.js
   npx http-server -p 8080
   ```

4. **Open in browser:**
   ```
   http://localhost:8080/login.html
   ```

## 🔐 Environment Variables

For local development, create `_config.js` (gitignored):

```javascript
window.ENV = {
  SUPABASE_URL: 'your-supabase-url',
  SUPABASE_ANON_KEY: 'your-anon-key',
  STRIPE_PUBLISHABLE_KEY: 'your-stripe-key'
};
```

For Netlify deployment, set these in the Netlify dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 📦 Deployment

Deploys automatically to Netlify on push to `main` branch.

### Build Settings (Netlify):
- **Base directory:** `.`
- **Build command:** `node scripts/inject-env.js`
- **Publish directory:** `.`

## 📂 Key Files
- `login.html` - Authentication page
- `app.html` - Main dashboard
- `manifestation.html` - Manifestation hub
- `composer.html` - Frequency composer
- `favorites.html` - Favorites manager
- `scripts/inject-env.js` - Environment injection for production

## 🤝 Related Repositories
- [Mobile App](https://github.com/Aeonmi-Aysa/tonesbyaysa) - React Native iOS/Android app

## 📄 License
MIT License
