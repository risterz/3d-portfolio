export interface Skill {
  id: string
  name: string
  category: 'programming' | 'frameworks' | 'cloud' | 'tools' | 'languages'
  proficiency?: number
  color: string
  position: {
    x: number
    y: number
    z: number
  }
}

export const skills: Skill[] = [
  // Programming Languages
  {
    id: '1',
    name: 'Python',
    category: 'programming',
    proficiency: 90,
    color: '#3776AB',
    position: { x: 2, y: 1, z: 0 }
  },
  {
    id: '2',
    name: 'C++',
    category: 'programming',
    proficiency: 85,
    color: '#00599C',
    position: { x: -2, y: 1.5, z: 1 }
  },
  {
    id: '3',
    name: 'JavaScript',
    category: 'programming',
    proficiency: 88,
    color: '#F7DF1E',
    position: { x: 1, y: -1, z: 2 }
  },
  {
    id: '4',
    name: 'PHP',
    category: 'programming',
    proficiency: 80,
    color: '#777BB4',
    position: { x: -2.2, y: 0.9, z: -0.8 }
  },
  {
    id: '5',
    name: 'HTML/CSS',
    category: 'programming',
    proficiency: 92,
    color: '#E34F26',
    position: { x: 3, y: 0, z: 1.5 }
  },
  {
    id: '6',
    name: 'Java',
    category: 'programming',
    proficiency: 84,
    color: '#5382A1',
    position: { x: 1.8, y: 0.8, z: -1.2 }
  },
  {
    id: '7',
    name: 'Dart',
    category: 'programming',
    proficiency: 75,
    color: '#0175C2',
    position: { x: 0.5, y: -1.6, z: 1.8 }
  },

  // Frameworks & Tools
  {
    id: '8',
    name: 'Next.js',
    category: 'frameworks',
    proficiency: 88,
    color: '#000000',
    position: { x: 0, y: 2.5, z: 0.5 }
  },
  {
    id: '9',
    name: 'React.js',
    category: 'frameworks',
    proficiency: 88,
    color: '#61DAFB',
    position: { x: -3, y: 0.5, z: -0.5 }
  },
  {
    id: '10',
    name: 'Node.js',
    category: 'frameworks',
    proficiency: 82,
    color: '#339933',
    position: { x: 1.5, y: -2, z: -1 }
  },
  {
    id: '11',
    name: 'Express.js',
    category: 'frameworks',
    proficiency: 80,
    color: '#444444',
    position: { x: -1, y: 2.2, z: -0.4 }
  },
  {
    id: '12',
    name: 'Laravel',
    category: 'frameworks',
    proficiency: 80,
    color: '#FF2D20',
    position: { x: 2.2, y: 1.2, z: 0.8 }
  },
  {
    id: '13',
    name: 'Flutter',
    category: 'frameworks',
    proficiency: 78,
    color: '#02569B',
    position: { x: -3.2, y: -0.4, z: 0.6 }
  },
  {
    id: '14',
    name: 'WordPress',
    category: 'frameworks',
    proficiency: 88,
    color: '#21759B',
    position: { x: -1.8, y: -0.8, z: 1.2 }
  },
  {
    id: '15',
    name: 'Elementor',
    category: 'frameworks',
    proficiency: 88,
    color: '#92003B',
    position: { x: 1.1, y: 1.8, z: 1.4 }
  },
  {
    id: '16',
    name: 'GitHub',
    category: 'tools',
    proficiency: 88,
    color: '#181717',
    position: { x: -2.8, y: -1.6, z: -0.2 }
  },
  {
    id: '17',
    name: 'VS Code',
    category: 'tools',
    proficiency: 85,
    color: '#007ACC',
    position: { x: 0, y: -2.5, z: 1 }
  },
  {
    id: '18',
    name: 'Kali Linux',
    category: 'tools',
    proficiency: 75,
    color: '#557C94',
    position: { x: 1.8, y: -1.9, z: -1 }
  },
  {
    id: '19',
    name: 'OBS Studio',
    category: 'tools',
    proficiency: 80,
    color: '#302E31',
    position: { x: -0.8, y: -2.4, z: 0.8 }
  },
  {
    id: '20',
    name: 'Microsoft Office',
    category: 'tools',
    proficiency: 90,
    color: '#D83B01',
    position: { x: 2.8, y: -0.6, z: -1.2 }
  },

  // Database & Cloud
  {
    id: '21',
    name: 'Supabase',
    category: 'cloud',
    proficiency: 85,
    color: '#3ECF8E',
    position: { x: 1.2, y: 2.2, z: -1.2 }
  },
  {
    id: '22',
    name: 'Vercel',
    category: 'cloud',
    proficiency: 90,
    color: '#000000',
    position: { x: 2.6, y: 0.1, z: 1.4 }
  },
  {
    id: '23',
    name: 'Netlify',
    category: 'cloud',
    proficiency: 80,
    color: '#00C7B7',
    position: { x: -2.2, y: 0, z: -1.8 }
  },

  // Languages
  {
    id: '24',
    name: 'Bahasa Malaysia (Native)',
    category: 'languages',
    proficiency: 100,
    color: '#FF6B6B',
    position: { x: -1, y: 0, z: -2.5 }
  },
  {
    id: '25',
    name: 'English (Professional)',
    category: 'languages',
    proficiency: 85,
    color: '#4ECDC4',
    position: { x: 3.5, y: -1, z: 0 }
  }
]

export const skillCategories = [
  {
    title: 'Programming',
    icon: '💻',
    description: 'Core languages and syntax',
    skills: skills.filter(skill => skill.category === 'programming')
  },
  {
    title: 'Frameworks & CMS',
    icon: '🛠️',
    description: 'Modern web, mobile & CMS frameworks',
    skills: skills.filter(skill => skill.category === 'frameworks')
  },
  {
    title: 'Cloud & Database',
    icon: '☁️',
    description: 'Cloud deployment, BaaS & databases',
    skills: skills.filter(skill => skill.category === 'cloud')
  },
  {
    title: 'Tools & Spoken Languages',
    icon: '⚙️',
    description: 'Developer utilities & multilingual fluency',
    skills: skills.filter(skill => skill.category === 'tools' || skill.category === 'languages')
  }
]
