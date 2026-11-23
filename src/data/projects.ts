export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  period: string
  image?: string
  images?: string[]
  video?: string
}

export const projects: Project[] = [
  {
    id: 'brawl-arena',
    title: 'Brawl Arena — 3D 3v3 Multiplayer Brawler',
    description:
      'Fast-paced 3D 3v3 real-time multiplayer browser brawler built with Three.js, TypeScript workspaces, 7 custom-rigged GLB brawlers, A* bot AI, and Cloudflare Durable Objects.',
    longDescription:
      'Full-stack 3D arena brawler combining Three.js skeletal animation and stylized emissive shaders with an authoritative Cloudflare Workers + SQLite Durable Objects WebSocket backend. Includes 7 playable brawlers, Gem Grab and Brawl Ball modes across 3 symmetric destructible arenas, offline A* bot play, and adaptive PC/mobile twin-stick controls.',
    technologies: ['TypeScript', 'Three.js', 'Cloudflare Workers', 'Durable Objects', 'WebSockets', 'Vite'],
    githubUrl: 'https://github.com/risterz/brawl-arena',
    liveUrl: 'https://brawl-arena.harisharraz02.workers.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/brawl-arena-lobby.png',
    images: [
      '/images/projects/brawl-arena-lobby.png',
      '/images/projects/brawl-arena-match.png',
    ],
  },
  {
    id: 'haris-3d-world',
    title: 'Haris 3D World — Interactive Driving Portfolio',
    description:
      'Bruno Simon-inspired interactive 3D driving playground built with Next.js, Three.js, React Three Fiber, custom arcade vehicle physics, and procedural Web Audio SFX.',
    longDescription:
      'Interactive sunlit 3D driving world where visitors pilot a procedural toy truck with steering physics, bouncy suspension pitch/roll, turbo boost flames, procedural Web Audio sound synthesis, and interactive project zones.',
    technologies: ['Next.js 14', 'Three.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/risterz/haris-3d-world',
    liveUrl: 'https://haris-3d-world.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/haris-3d-world-main.png',
    images: [
      '/images/projects/haris-3d-world-main.png',
      '/images/projects/haris-3d-world-projects.png',
      '/images/projects/haris-3d-world-welcome.png',
      '/images/projects/haris-3d-world-contact.png',
    ],
  },
  {
    id: 'donutverse',
    title: 'DONUTVERSE — 3D Artisan Storefront',
    description:
      'Editorial artisan donut storefront with a real-time procedural Three.js 3D glaze studio, interactive shopping bag, and GSAP/Framer Motion scroll choreography.',
    longDescription:
      'Tactile e-commerce showcase combining a real-time procedural Three.js 3D glaze atelier with live flavor switching, a filterable 6-flavor menu, slide-over cart drawer with promo code support, and silky GSAP scroll animations.',
    technologies: ['React 18', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/donutverse',
    liveUrl: 'https://donutverse.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/donutverse.png',
    images: ['/images/projects/donutverse.png'],
  },
  {
    id: 'roomforge-3d',
    title: 'RoomForge 3D — Browser Interior Planner',
    description:
      'Private, 100% client-side 3D interior room planner built with React 19, TypeScript, Three.js, and React Three Fiber with 3D orbit and top-down 2D plan views.',
    longDescription:
      'Fast interactive 3D interior architecture studio running completely in the browser with zero accounts or backend. Switch smoothly between 3D orbit and 2D floorplan views, place procedural furniture, customize materials, and save locally.',
    technologies: ['React 19', 'TypeScript', 'Three.js', 'React Three Fiber', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/RoomForge-3D',
    liveUrl: 'https://roomforge-3d.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/roomforge-3d.png',
    images: ['/images/projects/roomforge-3d.png'],
  },
  {
    id: 'keythock',
    title: 'KeyThock 3D — Mechanical Keyboard Customizer',
    description:
      'Interactive 3D mechanical keyboard customizer, procedural Web Audio acoustic simulator, and typing playground supporting switch swaps and exploded 3D teardown.',
    longDescription:
      'Real-time 3D keyboard studio built with React Three Fiber and procedural Web Audio API synthesis. Switch layouts (60% to 80% TKL), acoustic profiles (Holy Panda, Gateron Yellow, MX Blue, Topre), mods (Tape Mod, PE Foam), and inspect an exploded 3D teardown.',
    technologies: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'Web Audio API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/keythock',
    liveUrl: 'https://keythock.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/keythock.png',
    images: ['/images/projects/keythock.png'],
  },
  {
    id: 'hiv-molecular-lab-3d',
    title: 'HIV Molecular Lab 3D — Procedural Virology',
    description:
      '100% procedural WebGL virology and molecular biology lab generating B-DNA helices, virion envelopes, cutaway enzyme cores, and NRTI chain-termination simulations.',
    longDescription:
      'Open-science interactive 3D laboratory teaching HIV virology, antiretroviral pharmacology, and biophysical drug resistance. Every molecular structure is generated mathematically in Three.js with zero external .gltf assets and 31 passing Vitest suites.',
    technologies: ['React', 'TypeScript', 'Three.js', 'WebGL', 'Vite', 'Vitest', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/hiv-molecular-lab-3d',
    liveUrl: 'https://hiv-molecular-lab-3d.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/hiv-molecular-lab-3d.png',
    images: ['/images/projects/hiv-molecular-lab-3d.png'],
  },
  {
    id: 'hiv-atlas',
    title: 'HIV Atlas — Interactive Health Guide & 3D Virion',
    description:
      'Stigma-free, plain-language HIV education platform pairing six guided chapters and interactive testing/prevention tools with a cutaway 3D HIV-1 virion explorer.',
    longDescription:
      'Human-centered health education platform combining clear, accessible chapters on prevention, testing, and treatment with an interactive structure-informed 3D HIV-1 virion laboratory built in React 19 and Three.js.',
    technologies: ['React 19', 'Three.js', 'Vite 6', 'JavaScript', 'CSS3'],
    githubUrl: 'https://github.com/risterz/hiv-atlas',
    liveUrl: 'https://hiv-atlas.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/hiv-atlas.png',
    images: ['/images/projects/hiv-atlas.png'],
  },
  {
    id: 'cosmos-explorer',
    title: 'COSMOS — 3D Solar System & Space Explorer',
    description:
      'Museum-grade interactive 3D Solar System & spaceflight exhibition featuring procedural planetary shaders, a 1,100-body instanced asteroid belt, and mission timeline.',
    longDescription:
      'Real-time WebGL aerospace exhibition rendering all planets, procedural clouds, Saturn rings, and an instanced 1,100-body asteroid belt with dual educational/astronomical distance scales and a synchronized mission timeline from Sputnik 1 onward.',
    technologies: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/cosmos-explorer',
    liveUrl: 'https://cosmos-explorer-prz.pages.dev',
    category: '3D & WebGL',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/cosmos-explorer.png',
    images: ['/images/projects/cosmos-explorer.png'],
  },
  {
    id: 'ember-olive',
    title: 'Ember & Olive — Wood-Fired Gastronomy',
    description:
      'Editorial Mediterranean wood-fired gastronomy experience crafted with React 19, TypeScript, Tailwind CSS v4, Lenis smooth scroll, and GSAP ScrollTrigger.',
    longDescription:
      'Atmospheric restaurant showcase featuring editorial typography, cinematic scroll reveals, parallax depth, chef spotlight storytelling, and an interactive menu drawer with curated sommelier pairings.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'GSAP', 'Lenis', 'Vite'],
    githubUrl: 'https://github.com/risterz/ember-olive',
    liveUrl: 'https://ember-olive-6v6.pages.dev',
    category: 'Web & Editorial',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/ember-olive.png',
    images: ['/images/projects/ember-olive.png'],
  },
  {
    id: 'shuffle-puzzle',
    title: 'Shuffle — Sliding Puzzle + Cloudflare D1 Leaderboard',
    description:
      'Zero-dependency sliding puzzle game served from a Cloudflare Worker backed by a Cloudflare D1 SQLite database for ranked global leaderboards.',
    longDescription:
      'Responsive 3x3, 4x4, and 5x5 sliding puzzle supporting custom photo uploads, keyboard/touch controls, automatic local save restoration, light/dark themes, and ranked global scores via Cloudflare Workers and D1.',
    technologies: ['Cloudflare Workers', 'Cloudflare D1', 'JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/risterz/shuffle-puzzle',
    liveUrl: 'https://shuffle-puzzle.harisharraz02.workers.dev/',
    category: 'Game & Edge',
    status: 'completed',
    featured: true,
    period: 'Nov 2026',
    image: '/images/projects/shuffle-puzzle.png',
    images: ['/images/projects/shuffle-puzzle.png'],
  },
  {
    id: 'neomarket',
    title: 'NEOMARKET — Editorial Dark E-Commerce Storefront',
    description:
      'Responsive dark-editorial storefront built with React 19 and Vite 6 featuring live search, shareable product variants, wishlist, promo codes, and demo checkout.',
    longDescription:
      'Complete front-end e-commerce platform with category filtering, quick-view modals, localStorage-backed wishlist and order history, percentage/fixed promo code engine, and accessible keyboard-first checkout validation.',
    technologies: ['React 19', 'Vite 6', 'JavaScript', 'CSS3', 'Cloudflare Pages'],
    githubUrl: 'https://github.com/risterz/neomarket',
    liveUrl: 'https://neomarket-1v5.pages.dev',
    category: 'Web & Editorial',
    status: 'completed',
    featured: false,
    period: 'Nov 2026',
    image: '/images/projects/neomarket.png',
    images: ['/images/projects/neomarket.png'],
  },
  {
    id: 'freefetch',
    title: 'FreeFetch — High-Fidelity Media Downloader',
    description:
      'Clean-room desktop media downloader engineered with Tauri v2, Rust, React, and FFmpeg for high-speed concurrent extraction and format transcoding.',
    longDescription:
      'High-performance native desktop application pairing a multi-threaded Rust/Tauri v2 backend with a responsive React/Tailwind frontend. Features authoritative queue management, batch downloads, FFmpeg transcoding, and download analytics.',
    technologies: ['Tauri v2', 'Rust', 'React', 'TypeScript', 'FFmpeg', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/FreeFetch',
    liveUrl: 'https://github.com/risterz/FreeFetch/releases',
    category: 'Desktop & Systems',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/freefetch-main.png',
    images: [
      '/images/projects/freefetch-main.png',
      '/images/projects/freefetch-batch.png',
      '/images/projects/freefetch-history.png',
    ],
  },
  {
    id: 'uno-card-game',
    title: 'UNO Online — Multiplayer Card Game & Design System',
    description:
      'Real-time online multiplayer UNO card game with a custom 54-card Halloween Collector Deck, AI bots, and an authoritative Node.js/Socket.IO backend.',
    longDescription:
      'Full-stack multiplayer web game featuring real-time room lobbies, drag-and-drop card physics, Classic and custom Halloween Collector decks, background audio, and an authoritative Socket.IO game server.',
    technologies: ['React 19', 'TypeScript', 'Node.js', 'Socket.IO', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/risterz/uno-card-game',
    liveUrl: 'https://uno-card-game-335.pages.dev',
    category: 'Game & Edge',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/uno-main.png',
    images: ['/images/projects/uno-main.png', '/images/projects/uno-victory.png'],
  },
  {
    id: 'windows98-emulator',
    title: 'Windows 98 Web OS & Retro Game Suite',
    description:
      'Authentic Windows 98 desktop environment in the browser with draggable window manager, Start Menu, system apps, and playable Minesweeper, Snake, and Solitaire.',
    longDescription:
      'Pixel-accurate browser recreation of the classic Windows 98 operating system built with Next.js and React featuring multi-window z-index management, Notepad, Paint, Calculator, Web Audio SFX, and classic bundled games.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/risterz/windows98-emulator',
    liveUrl: 'https://windows98-emulator.pages.dev',
    category: 'Web & Editorial',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/win98-main.png',
    images: [
      '/images/projects/win98-main.png',
      '/images/projects/win98-minesweeper.png',
      '/images/projects/win98-allwindows.png',
    ],
  },
  {
    id: 'sonicshift',
    title: 'SonicShift — WebAssembly MP4 to MP3 Converter',
    description:
      '100% client-side MP4-to-MP3 audio extractor powered by ffmpeg.wasm inside browser Web Workers with selectable studio bitrates and zero server uploads.',
    longDescription:
      'Privacy-first browser audio converter built with React 19, TypeScript, Tailwind CSS v4, and FFmpeg compiled to WebAssembly. Extracts studio-bitrate MP3 tracks locally on-device with zero remote file transfers.',
    technologies: ['React 19', 'TypeScript', 'FFmpeg.wasm', 'Web Workers', 'Tailwind CSS v4'],
    githubUrl: 'https://github.com/risterz/mp4-to-mp3-converter',
    liveUrl: 'https://sonicshift-mp3.pages.dev',
    category: 'Tools & AI',
    status: 'completed',
    featured: false,
    period: 'Oct 2026',
    image: '/images/projects/sonicshift.png',
    images: ['/images/projects/sonicshift.png'],
  },
  {
    id: 'papercraft-pdf',
    title: 'Papercraft PDF — Privacy-First In-Browser Suite',
    description:
      'Offline-capable neobrutalist PDF workstation running entirely in browser memory for merging, splitting, watermarking, compressing, and encrypting documents.',
    longDescription:
      'Zero-trust client-side PDF utility workshop powered by React 19, TypeScript, pdf-lib, pdfjs-dist, and jszip. Manipulates, converts, reorders, and password-protects PDFs locally without ever uploading files.',
    technologies: ['React 19', 'TypeScript', 'PDF-Lib', 'PDF.js', 'Tailwind CSS v4', 'Vite'],
    githubUrl: 'https://github.com/risterz/papercraft-pdf',
    liveUrl: 'https://papercraft-pdf.pages.dev',
    category: 'Tools & AI',
    status: 'completed',
    featured: false,
    period: 'Oct 2026',
    image: '/images/projects/papercraft-pdf.png',
    images: ['/images/projects/papercraft-pdf.png', '/images/projects/papercraft-main.png'],
  },
  {
    id: 'pixelvault',
    title: 'PixelVault — Client-Side AES-256 Steganography',
    description:
      'Next.js 16 browser steganography studio encrypting secrets with PBKDF2 (200k iterations) + AES-256-GCM before hiding them inside PNG/JPG/WebP pixels.',
    longDescription:
      'Privacy-first web cryptography tool leveraging native WebCrypto API and HTML5 Canvas pixel manipulation. Supports both visually undetectable LSB encoding with live capacity gauges and lossless tail-append embedding.',
    technologies: ['Next.js 16', 'TypeScript', 'WebCrypto API', 'Canvas API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/pixelvault',
    liveUrl: 'https://pixelvault-30v.pages.dev',
    category: 'Desktop & Systems',
    status: 'completed',
    featured: false,
    period: 'Oct 2026',
    image: '/images/projects/pixelvault.png',
    images: ['/images/projects/pixelvault.png'],
  },
  {
    id: 'kafa-sirah',
    title: 'KAFA Sirah — Interactive Islamic Learning App',
    description:
      'Interactive Islamic Sirah education web app for primary students (Tahun 1 to Tahun 5+) built with Next.js, TypeScript, and Framer Motion quizzes.',
    longDescription:
      'Structured educational platform organizing Sirah lessons by school year with interactive quizzes (Kuiz), progress milestones, and achievement tracking (Pencapaian) crafted for young learners.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/risterz/kafa-sirah',
    liveUrl: 'https://kafa-sirah.vercel.app',
    category: 'Web & Editorial',
    status: 'completed',
    featured: false,
    period: 'Jan 2026',
    image: '/images/projects/kafa-sirah.png',
    images: ['/images/projects/kafa-sirah.png'],
  },
  {
    id: 'gemini-ai',
    title: 'Gemini Web UI — Multimodal AI Studio',
    description:
      'Stateless neo-brutalist web studio for Google Gemini AI backed by Python, Flask, and Gunicorn for multimodal image chat and generative image prompts.',
    longDescription:
      'Lightweight AI creative suite built with Python and Flask that connects to Google Gemini for fast multimodal conversation, image upload analysis, and an Image Studio prompt workflow.',
    technologies: ['Python', 'Flask', 'Google Gemini API', 'Gunicorn', 'JavaScript', 'CSS3'],
    githubUrl: 'https://github.com/risterz/gemini-web-ui',
    liveUrl: 'https://gemini-crack.onrender.com',
    category: 'Tools & AI',
    status: 'completed',
    featured: false,
    period: 'Jan 2026',
    image: '/images/projects/gemini-web-ui.png',
    images: ['/images/projects/gemini-web-ui.png', '/images/projects/gemini-studio.png'],
  },
  {
    id: 'pantrypal-ai',
    title: 'PantryPal AI — Recipe Enhancement System',
    description:
      'Full-stack AI culinary platform analyzing 1,000+ recipes via Spoonacular API and generating personalized healthier, faster, and tastier upgrades via DeepSeek AI.',
    longDescription:
      'Final Year Project built with Next.js, React, TypeScript, and Supabase. Extracts pantry ingredients through Spoonacular API and prompts DeepSeek AI for structured recipe enhancements tailored to user goals.',
    technologies: ['Next.js', 'React', 'Supabase', 'DeepSeek AI', 'Spoonacular API', 'TypeScript'],
    githubUrl: 'https://github.com/risterz/pantrypal-ai',
    liveUrl: 'https://pantrypal-ai-nine.vercel.app',
    category: 'Tools & AI',
    status: 'completed',
    featured: false,
    period: '2025',
    image: '/images/projects/recipe-system-main.png',
    images: ['/images/projects/recipe-system-main.png'],
  },
  {
    id: 'stegobox',
    title: 'StegoBox — Desktop Steganography Suite',
    description:
      'Multi-threaded Python desktop steganography and digital forensics tool with Append/LSB embedding algorithms and AES-256 encryption.',
    longDescription:
      'Desktop cybersecurity workstation built with Python, CustomTkinter, Pillow, and Cryptography. Supports dual embedding modes (Append for bulk files, LSB for statistical stealth) with PBKDF2 key derivation.',
    technologies: ['Python', 'CustomTkinter', 'AES-256', 'LSB Steganography', 'Pillow', 'PyInstaller'],
    githubUrl: 'https://github.com/risterz/StegoBox',
    liveUrl: 'https://pixelvault-30v.pages.dev',
    category: 'Desktop & Systems',
    status: 'completed',
    featured: false,
    period: 'Aug 2025',
    image: '/images/projects/stegobox-main.png',
    images: ['/images/projects/stegobox-main.png', '/images/projects/stegobox-encryption.png'],
  },
  {
    id: 'vidharvester',
    title: 'VidHarvester — Multi-Source Media Extractor',
    description:
      'Desktop video downloading suite pairing PyQt6, yt-dlp, mitmproxy stream interception, and browser extension integration with SQLite queue tracking.',
    longDescription:
      'Cross-platform Python desktop extractor combining yt-dlp, FFmpeg, mitmproxy, and Playwright with a PyQt6 interface and browser companion extension for concurrent downloads and history logging.',
    technologies: ['Python', 'PyQt6', 'yt-dlp', 'mitmproxy', 'Playwright', 'SQLite', 'FFmpeg'],
    githubUrl: 'https://github.com/risterz/VidHarvester',
    liveUrl: 'https://github.com/risterz/VidHarvester',
    category: 'Desktop & Systems',
    status: 'completed',
    featured: false,
    period: 'Aug 2025',
    image: '/images/projects/vidharvester-main.png',
    images: [
      '/images/projects/vidharvester-main.png',
      '/images/projects/vidharvester-downloads.png',
      '/images/projects/vidharvester-extension.png',
    ],
  },
]
