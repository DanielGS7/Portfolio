# Webcave - Daniel Garriga Segui's Portfolio

A modern, animated portfolio website built with Next.js, featuring multi-language support (Dutch, English, French), dark/light mode toggle with stunning animations, and glassmorphism design.

## 🚀 Features

- ✨ **Smooth Animations**: Framer Motion powered animations throughout
- 🌙 **Dark/Light Mode**: Beautiful theme toggle with circular ripple transition
- 🌍 **Multi-language**: Support for Dutch (default), English, and French
- 💎 **Glassmorphism**: Modern glass-effect UI elements
- 📱 **Fully Responsive**: Perfect on mobile, tablet, and desktop
- 🎨 **Custom Color Scheme**: Based on Empowered by YUM brand colors
- ⚡ **Fast Performance**: Optimized with Next.js 15 and Turbopack

## 📋 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DanielGS7/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Content Updates

### 1. Contact Information
Update your contact details in `/app/[locale]/contact/page.tsx`:
```typescript
const contactInfo = {
  email: 'your.email@example.com',
  phone: '+32 xxx xxx xxx',
  linkedin: 'https://linkedin.com/in/your-profile',
  teams: 'your.email@example.com',
  whatsapp: '+32xxxxxxxxx',
};
```

### 2. Upload Your CV
1. Create the folder: `/public/cv/`
2. Add your CV as: `/public/cv/Daniel_Garriga_Segui_CV.pdf`

### 3. Add Project Media
Upload your project assets to:
- MonoGame video: `/public/videos/monogame-demo.mp4`
- Project screenshots: `/public/images/empowered.jpg`, `/public/images/pioneers.jpg`

### 4. Update Translations
Edit content in:
- Dutch: `/lib/i18n/locales/nl.json`
- English: `/lib/i18n/locales/en.json`
- French: `/lib/i18n/locales/fr.json`

## 🎨 Customization

### Colors
Modify colors in `/app/globals.css` under `:root.light` and `:root.dark`

### Adding New Sections
1. Create component in `/components/sections/your-section.tsx`
2. Import and add to `/app/[locale]/page.tsx`

### SVG Graphics
Add custom SVGs in `/components/svg/`

## 🚀 Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages in repository settings
4. Set source to "GitHub Actions"

### Manual Build
```bash
npm run build
```

The static site will be in the `/out` directory.

## 📦 Project Structure

```
Portfolio/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── contact/       # Contact page
│   │   ├── cv/            # CV viewer page
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components (header, footer)
│   ├── sections/          # Page sections (hero, about, etc.)
│   ├── svg/               # Custom SVG graphics
│   └── ui/                # UI components (theme toggle, etc.)
├── lib/
│   ├── constants/         # Color constants
│   ├── hooks/             # Custom hooks (theme)
│   ├── i18n/              # Internationalization
│   └── utils/             # Utility functions
└── public/                # Static assets
    ├── cv/                # CV PDF
    ├── images/            # Images
    └── videos/            # Videos
```

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Deployment**: GitHub Pages

## 📱 Pages

1. **Home** (`/`) - Hero, About, Skills, Projects, Services sections
2. **Contact** (`/contact`) - Contact information with copy-to-clipboard
3. **CV** (`/cv`) - PDF viewer with download option

## 🎯 To-Do

- [ ] Upload CV PDF
- [ ] Add project images/videos
- [ ] Update contact information
- [ ] Customize content in translation files
- [ ] Add Lottie animations (optional)
- [ ] Create custom logo for "Webcave"

## 📄 License

Personal portfolio - All rights reserved © 2025 Daniel Garriga Segui

## 🤝 Credits

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
Color scheme inspired by Empowered by Superfoods
