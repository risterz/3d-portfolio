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
  images?: string[] // For multiple screenshots
  video?: string // For demo videos
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'PantryPal AI - Recipe Enhancement System',
    description: 'A full-stack AI recipe enhancement platform analyzing 1,000+ recipes by extracting ingredients with Spoonacular API and generating personalized suggestions via DeepSeek AI.',
    longDescription: 'Built a comprehensive AI-powered recipe recommendation system that leverages machine learning to provide personalized dietary suggestions. The platform integrates with Spoonacular API for ingredient extraction and uses DeepSeek AI for intelligent recommendations. Features dynamic enhancement categorization for healthier, faster, and tastier meal options.',
    technologies: ['Next.js', 'React', 'Supabase', 'DeepSeek AI', 'Spoonacular API', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz',
    category: 'AI',
    status: 'completed',
    featured: true,
    period: 'Oct 2024 - Present',
    image: '/images/projects/recipe-system-main.png',
    images: [
      '/images/projects/recipe-system-main.png',
      '/images/projects/recipe-system-dashboard.png',
      '/images/projects/recipe-system-ai-suggestions.png'
    ],
    video: '/videos/projects/recipe-system-demo.mp4'
  },
  {
    id: '2',
    title: 'VidHarvester - Professional Video Downloader',
    description: '🎬 Comprehensive video downloading application with PyQt6 GUI, browser extension integration, and proxy-based video capture capabilities. Features multiple capture methods for maximum compatibility.',
    longDescription: 'Professional video downloading application that combines the reliability of yt-dlp with an intuitive PyQt6 interface. Features smart capture methods including browser extensions, proxy interception, and headless browser automation. Supports multi-format downloads, queue management, concurrent downloads, and cross-platform compatibility.',
    technologies: ['Python', 'PyQt6', 'yt-dlp', 'mitmproxy', 'Playwright', 'SQLite', 'FFmpeg', 'Chrome Extension', 'Firefox Extension'],
    githubUrl: 'https://github.com/risterz/VidHarvester',
    category: 'Desktop App',
    status: 'completed',
    featured: true,
    period: 'Aug 2024',
    image: '/images/projects/vidharvester-main.png',
    images: [
      '/images/projects/vidharvester-main.png',
      '/images/projects/vidharvester-downloads.png',
      '/images/projects/vidharvester-extension.png'
    ],
    video: '/videos/projects/vidharvester-demo.mp4'
  },
  {
    id: '3',
    title: 'StegoBox - Advanced Steganography Tool',
    description: '🕵️ Hide your secrets in plain sight with military-grade steganography. Modern GUI, AES-256 encryption, and dual methods (LSB & Append) for secure data hiding in images.',
    longDescription: 'Advanced steganography tool that allows hiding folders and ZIP files inside images with a beautiful GUI interface. Features dual embedding methods (Append Mode for speed, LSB Mode for invisibility), AES-256 encryption with PBKDF2 key derivation, and modern dark/light theme support. Perfect for secure data storage, confidential file transfer, and digital privacy protection.',
    technologies: ['Python', 'CustomTkinter', 'Pillow (PIL)', 'Cryptography', 'AES-256', 'LSB Steganography', 'PBKDF2', 'PyInstaller'],
    githubUrl: 'https://github.com/risterz/StegoBox',
    category: 'Security',
    status: 'completed',
    featured: true,
    period: 'Aug 2024',
    image: '/images/projects/stegobox-main.png',
    images: [
      '/images/projects/stegobox-main.png',
      '/images/projects/stegobox-encryption.png',
      '/images/projects/stegobox-progress.png'
    ],
    video: '/videos/projects/stegobox-demo.mp4'
  },
  {
    id: '4',
    title: '3D Interactive Portfolio',
    description: 'This very portfolio! Built with Next.js, React Three Fiber, and modern web technologies to create an immersive 3D experience.',
    longDescription: 'A cutting-edge portfolio website showcasing projects through interactive 3D experiences. Features floating geometries, particle systems, smooth animations, and responsive design. Built with modern web technologies and optimized for performance across all devices.',
    technologies: ['Next.js', 'React Three Fiber', 'Three.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/risterz',
    liveUrl: 'https://haris-profile.vercel.app',
    category: 'Web',
    status: 'completed',
    featured: true,
    period: '2024',
    image: '/images/projects/portfolio-main.png',
    images: [
      '/images/projects/portfolio-main.png',
      '/images/projects/portfolio-3d-skills.png',
      '/images/projects/portfolio-mobile.png'
    ],
    video: '/videos/projects/portfolio-demo.mp4'
  }
]
