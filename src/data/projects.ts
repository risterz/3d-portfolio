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
    id: 'freefetch',
    title: 'FreeFetch - High-Fidelity Media Downloader',
    description: '⚡ Clean-room desktop media downloader built with Tauri v2, Rust, React, and FFmpeg for high-speed concurrent media extraction.',
    longDescription: 'High-performance desktop application engineered with Tauri v2 and Rust backend combined with a responsive React/Tailwind frontend. Features authoritative queue management, batch downloads, automatic format transcoding via FFmpeg, download history analytics, and robust thread safety.',
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
      '/images/projects/freefetch-history.png'
    ]
  },
  {
    id: 'uno-card-game',
    title: 'UNO Online - Multiplayer Card Game & Design System',
    description: '🃏 Real-time online multiplayer UNO card game with Halloween Collector\'s Deck and authoritative Node.js/Socket.IO backend.',
    longDescription: 'Full-stack multiplayer web game featuring real-time state synchronization, drag-and-drop card interaction physics, custom Halloween themed card illustrations, dynamic room lobbies, in-game notifications, and fully verified responsive mobile/desktop layouts.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/risterz/uno-card-game',
    liveUrl: 'https://uno-card-game-335.pages.dev',
    category: 'Full Stack & Game',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/uno-main.png',
    images: [
      '/images/projects/uno-main.png',
      '/images/projects/uno-victory.png'
    ]
  },
  {
    id: 'windows98-emulator',
    title: 'Windows 98 Web OS & Retro Game Suite',
    description: '💾 Authentic Windows 98 desktop environment in the browser with playable Minesweeper, Snake, Solitaire, and retro window manager.',
    longDescription: 'Pixel-perfect nostalgic recreation of the classic Windows 98 operating system inside the browser. Built with Next.js and React featuring draggable multi-window management, taskbar, start menu, nostalgic sound effects with Web Audio API, and playable vintage games.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/risterz/windows98-emulator',
    liveUrl: 'https://windows98-emulator.pages.dev',
    category: 'Web Application',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/win98-main.png',
    images: [
      '/images/projects/win98-main.png',
      '/images/projects/win98-minesweeper.png',
      '/images/projects/win98-allwindows.png'
    ]
  },
  {
    id: 'papercraft-pdf',
    title: 'Papercraft PDF - Privacy-First In-Browser Suite',
    description: '📄 100% in-browser, privacy-first PDF utility suite with Neobrutalism design and zero server uploads.',
    longDescription: 'Zero-trust client-side PDF manipulation workstation running entirely inside the user\'s browser without sending documents to external servers. Supports merging, splitting, reordering, and compression using PDF-Lib with an energetic Neobrutalism UI design.',
    technologies: ['React', 'TypeScript', 'PDF-Lib', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/risterz/papercraft-pdf',
    liveUrl: 'https://papercraft-pdf.pages.dev',
    category: 'Productivity Tool',
    status: 'completed',
    featured: true,
    period: 'Oct 2026',
    image: '/images/projects/papercraft-main.png',
    images: [
      '/images/projects/papercraft-main.png'
    ]
  },
  {
    id: 'pantrypal-ai',
    title: 'PantryPal AI - Recipe Enhancement System',
    description: '🍳 Full-stack AI recipe enhancement platform analyzing 1,000+ recipes by extracting ingredients via Spoonacular API and generating personalized suggestions via DeepSeek AI.',
    longDescription: 'AI-powered culinary recommendation system built with Next.js and Supabase. Extracts pantry ingredients with Spoonacular API and utilizes DeepSeek AI to deliver custom recipe improvements across healthier, faster, and tastier dynamic categories.',
    technologies: ['Next.js', 'React', 'Supabase', 'DeepSeek AI', 'Spoonacular API', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz/pantrypal-ai',
    liveUrl: 'https://pantrypal-ai-nine.vercel.app',
    category: 'AI Web App',
    status: 'completed',
    featured: true,
    period: 'Oct 2024 - 2025',
    image: '/images/projects/recipe-system-main.png',
    images: [
      '/images/projects/recipe-system-main.png'
    ]
  },
  {
    id: 'gemini-ai',
    title: 'Gemini Cracker - AI Image Studio',
    description: '🚀 Generative AI studio featuring high-speed image generation, upscaling, and contextual conversational AI powered by Google Gemini API.',
    longDescription: 'Full-stack AI creative suite that leverages Google Gemini API for generative artwork creation, intelligent chat with context retention, and professional image upscaling. Built with Flask and a dark neobrutalism glassmorphic UI.',
    technologies: ['Python', 'Flask', 'Google Gemini API', 'JavaScript', 'HTML5', 'CSS3', 'Pillow'],
    githubUrl: 'https://github.com/risterz/Gemini-Crack',
    liveUrl: 'https://gemini-crack.onrender.com',
    category: 'AI Web App',
    status: 'completed',
    featured: true,
    period: 'Dec 2024',
    image: '/images/projects/gemini-studio.png',
    images: [
      '/images/projects/gemini-studio.png'
    ]
  },
  {
    id: 'stegobox',
    title: 'StegoBox - Advanced Steganography Tool',
    description: '🕵️ Advanced Python steganography application with dual embedding algorithms (Append/LSB) and military-grade AES-256 encryption.',
    longDescription: 'Digital forensics and cybersecurity tool for concealing sensitive data within digital images. Features dual mode embedding (Append mode for bulk files, LSB mode for statistical stealth), PBKDF2 key derivation, and a multi-threaded CustomTkinter interface. Also available as in-browser web edition (PixelVault).',
    technologies: ['Python', 'CustomTkinter', 'Pillow (PIL)', 'Cryptography', 'AES-256', 'LSB Steganography', 'PyInstaller'],
    githubUrl: 'https://github.com/risterz/StegoBox',
    liveUrl: 'https://pixelvault-30v.pages.dev',
    category: 'Cybersecurity',
    status: 'completed',
    featured: true,
    period: 'Aug 2024',
    image: '/images/projects/stegobox-main.png',
    images: [
      '/images/projects/stegobox-main.png',
      '/images/projects/stegobox-encryption.png'
    ]
  },
  {
    id: 'vidharvester',
    title: 'VidHarvester - Multi-Source Media Extractor',
    description: '🎬 Comprehensive video downloading tool with PyQt6 GUI, browser extension integration, and proxy-based video stream interception.',
    longDescription: 'Desktop application pairing yt-dlp with an intuitive PyQt6 interface and browser extension capture methods. Handles concurrent downloads, queue management, and cross-platform media extraction.',
    technologies: ['Python', 'PyQt6', 'yt-dlp', 'mitmproxy', 'Playwright', 'SQLite', 'FFmpeg'],
    githubUrl: 'https://github.com/risterz/VidHarvester',
    liveUrl: 'https://github.com/risterz/VidHarvester',
    category: 'Desktop App',
    status: 'completed',
    featured: false,
    period: 'Aug 2024',
    image: '/images/projects/vidharvester-main.png',
    images: [
      '/images/projects/vidharvester-main.png',
      '/images/projects/vidharvester-downloads.png'
    ]
  }
]
