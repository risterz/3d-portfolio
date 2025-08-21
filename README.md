<div align="center">

# 🚀 3D Interactive Portfolio

### *Immersive Portfolio Experience with Next.js & React Three Fiber*

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.15-orange.svg)](https://docs.pmnd.rs/react-three-fiber)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-ff0055.svg)](https://framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*A cutting-edge portfolio website showcasing projects through interactive 3D experiences*

[🌐 Live Demo](https://haris-portfolio.vercel.app) • [📋 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Getting Started](#-getting-started)

---

</div>

## 🌟 Overview

This interactive 3D portfolio represents the intersection of modern web development and immersive user experience design. Built with **Next.js 14** and **React Three Fiber**, it transforms traditional portfolio presentation into an engaging 3D journey through my projects and skills.

### ✨ What Makes It Special

- **🎮 Interactive 3D Elements**: Floating keycaps representing programming skills with full orbital controls
- **⚡ Performance Optimized**: Smooth 60fps animations with lazy loading and code splitting
- **📱 Mobile First**: Responsive design with touch controls and optimized 3D rendering
- **🎨 Modern Design**: Glass morphism, gradient animations, and particle systems
- **🔍 SEO Optimized**: Server-side rendering with proper meta tags and structured data

---

## 📸 Screenshots

<div align="center">

### Hero Section with 3D Particles
*Immersive landing experience with floating geometries and particle field*

![Hero Section](public/images/portfolio/hero-section.png)

### Interactive 3D Keycaps
*Programming skills represented as floating keyboard keys with orbital controls*

![3D Keycaps](public/images/portfolio/3d-keycaps.png)

### Project Showcase
*Click-to-expand project cards with full-size image modals*

![Projects](public/images/portfolio/projects-section.png)

### Mobile Experience
*Fully responsive with touch controls and optimized performance*

![Mobile](public/images/portfolio/mobile-view.png)

</div>

---

## 📋 Features

### 🎯 **Interactive 3D Experience**
- **Floating Keycaps**: Each programming skill represented as a 3D keycap with hover details
- **Orbital Controls**: Drag to rotate, scroll to zoom, touch-friendly navigation
- **Particle Systems**: Dynamic background with 2500+ animated particles
- **Floating Geometries**: Mathematical shapes using golden ratio and Fibonacci sequences

### 🎨 **Modern UI/UX**
- **Glass Morphism**: Translucent cards with backdrop blur effects
- **Gradient Animations**: Dynamic color transitions and neon text effects
- **Smooth Scrolling**: Lenis-powered smooth scroll with section-based navigation
- **Loading States**: Skeleton loaders and progressive enhancement

### 📱 **Responsive Design**
- **Mobile Optimized**: Touch controls for 3D elements
- **Adaptive Sizing**: Dynamic text and component scaling
- **Performance Tuned**: Reduced particle count and optimized rendering on mobile
- **Cross-Browser**: Tested on Chrome, Firefox, Safari, and Edge

### 🚀 **Performance & SEO**
- **Server-Side Rendering**: Fast initial page loads with Next.js 14
- **Code Splitting**: Lazy loading of 3D components
- **Image Optimization**: Next.js automatic image optimization
- **Lighthouse Score**: 95+ performance score

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 14](https://nextjs.org)** - React framework with App Router
- **[React 18](https://reactjs.org)** - Component-based UI library
- **[TypeScript](https://typescriptlang.org)** - Type-safe development

### **3D Graphics & Animation**
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[Three.js](https://threejs.org)** - 3D graphics library
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for R3F
- **[Framer Motion](https://framer.com/motion)** - Production-ready motion library

### **Styling & UI**
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev)** - Beautiful & consistent icons
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

### **Performance & UX**
- **[Lenis](https://github.com/studio-freight/lenis)** - Smooth scroll library
- **[React Hot Toast](https://react-hot-toast.com)** - Toast notifications
- **[React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)** - Viewport-based animations

---

## 🚀 Getting Started

### 📋 **Prerequisites**

- **Node.js 18+** 
- **npm/yarn/pnpm**
- **Git**

### 🔧 **Installation**

```bash
# Clone the repository
git clone https://github.com/risterz/3d-portfolio.git
cd 3d-portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 🏗️ **Build for Production**

```bash
# Build the application
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📁 Project Structure

```
3d-portfolio/
├── 🎯 src/                     # Source code
│   ├── 📂 app/                 # Next.js App Router
│   │   ├── globals.css         # Global styles & animations
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main page with all sections
│   ├── 📂 components/          # React components
│   │   ├── 📂 3d/              # Three.js components
│   │   │   ├── Scene.tsx       # 3D scene wrapper
│   │   │   ├── SkillsConstellation.tsx  # Interactive keycaps
│   │   │   ├── FloatingGeometry.tsx     # Animated shapes
│   │   │   └── ParticleField.tsx        # Particle system
│   │   └── 📂 ui/              # UI components
│   │       ├── Button.tsx      # Reusable button component
│   │       ├── Card.tsx        # Glass morphism cards
│   │       ├── ImageModal.tsx  # Full-screen image viewer
│   │       └── LoadingSpinner.tsx       # Loading states
│   ├── 📂 data/                # Static data
│   │   ├── personal.ts         # Personal information
│   │   ├── projects.ts         # Project showcase data
│   │   ├── skills.ts           # Skills & proficiency
│   │   └── timeline.ts         # Career timeline
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 lib/                 # Utilities & configurations
│   │   ├── analytics.ts        # Event tracking
│   │   └── utils.ts            # Helper functions
│   └── 📂 types/               # TypeScript definitions
├── 📂 public/                  # Static assets
│   ├── 📂 images/              # Optimized images
│   │   └── 📂 projects/        # Project screenshots
│   ├── 📂 models/              # 3D models (if any)
│   └── 📂 textures/            # 3D textures
├── 📄 next.config.js           # Next.js configuration
├── 📄 tailwind.config.js       # Tailwind CSS config
├── 📄 tsconfig.json            # TypeScript configuration
└── 📄 package.json             # Dependencies & scripts
```

---

## 🎨 Key Components

### **3D Skills Constellation**
Interactive keycaps representing programming skills with:
- **Orbital Controls**: Full 360° rotation and zoom
- **Hover Effects**: Skill details and proficiency levels  
- **Mobile Touch**: Optimized touch controls
- **Mathematical Positioning**: Fibonacci spiral arrangement

### **Particle Field System**
Dynamic background with:
- **2500+ Particles**: Color-coded floating points
- **Performance Optimized**: 60fps on most devices
- **Interactive**: Responds to user interaction
- **Customizable**: Easy to modify count and colors

### **Image Modal System**
Full-screen project showcase:
- **Keyboard Navigation**: Arrow keys and ESC support
- **Multi-Image Support**: Gallery-style browsing
- **Mobile Optimized**: Touch-friendly navigation
- **Error Handling**: Graceful fallbacks

---

## 🎯 Performance Optimizations

### **3D Rendering**
- **Frustum Culling**: Only render visible objects
- **Level of Detail**: Reduced complexity on mobile
- **Efficient Materials**: Shared materials and textures
- **Animation Optimization**: RequestAnimationFrame usage

### **Code Splitting**
- **Component-Level**: Lazy loading of 3D components
- **Route-Level**: Next.js automatic code splitting
- **Dynamic Imports**: Load heavy libraries on demand

### **Image Optimization**
- **Next.js Image**: Automatic WebP conversion
- **Responsive Images**: Multiple sizes for different viewports
- **Lazy Loading**: Images load as they enter viewport
- **Placeholder Blur**: Smooth loading experience

---

## 🎮 Interactive Features

### **3D Navigation**
- **Mouse Controls**: Left-click drag to rotate
- **Scroll Zoom**: Mouse wheel to zoom in/out
- **Touch Support**: Pinch-to-zoom and touch rotation
- **Keyboard**: Arrow keys for navigation

### **Responsive Animations**
- **Scroll-Triggered**: Animations based on scroll position
- **Intersection Observer**: Efficient viewport detection
- **Reduced Motion**: Respects user accessibility preferences
- **Performance Aware**: Adapts to device capabilities

---

## 🔧 Customization

### **Personal Data**
Update your information in `src/data/`:
- `personal.ts` - Contact info and bio
- `projects.ts` - Project showcase
- `skills.ts` - Technical skills
- `timeline.ts` - Career journey

### **Styling**
- **Colors**: Modify `tailwind.config.js` for custom color scheme
- **Animations**: Update `globals.css` for custom animations
- **3D Elements**: Adjust parameters in 3D components

### **Performance**
- **Particle Count**: Reduce for lower-end devices
- **3D Complexity**: Adjust geometry detail levels
- **Animation Speed**: Modify frame rates and timing

---

## 🌐 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Netlify**
```bash
# Build command
npm run build

# Publish directory
out
```

### **Traditional Hosting**
```bash
# Static export
npm run build
npm run export
```

---

## 📊 Analytics & Tracking

The portfolio includes event tracking for:
- **Section Views**: Track which sections users engage with
- **3D Interactions**: Monitor keycap hovers and rotations
- **Project Clicks**: Track project interest and engagement
- **Contact Form**: Monitor inquiry submissions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **💾 Commit** changes: `git commit -m 'Add amazing feature'`
4. **📤 Push** to branch: `git push origin feature/amazing-feature`
5. **🔄 Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **Libraries & Tools**
- **[Vercel](https://vercel.com)** - Deployment and hosting platform
- **[React Three Fiber Team](https://github.com/pmndrs)** - Amazing 3D React ecosystem
- **[Tailwind Labs](https://tailwindlabs.com)** - Beautiful utility-first CSS
- **[Framer](https://framer.com)** - Smooth animation library

### **Inspiration**
- **Modern Web Design** - Glass morphism and 3D trends
- **Interactive Portfolios** - Creative developer showcases
- **3D Web Experiences** - Immersive web applications

---

<div align="center">

### 🌟 **If you found this portfolio inspiring, please consider giving it a star!** 🌟

**[🐛 Report Bug](https://github.com/risterz/3d-portfolio/issues)** • **[✨ Request Feature](https://github.com/risterz/3d-portfolio/issues)** • **[💬 Discussions](https://github.com/risterz/3d-portfolio/discussions)**

---

*Crafted with ❤️ and lots of ☕ by [Haris Al-Harraz](https://github.com/risterz)*

**[🌐 Portfolio](https://haris-portfolio.vercel.app) • [💼 LinkedIn](https://linkedin.com/in/haris-alharraz) • [📧 Email](mailto:harisintern@gmail.com)**

</div>