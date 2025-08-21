# 🚀 Deployment Guide

This guide covers various deployment options for the 3D Portfolio project.

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git installed and configured

## 🌐 Vercel Deployment (Recommended)

Vercel provides the best experience for Next.js applications with automatic optimizations.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/risterz/3d-portfolio)

### Manual Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# From project root
vercel

# Follow prompts to configure
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N (for first deployment)
# - Project name: 3d-portfolio
# - Directory: ./
# - Override settings: N
```

4. **Production Deployment**
```bash
vercel --prod
```

### Environment Variables

Set up environment variables in Vercel dashboard:
- `NEXT_PUBLIC_ANALYTICS_ID` (if using analytics)
- `NEXT_PUBLIC_SITE_URL` (your domain)

## 🌍 Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: (leave empty)

2. **Environment Variables**
   - Add same variables as Vercel section

3. **Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands
```bash
# Build image
docker build -t 3d-portfolio .

# Run container
docker run -p 3000:3000 3d-portfolio
```

## ☁️ Cloud Platform Deployments

### AWS Amplify

1. Connect your GitHub repository
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: out
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Google Cloud Platform

1. **Install Google Cloud CLI**
2. **Deploy to Cloud Run**
```bash
# Build and deploy
gcloud run deploy 3d-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**
```bash
heroku create your-portfolio-name
```

3. **Add buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

4. **Deploy**
```bash
git push heroku main
```

## 📊 Performance Optimization for Production

### Next.js Configuration

Update `next.config.js` for production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['three'],
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  generateEtags: false,
  poweredByHeader: false,
}

module.exports = nextConfig
```

### Environment Variables

Create `.env.production`:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NODE_ENV=production
```

## 🔧 Build Optimization

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true npm run build",
    "export": "next export"
  }
}
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
npm run analyze
```

## 🌐 CDN and Caching

### Cloudflare Setup

1. **DNS Settings**
   - Add your domain to Cloudflare
   - Update nameservers

2. **Page Rules**
   - Cache everything: `your-domain.com/*`
   - Browser cache TTL: 1 year for static assets

3. **Performance Settings**
   - Enable Auto Minify (HTML, CSS, JS)
   - Enable Brotli compression
   - Enable HTTP/2

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Clear `.next` folder: `rm -rf .next`
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

2. **3D Rendering Issues**
   - WebGL not supported: Add fallback detection
   - Performance on mobile: Reduce particle count
   - Memory leaks: Ensure proper cleanup in useEffect

3. **Environment Variables**
   - Check prefix: Use `NEXT_PUBLIC_` for client-side variables
   - Restart development server after changes
   - Verify deployment platform variable settings

### Performance Monitoring

1. **Lighthouse Audit**
```bash
# Install lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com
```

2. **Core Web Vitals**
   - Monitor LCP (Largest Contentful Paint)
   - Track FID (First Input Delay)
   - Measure CLS (Cumulative Layout Shift)

## 📈 Post-Deployment Checklist

- [ ] SSL certificate is active
- [ ] Custom domain is configured
- [ ] Analytics are tracking
- [ ] All images are loading
- [ ] 3D elements render correctly
- [ ] Mobile responsiveness works
- [ ] Contact form functions
- [ ] SEO meta tags are present
- [ ] Performance scores are acceptable
- [ ] Error tracking is set up

## 🔗 Useful Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [React Three Fiber Performance Tips](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance)
- [Web Performance Best Practices](https://web.dev/performance/)

---

*Need help with deployment? Open an issue on the GitHub repository.*
