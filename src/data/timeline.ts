export interface TimelineEntry {
  id: string
  title: string
  description: string
  organization: string
  location: string
  startDate: string
  endDate?: string
  type: 'education' | 'work' | 'project' | 'achievement'
  icon: string
  color: string
  featured: boolean
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'work-alev',
    title: 'Web Developer',
    description: 'Designed and developed landing pages (including Shynex and Atfal) under the MERCU project using WordPress and Elementor. Produced digital assets (name cards, email signatures, mockups) in Adobe Illustrator & Photoshop. Managed content updates for "Digital Service Inventory List" for GOSG 2025 and maintained the MyGovernment portal database.',
    organization: 'Alev Global Sdn. Bhd.',
    location: 'Bangi, Selangor',
    startDate: 'Sep 2025',
    endDate: 'Dec 2025',
    type: 'work',
    icon: '💼',
    color: 'from-cyan-500 to-blue-500',
    featured: true
  },
  {
    id: 'edu-uitm',
    title: 'Bachelor of Computer Science (Hons.) Netcentric Computing',
    description: 'Recent graduate with strong foundations in software development, database management, networking, and digital forensics. Academic projects covering full-stack web and systems engineering. CGPA: 3.27 | GPA: 3.67.',
    organization: 'Universiti Teknologi MARA (UiTM)',
    location: 'Kampus Jasin, Melaka',
    startDate: 'Oct 2022',
    endDate: '2025',
    type: 'education',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-500',
    featured: true
  },
  {
    id: 'edu-stpm',
    title: 'Sijil Tinggi Pelajaran Malaysia (STPM)',
    description: 'Pre-university education. CGPA: 3.59/4.00, MUET: Band 4.',
    organization: 'Sekolah Menengah Kebangsaan Mengkarak',
    location: 'Bera, Pahang',
    startDate: 'Sep 2020',
    endDate: 'May 2022',
    type: 'education',
    icon: '🏫',
    color: 'from-slate-500 to-slate-700',
    featured: true
  },
  {
    id: 'proj-recipe',
    title: 'AI-Enhanced Recipe Recommendation System',
    description: 'Built a full-stack AI recipe platform analyzing 1,000+ recipes by extracting ingredients with Spoonacular API and generating personalized suggestions via DeepSeek AI. Developed with Next.js, React, and Supabase.',
    organization: 'Final Year Project',
    location: 'Remote',
    startDate: 'Oct 2024',
    endDate: '2025',
    type: 'project',
    icon: '🤖',
    color: 'from-green-500 to-teal-500',
    featured: true
  },
  {
    id: 'proj-stegobox',
    title: 'StegoBox - Secure Data Hiding & Encryption Tool',
    description: 'Developed advanced Python steganography tool with dual embedding algorithms (Append/LSB) and AES-256 encryption. Modern CustomTkinter GUI supporting multi-threading and 1,000+ image formats.',
    organization: 'Security Project',
    location: 'Remote',
    startDate: 'Aug 2024',
    endDate: '2024',
    type: 'project',
    icon: '🕵️',
    color: 'from-amber-500 to-red-500',
    featured: true
  },
  {
    id: 'achieve-ctf',
    title: 'RawSEC - UiTM CTF Hacking Competition 2023',
    description: 'Participated in university-level CTF challenges covering cryptography, steganography, reverse engineering, web exploitation, network security, and incident response.',
    organization: 'UiTM Jasin Campus',
    location: 'Jasin, Melaka',
    startDate: 'Oct 2023',
    endDate: 'Oct 2023',
    type: 'achievement',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-500',
    featured: true
  },
  {
    id: 'achieve-esports',
    title: 'Mobile Legends Tournament UiTM Jasin Campus',
    description: 'Competed as an esports team player in a tournament organized by the UiTM Melaka Student Representative Council (MPP). Strengthened team coordination and communication.',
    organization: 'UiTM MPP',
    location: 'Jasin, Melaka',
    startDate: 'Nov 2023',
    endDate: 'Nov 2023',
    type: 'achievement',
    icon: '🎮',
    color: 'from-rose-500 to-pink-500',
    featured: false
  },
  {
    id: 'career-target',
    title: 'Fresh Graduate • Open for Opportunities',
    description: 'Eager to explore career opportunities in Software Development and Data Centre Operations. Ready to deliver immediate value with full-stack skills and industry experience.',
    organization: 'Available for Hire',
    location: 'Malaysia / Remote',
    startDate: '2025',
    endDate: 'Present',
    type: 'work',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
    featured: true
  }
]
