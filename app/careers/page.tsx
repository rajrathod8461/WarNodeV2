'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, Globe, Zap, Heart, Coffee, ArrowRight,
  MapPin, Clock, Terminal, Headphones, Code2, 
  Handshake, Shield, Server, BookOpen, Layers,
  Cpu, Users, Rocket, CheckCircle2
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DiscordBanner from '../components/DiscordBanner'

const BENEFITS = [
  { icon: Globe, label: 'Remote First', sub: 'Work from anywhere, always. No mandated office days.' },
  { icon: Server, label: 'Infrastructure Credits', sub: 'Generous monthly credits for your personal projects.' },
  { icon: BookOpen, label: 'Learning Budget', sub: 'Annual stipend for courses, books, and conferences.' },
  { icon: Clock, label: 'Flexible Work', sub: 'Focus on impact and output, not hours at the desk.' },
]

const BUILD_ITEMS = [
  { icon: Globe, title: 'Global Infrastructure', desc: 'Deploy and manage massive-scale edge networks across multiple continents.' },
  { icon: Shield, title: 'WarShield', desc: 'Develop advanced L3-L7 mitigation systems protecting against the largest DDoS attacks.' },
  { icon: Cpu, title: 'Automation', desc: 'Build the systems that provision bare-metal and VMs in seconds without human intervention.' },
  { icon: Terminal, title: 'Developer Experience', desc: 'Craft clean APIs, intuitive control panels, and tools that developers love using.' },
]

const WORK_VALUES = [
  { icon: CheckCircle2, title: 'Ownership', desc: 'You build it, you run it. We give you the autonomy to solve hard problems your way.' },
  { icon: Code2, title: 'Engineering First', desc: 'We prioritize technical excellence, clean architecture, and long-term maintainability over quick hacks.' },
  { icon: Shield, title: 'Responsible Execution', desc: 'We handle critical infrastructure. We move fast, but we never compromise on stability and security.' },
  { icon: BookOpen, title: 'Continuous Learning', desc: 'Technology evolves rapidly. We dedicate time to research, experiment, and learn together.' },
]

const OPENINGS = [
  {
    id: '01',
    title: 'Linux Systems & Network Engineer',
    dept: 'Infrastructure',
    type: 'Full-Time',
    location: 'Remote',
    icon: Terminal,
    tags: ['KVM', 'BGP', 'Linux', 'DDoS Mitigation'],
    desc: 'Manage hypervisor clusters, BGP routing policies, and WarShield L3/4/7 edge filtering. Own the metal.',
    link: 'mailto:careers@warnode.in?subject=Application:%20Systems%20Engineer',
  },
  {
    id: '02',
    title: 'Technical Support Specialist (L2/L3)',
    dept: 'Customer Experience',
    type: 'Full-Time / Part-Time',
    location: 'Remote',
    icon: Headphones,
    tags: ['Tickets', 'Server Mgmt', 'Migration', 'DNS'],
    desc: 'Be the first line of expertise for gamers and developers. Solve real infrastructure problems daily.',
    link: 'mailto:careers@warnode.in?subject=Application:%20Support%20Specialist',
  },
  {
    id: '03',
    title: 'Full Stack Web Developer',
    dept: 'Engineering',
    type: 'Full-Time',
    location: 'Remote',
    icon: Code2,
    tags: ['Next.js', 'TypeScript', 'React', 'Node.js'],
    desc: 'Build the client portal, billing automation, and API integrations powering thousands of servers.',
    link: 'mailto:careers@warnode.in?subject=Application:%20Full%20Stack%20Developer',
  },
  {
    id: '04',
    title: 'Sales & Partnerships Executive',
    dept: 'Business',
    type: 'Full-Time',
    location: 'Remote',
    icon: Handshake,
    tags: ['B2B', 'Partnerships', 'Growth', 'Infrastructure'],
    desc: 'Grow WarNodes through strategic relationships. Understand complex infrastructure requirements, present suitable solutions, and build long-term enterprise partnerships.',
    link: 'mailto:careers@warnode.in?subject=Application:%20Sales%20and%20Partnerships',
  },
]

