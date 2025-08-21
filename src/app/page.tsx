'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, ExternalLink, Mail, Linkedin, MapPin, Phone, Calendar } from 'lucide-react'
import Scene from '@/components/3d/Scene'
import FloatingGeometry from '@/components/3d/FloatingGeometry'
import ParticleField from '@/components/3d/ParticleField'
import SkillsConstellation from '@/components/3d/SkillsConstellation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ImageModal from '@/components/ui/ImageModal'
import { trackEvent, trackPageView } from '@/lib/analytics'
import { personalInfo } from '@/data/personal'
import { projects } from '@/data/projects'
import { timelineEntries } from '@/data/timeline'
import { skillCategories } from '@/data/skills'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    setMounted(true)
    trackPageView('home')

    // Scroll tracking
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene>
            <Suspense fallback={null}>
              <FloatingGeometry position={[3, 1, -2]} color="#00ffff" geometry="icosahedron" scale={1.2} />
              <FloatingGeometry position={[-4, -1, -3]} color="#8b5cf6" geometry="octahedron" scale={0.8} />
              <FloatingGeometry position={[2, -3, -1]} color="#ec4899" geometry="dodecahedron" scale={1} />
              <FloatingGeometry position={[-2, 2, -4]} color="#10b981" geometry="tetrahedron" scale={0.6} />
              <ParticleField count={2500} />
            </Suspense>
          </Scene>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse-neon">
                  {personalInfo.name}
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-4xl text-gray-300 mb-4 font-light">
                  {personalInfo.subtitle}
                </h2>
                <div className="flex items-center justify-center gap-6 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{personalInfo.availability.status}</span>
                  </div>
                </div>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
              </motion.div>

              <motion.p 
                className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {personalInfo.objective}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => {
                    trackEvent('hero_cta_click', { section: 'projects' })
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">Explore My Work</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    trackEvent('hero_contact_click', { section: 'contact' })
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Get In Touch
                </Button>
              </motion.div>

              {/* Quick Contact Info */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                  onClick={() => trackEvent('hero_email_click')}
                >
                  <Mail size={18} />
                  <span>{personalInfo.email}</span>
                </a>
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                  onClick={() => trackEvent('hero_github_click')}
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors"
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="hidden md:block text-sm mb-2 animate-pulse">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}

// Navigation Component
function Navigation({ currentSection }: { currentSection: number }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#timeline' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  trackEvent('navigation_click', { section: item.name.toLowerCase() })
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                className={`transition-colors duration-300 relative ${
                  currentSection === index ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                {currentSection === index && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Projects Section Component
function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    images: string[]
    currentIndex: number
    title: string
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  })

  const openImageModal = (project: typeof projects[0], imageIndex = 0) => {
    const images = project.images || (project.image ? [project.image] : [])
    setModalState({
      isOpen: true,
      images,
      currentIndex: imageIndex,
      title: project.title
    })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  const changeImageIndex = (index: number) => {
    setModalState(prev => ({ ...prev, currentIndex: index }))
  }

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest work showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <Card variant="glass" className="h-full hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                {/* Project Image */}
                {project.image && (
                  <div 
                    className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-800 cursor-pointer group"
                    onClick={() => openImageModal(project, 0)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.classList.add('bg-gradient-to-br', 'from-cyan-500/20', 'to-purple-500/20');
                        target.parentElement!.innerHTML += `<div class="flex items-center justify-center h-full text-gray-400"><span class="text-4xl">📷</span></div>`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Click to view full size
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="px-4 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <div className="flex gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-500/20 text-green-300' : 
                        project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 
                         project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium">
                          {project.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-sm border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        trackEvent('project_github_click', { project: project.title })
                        window.open(project.githubUrl, '_blank')
                      }}
                      className="flex items-center gap-2"
                    >
                      <Github size={16} />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        trackEvent('project_demo_click', { project: project.title })
                        window.open(project.liveUrl, '_blank')
                      }}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </Button>
                  )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        onIndexChange={changeImageIndex}
        title={modalState.title}
      />
    </section>
  )
}

// Skills Section Component
function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my skills through interactive 3D keycaps. <span className="hidden sm:inline">Drag to rotate, scroll to zoom, and hover over keycaps to discover my proficiency levels.</span><span className="sm:hidden">Touch to rotate, pinch to zoom, and tap keycaps for details.</span>
          </p>
        </motion.div>
        
        {/* 3D Skills Constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="h-64 md:h-96 relative mb-8 md:mb-16"
        >
          <Scene enableControls>
            <Suspense fallback={null}>
              <SkillsConstellation />
            </Suspense>
          </Scene>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card variant="glow" className="h-full">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-gray-300">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8">{skill.proficiency}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Timeline Section Component
function TimelineSection() {
  const featuredEntries = timelineEntries.filter(entry => entry.featured)

  return (
    <section id="timeline" className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
            From student to developer - explore the milestones that shaped my path in computer science
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-px bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />

          {featuredEntries.map((entry, index) => (
            <TimelineItem 
              key={entry.id}
              entry={entry}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ entry, index, isEven }: { entry: typeof timelineEntries[0], index: number, isEven: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`relative flex items-center mb-8 md:mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r ${entry.color} border-2 md:border-4 border-gray-900`} />
      </div>

      {/* Content */}
      <div className={`flex-1 ml-10 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <Card variant="glass" className="p-4 md:p-6 hover:bg-white/10 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 md:mb-4">
            <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-0">
              <span className="text-xl md:text-2xl mt-1 md:mt-0">{entry.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">{entry.title}</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-gray-400 mt-1">
                  <span>{entry.organization}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{entry.location}</span>
                </div>
              </div>
            </div>
            
            <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium bg-gradient-to-r ${entry.color} text-white self-start md:self-auto`}>
              {entry.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 leading-relaxed">{entry.description}</p>

          {/* Date Range */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Calendar size={12} className="md:w-4 md:h-4" />
            <span>
              {entry.startDate}
              {entry.endDate && ` - ${entry.endDate}`}
              {!entry.endDate && entry.startDate && ' - Present'}
            </span>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

// Contact Section Component
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent('contact_form_submit', { name: formData.name })
    
    // Create mailto link
    const subject = `Portfolio Contact from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    window.location.href = mailtoLink
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interested in my work or have an internship opportunity? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-8">
                {personalInfo.bio}
              </p>
              
              {/* Availability Notice */}
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg mb-8">
                <h4 className="text-green-400 font-semibold mb-2">🎯 Available for Internship</h4>
                <p className="text-gray-300 text-sm">
                  {personalInfo.availability.internshipStart} to {personalInfo.availability.internshipEnd}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
                { icon: Github, label: 'GitHub', value: '/risterz', href: personalInfo.github }
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card variant="glass" className="p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          if (contact.href !== '#') {
                            window.open(contact.href, '_blank')
                            trackEvent('contact_info_click', { type: contact.label.toLowerCase() })
                          }
                        }}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                        <contact.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{contact.label}</p>
                        <p className="text-white">{contact.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="glass" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your internship opportunity or project..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            {personalInfo.title} • {personalInfo.university.degree}
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {personalInfo.socialLinks.map((social, index) => {
              const IconComponent = social.icon === 'github' ? Github : 
                                  social.icon === 'linkedin' ? Linkedin : Mail
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    window.open(social.url, '_blank')
                    trackEvent('footer_social_click', { platform: social.name.toLowerCase() })
                  }}
                  className="p-3 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                >
                  <IconComponent size={20} />
                </motion.button>
              )
            })}
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 {personalInfo.name}. Built with ❤️ using Next.js, Three.js & passion for innovation
          </p>
        </div>
      </div>
    </footer>
  )
}