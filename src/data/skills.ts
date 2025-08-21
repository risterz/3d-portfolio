export interface Skill {
  id: string
  name: string
  category: 'programming' | 'frameworks' | 'languages' | 'tools'
  proficiency: number
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
    name: 'SQL',
    category: 'programming',
    proficiency: 80,
    color: '#336791',
    position: { x: -1.5, y: 2, z: -1 }
  },
  {
    id: '5',
    name: 'HTML/CSS',
    category: 'programming',
    proficiency: 92,
    color: '#E34F26',
    position: { x: 3, y: 0, z: 1.5 }
  },

  // Frameworks & Tools
  {
    id: '6',
    name: 'Next.js',
    category: 'frameworks',
    proficiency: 85,
    color: '#000000',
    position: { x: 0, y: 2.5, z: 0.5 }
  },
  {
    id: '7',
    name: 'React.js',
    category: 'frameworks',
    proficiency: 87,
    color: '#61DAFB',
    position: { x: -3, y: 0.5, z: -0.5 }
  },
  {
    id: '8',
    name: 'Node.js',
    category: 'frameworks',
    proficiency: 82,
    color: '#339933',
    position: { x: 1.5, y: -2, z: -1 }
  },
  {
    id: '9',
    name: 'Git',
    category: 'tools',
    proficiency: 88,
    color: '#F05032',
    position: { x: -2.5, y: -1, z: 1.5 }
  },
  {
    id: '10',
    name: 'Cursor',
    category: 'tools',
    proficiency: 90,
    color: '#00D4FF',
    position: { x: 2.5, y: 1.5, z: -2 }
  },
  {
    id: '11',
    name: 'VS Code',
    category: 'tools',
    proficiency: 85,
    color: '#007ACC',
    position: { x: 0, y: -2.5, z: 1 }
  },

  // Languages
  {
    id: '12',
    name: 'Bahasa Malaysia',
    category: 'languages',
    proficiency: 100,
    color: '#FF6B6B',
    position: { x: -1, y: 0, z: -2.5 }
  },
  {
    id: '13',
    name: 'English',
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
    description: 'Core programming languages and paradigms',
    skills: skills.filter(skill => skill.category === 'programming')
  },
  {
    title: 'Frameworks & Tools',
    icon: '🛠️',
    description: 'Modern development frameworks and tools',
    skills: skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools')
  },
  {
    title: 'Languages',
    icon: '🗣️',
    description: 'Spoken languages and communication',
    skills: skills.filter(skill => skill.category === 'languages')
  }
]