export default function CareersPage() {
  const scrollToPositions = () => {
    const el = document.getElementById('open-positions')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f] z-0 pointer-events-none" />
      
      {/* Background Blobs */}
      <div className="absolute top-20 -left-32 w-64 h-64 blob-primary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      <div className="absolute top-40 -right-32 w-72 h-72 blob-primary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 -right-24 w-56 h-56 blob-secondary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />

        {/* ─── Polished Careers Hero ─── */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-6">
                <Briefcase className="w-4 h-4 icon-text-primary" />
                <span className="icon-text-primary text-sm uppercase tracking-wider font-semibold">Join WarNodes</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="orbitron-font text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight"
            >
              Build the infrastructure <br className="hidden sm:block" /> behind <span className="icon-text-primary">what's next.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join an elite team engineering ultra-fast, resilient cloud infrastructure. We are looking for passionate builders who want to shape the future of hosting.
            </motion.p>
            
            <motion.button 
              onClick={scrollToPositions}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="button-primary text-white orbitron-font px-8 py-4 rounded-md text-sm font-bold transition-all flex items-center gap-2 group"
            >
              View Open Positions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </section>

        {/* ─── Benefits Section ─── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white mb-3">Why <span className="icon-text-primary">WarNodes?</span></h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">We provide the environment and resources you need to do your best work.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md hover:border-secondary hover:hover-gradient group transition-all duration-300 relative p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors pr-2">
                      {benefit.label}
                    </h3>
                    <div className="w-10 h-10 border-l border-b border-primary rounded-tr-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 icon-primary" />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.sub}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ─── What You'll Build ─── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-6">
                <span className="icon-text-primary text-sm uppercase tracking-wider font-semibold">Our Engineering</span>
              </div>
              <h2 className="orbitron-font text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                What You'll <span className="icon-text-primary">Build</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                We're not just another hosting company. We build our own control panels, our own DDoS mitigation layers, and manage complex networking across the globe. You will work on hard, meaningful problems.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUILD_ITEMS.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md hover:border-secondary hover:hover-gradient group transition-all duration-300 relative p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-semibold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors pr-2">
                      {item.title}
                    </h3>
                    <div className="w-10 h-10 border-l border-b border-primary rounded-tr-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 icon-primary" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How We Work ─── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white mb-3">How We <span className="icon-text-primary">Work</span></h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">Our culture is built on trust, excellence, and a shared passion for technology.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORK_VALUES.map((value, i) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:border-secondary hover:hover-gradient group transition-all duration-300 relative"
              >
                <div className="w-12 h-12 border-l border-b border-primary rounded-tr-lg flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 icon-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Open Positions ─── */}
        <section id="open-positions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-4">
                <span className="icon-text-primary text-sm uppercase tracking-wider font-semibold">Join the team</span>
              </div>
              <h2 className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Open <span className="icon-text-primary">Positions</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{OPENINGS.length} roles currently open — all remote</p>
            </div>
          </div>

          <div className="space-y-4">
            {OPENINGS.map((role, i) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md hover:border-secondary hover:hover-gradient group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded-sm card-primary text-gray-800 dark:text-gray-200 border border-primary">
                          {role.dept}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {role.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5" /> {role.location}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors mb-3">
                        {role.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">{role.desc}</p>
                      
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-sm bg-gray-100/50 dark:bg-white/5 border border-primary text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex lg:flex-col lg:items-end justify-between items-center gap-4 pt-4 lg:pt-0 mt-4 lg:mt-0 lg:pl-6 lg:border-l border-primary">
                      <div className="w-12 h-12 border-l border-b border-primary rounded-tr-lg flex items-center justify-center hidden lg:flex">
                        <Icon className="w-6 h-6 icon-primary" />
                      </div>
                      <a
                        href={role.link}
                        className="button-primary text-white orbitron-font px-6 py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2 w-full lg:w-auto"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ─── General Application CTA ─── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md hover:border-secondary hover:hover-gradient p-10 text-center relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 blob-secondary rounded-full blur-3xl opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto border-l border-b border-primary rounded-tr-lg flex items-center justify-center mb-6 bg-white/5 backdrop-blur-sm">
                <Users className="w-7 h-7 icon-primary" />
              </div>
              <h2 className="orbitron-font text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-icon-text-primary transition-colors">
                Don't see a <span className="icon-text-primary">perfect fit?</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-8 max-w-xl mx-auto">
                We are constantly growing and looking for exceptional talent. Send us your resume and a brief introduction, and we'll reach out when a relevant position opens up.
              </p>
              <a
                href="mailto:careers@warnode.in?subject=General%20Application"
                className="button-primary text-white orbitron-font px-8 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 group-hover:scale-105 transition-transform"
              >
                Send General Application
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* ─── Community Section (Standard Discord Banner with Custom Text) ─── */}
        <DiscordBanner 
          customTitle="Join our community"
          customSubtitle="Get to know us better before applying"
          customDescription="Join thousands of developers and gamers in our Discord community. Chat with the team, ask questions, and see how we operate."
        />

        <style>{`
          /* Hide the generic footer Discord banner on this page to avoid duplicates */
          .relative > .relative.z-30.-mb-47 { display: none !important; }
        `}</style>
        
        <Footer />
      </div>
    </div>
  )
}
