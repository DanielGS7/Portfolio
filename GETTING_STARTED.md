# 🚀 Getting Started with Your Webcave Portfolio

## ✅ What's Been Built

Your portfolio site is now complete with:

### Core Features
- ✨ **Stunning animations** with Framer Motion
- 🌙 **Dark/Light mode** with circular ripple transition effect
- 🌍 **Multi-language support**: Dutch (default), English, and French
- 💎 **Glassmorphism design** throughout
- 📱 **Fully responsive** on all devices
- 🎨 **Custom color scheme** based on Empowered by YUM

### Pages & Sections
1. **Home Page** (`/`)
   - Hero section with your name and tagline
   - About section (entrepreneurship, LLM expertise, youth work)
   - Skills section (technical skills + certifications)
   - Projects section (MonoGame, Empowered by YUM, De Pioniers)
   - Services section

2. **Contact Page** (`/contact`)
   - Click-to-copy email and phone
   - Links to LinkedIn, Teams, WhatsApp

3. **CV Page** (`/cv`)
   - PDF viewer with download button

## 📝 Next Steps - Required Actions

### 1. Add Your Content

#### A. Contact Information
Edit `/app/[locale]/contact/page.tsx` (around line 15):
```typescript
const contactInfo = {
  email: 'your.real.email@example.com',  // ← Update
  phone: '+32 xxx xxx xxx',               // ← Update
  linkedin: 'https://linkedin.com/in/your-profile',  // ← Update
  teams: 'your.email@example.com',        // ← Update
  whatsapp: '+32xxxxxxxxx',               // ← Update
};
```

#### B. Upload Your CV
1. Create the folder: `public/cv/`
2. Add your PDF: `public/cv/Daniel_Garriga_Segui_CV.pdf`

#### C. Add Project Media
1. Create folders: `public/images/` and `public/videos/`
2. Upload:
   - `public/videos/monogame-demo.mp4` - Your game demo video
   - `public/images/empowered.jpg` - Empowered by YUM screenshot
   - `public/images/pioneers.jpg` - De Pioniers site screenshot

#### D. Customize Translations (Optional)
Edit content in:
- `/lib/i18n/locales/nl.json` - Dutch
- `/lib/i18n/locales/en.json` - English
- `/lib/i18n/locales/fr.json` - French

### 2. Test Locally

```bash
# Install dependencies (if not done)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 3. Deploy to GitHub Pages

#### Option A: Automatic (Recommended)
1. Push your changes to the `main` branch
2. Go to your GitHub repo → Settings → Pages
3. Source: Select "GitHub Actions"
4. Wait ~2 minutes for the build
5. Your site will be live at: `https://danielgs7.github.io/Portfolio/`

#### Option B: Manual
```bash
npm run build
# The static site is in the /out folder
```

## 🎨 Customization Guide

### Change Colors
Edit `/app/globals.css`:
- Lines 4-33: Light mode colors
- Lines 36-65: Dark mode colors

### Add a New Section
1. Create file: `/components/sections/your-section.tsx`
2. Add to `/app/[locale]/page.tsx`:
   ```tsx
   import { YourSection } from '@/components/sections/your-section';

   // Add in the return:
   <YourSection />
   ```

### Add Custom SVG Graphics
Add to `/components/svg/` and import where needed

## 🐛 Troubleshooting

### Build Fails
```bash
npm run build
```
Check the error message and ensure all required files exist.

### Missing Translations
If you see "MISSING_MESSAGE" errors, add the missing keys to all three locale files (nl.json, en.json, fr.json).

### Images Not Showing
- Ensure images are in the `public/` folder
- Use absolute paths: `/images/yourimage.jpg`
- Check file names match exactly (case-sensitive)

## 📚 Project Structure

```
Portfolio/
├── app/
│   ├── [locale]/          # Dutch/English/French pages
│   │   ├── page.tsx       # Home page
│   │   ├── contact/       # Contact page
│   │   └── cv/            # CV viewer page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Styles & colors
├── components/
│   ├── sections/          # Page sections (hero, about, etc.)
│   ├── layout/            # Header & footer
│   ├── ui/                # Theme toggle, language switcher
│   └── svg/               # Custom SVG graphics
├── lib/
│   ├── i18n/              # Translations (nl/en/fr)
│   ├── hooks/             # Theme provider
│   └── utils/             # Utilities
└── public/                # Static files
    ├── cv/                # ← ADD YOUR CV HERE
    ├── images/            # ← ADD IMAGES HERE
    └── videos/            # ← ADD VIDEOS HERE
```

## 🎯 Quick Checklist

- [ ] Update contact information
- [ ] Upload CV PDF
- [ ] Add project images/videos
- [ ] Test the site locally (`npm run dev`)
- [ ] Review all translations
- [ ] Check all links work
- [ ] Test dark/light mode toggle
- [ ] Test language switching
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Visit your live site!

## 💡 Tips

1. **Start with contact info** - This is the most important for recruiters
2. **Add your CV next** - Make sure it's a clean, professional PDF
3. **Test on mobile** - Open on your phone to check responsiveness
4. **Share the link** - Add it to your LinkedIn, resume, and email signature

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- All code is commented for clarity
- The site is built with modern best practices

---

**Your portfolio is ready to impress!** 🎉

Good luck with your internship search! 🚀
