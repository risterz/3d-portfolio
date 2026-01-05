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
    id: '1',
    title: 'Bachelor of Computer Science (Hons.) Netsentric Computing',
    description: 'Final-year Computer Science student with strong foundation in frontend and backend development, digital forensics, and software engineering. GPA: 3.45 | CGPA: 3.19',
    organization: 'Universiti Teknologi MARA (UiTM), Jasin, Malacca',
    location: 'Malacca, Malaysia',
    startDate: '2022',
    endDate: 'Present',
    type: 'education',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-500',
    featured: true
  },
  {
    id: '1b',
    title: 'Sijil Tinggi Pelajaran Malaysia (STPM)',
    description: 'CGPA: 3.59/4.00, MUET: Band 4',
    organization: 'Sekolah Menengah Kebangsaan Mengkarak',
    location: 'Bera, Pahang',
    startDate: '2020',
    endDate: '2022',
    type: 'education',
    icon: '🏫',
    color: 'from-slate-500 to-slate-700',
    featured: false
  },
  {
    id: '2',
    title: 'Open for Opportunities',
    description: 'Actively seeking full-time roles as a Web Developer or Software Engineer. Ready to leverage skills in full-stack development to build robust and user-centric solutions.',
    organization: 'Available for Hire',
    location: 'Malaysia',
    startDate: '2025-01',
    endDate: '2025-12-19',
    type: 'work',
    icon: '💼',
    color: 'from-purple-500 to-pink-500',
    featured: true
  },
  {
    id: '3',
    title: 'AI-Enhanced Recipe Recommendation System',
    description: 'Built a full-stack AI recipe enhancement platform analyzing 1,000+ recipes with personalized dietary suggestions using DeepSeek AI and Spoonacular API.',
    organization: 'Personal Project',
    location: 'Remote',
    startDate: '2024-10',
    endDate: 'Present',
    type: 'project',
    icon: '🤖',
    color: 'from-green-500 to-teal-500',
    featured: true
  },
  {
    id: '4',
    title: 'RAWSEC - UiTM Capture The Flag Hacking Competition',
    description: 'Participated in university-level CTF competition featuring challenges in hacking, digital forensics, cryptography, steganography, reverse engineering, web exploitation, network security and logic-based problem solving.',
    organization: 'UiTM',
    location: 'Malacca, Malaysia',
    startDate: '2023',
    endDate: '2023',
    type: 'achievement',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-500',
    featured: true
  },
  {
    id: '6',
    title: 'Mobile Legends Tournament - UiTM Jasin Campus',
    description: 'Competitor in campus tournament. Gained teamwork, role-based strategy, and competitive experience.',
    organization: 'UiTM Student Representative Council (MPP)',
    location: 'Jasin, Melaka',
    startDate: '2023-11',
    endDate: '2023-11',
    type: 'achievement',
    icon: '🎮',
    color: 'from-rose-500 to-pink-500',
    featured: false
  },
  {
    id: '5',
    title: 'Malaysian University English Test (MUET)',
    description: 'Achieved Band 4.0 proficiency in English language skills, demonstrating strong communication abilities.',
    organization: 'Malaysian Examinations Council',
    location: 'Malaysia',
    startDate: '2022',
    endDate: '2027',
    type: 'achievement',
    icon: '🗣️',
    color: 'from-indigo-500 to-purple-500',
    featured: false
  }
]
