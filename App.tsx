import { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring,
  useInView
} from 'motion/react';
import { 
  Cpu, 
  Settings, 
  Smartphone, 
  Shield, 
  CloudRain, 
  Mail, 
  Phone, 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Zap,
  Globe,
  Code
} from 'lucide-react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  { name: 'Embedded Systems', level: 'Beginner', icon: Cpu, desc: 'Arduino & Microcontrollers' },
  { name: 'Circuit Design', level: 'Beginner', icon: Zap, desc: 'Hardware logic & PCBA' },
  { name: 'Sensors', level: 'Beginner', icon: Smartphone, desc: 'Integration & Data processing' },
  { name: 'Programming', level: 'Beginner', icon: Code, desc: 'C, C++ & Problem Solving' },
];

const projects = [
  {
    title: 'Hydrosmart Irrigation',
    desc: 'An automated system designed to optimize water usage in farming through real-time moisture sensing.',
    icon: Globe,
    tags: ['Embedded', 'Sustainability', 'Sensors']
  },
  {
    title: 'Motion Sensing Alarm',
    desc: 'Advanced security system utilizing PIR sensors to detect intruders and trigger instant alerts.',
    icon: Shield,
    tags: ['Security', 'Hardware', 'Logic']
  },
  {
    title: 'Rain Sensing Windows',
    desc: 'Smart home automation that detects precipitation and autonomously secures window mechanisms.',
    icon: CloudRain,
    tags: ['Automation', 'Mechatronics']
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY + 100;
      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= currentScroll && (el.offsetTop + el.offsetHeight) > currentScroll) {
          setActiveSegment(sec.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-mono font-bold text-white">
              PV
            </div>
            <span className="font-mono text-sm tracking-tighter uppercase hidden sm:block">
              Prem Vaidya <span className="text-slate-500">// ENTC Student</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`text-xs font-mono tracking-widest uppercase transition-colors hover:text-blue-400 ${
                  activeSegment === sec.id ? 'text-blue-400' : 'text-slate-400'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 px-6 pt-24"
          >
            <div className="flex flex-col gap-6">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="text-2xl font-mono uppercase text-left border-b border-slate-800 pb-4"
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="technical-grid">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full relative">
            <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
            <div className="absolute top-20 -left-60 w-[500px] h-[500px] bg-slate-400/5 blur-[120px] rounded-full" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full mb-8">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                  Available for Internships
                </span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-bold mb-6 leading-[0.9] tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  PREM
                </span>
                <br /> VAIDYA
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                Electronics & Telecommunication Engineering student dedicated to exploring 
                the intersection of hardware and intelligent automation.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollTo('projects')}
                  className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 group"
                >
                  View Projects
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-4 bg-slate-900 text-white border border-slate-800 font-medium rounded-lg hover:bg-slate-800 transition-all"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>

            {/* Floating Visual Accent */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
            >
              <div className="w-[400px] h-[400px] border border-blue-500/10 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="w-[300px] h-[300px] border border-blue-500/20 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                  <div className="w-[200px] h-[200px] border border-blue-500/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <Cpu size={80} className="text-blue-500/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-500 mb-4">
                  01. Background
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-8">
                  Engineering student with a <br />
                  passion for innovation.
                </h3>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                  <p>
                    I am a first-year Electronics and Telecommunication Engineering (ENTC) student 
                    at <span className="text-slate-200">MIT Academy of Engineering (MITAOE)</span>. 
                    My journey is fueled by a strong interest in technology and problem-solving.
                  </p>
                  <p>
                    Currently, I'm building my foundation in electronics and communication systems, 
                    aiming to bridge the gap between theoretical concepts and real-world 
                    practical applications through hands-on projects.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-colors" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                  <Smartphone size={14} /> Academic Focus
                </h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-white font-medium mb-1">First-Year B.Tech</h5>
                    <p className="text-slate-500 text-sm italic">2025 - Present</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">MIT Academy of Engineering</h5>
                    <p className="text-slate-400 text-sm">Electronics and Telecommunication (ENTC)</p>
                  </div>
                  <div className="pt-6 border-t border-slate-800/50">
                    <p className="text-slate-400 text-sm">
                      Actively participating in robotics clubs and electronics labs to refine 
                      technical prototyping skills.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-500 mb-4">
                02. Technical Arsenal
              </h2>
              <h3 className="text-4xl font-bold mb-4">My Core Competencies</h3>
              <p className="text-slate-400 italic">Focused on developing a strong technical foundation at the beginner level.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-xl group"
                >
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <skill.icon className="text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{skill.name}</h4>
                  <p className="text-slate-500 text-sm mb-4">{skill.desc}</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono text-blue-500 uppercase tracking-widest bg-blue-500/5 px-2 py-1 rounded">
                    {skill.level}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-500 mb-4">
                  03. Implementations
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold">Featured Projects</h3>
              </div>
              <p className="text-slate-400 max-w-md italic">
                From conceptual circuits to working prototypes — exploring the future of IoT and automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col h-full bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group"
                >
                  <div className="mb-8 flex justify-between items-start">
                    <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <proj.icon size={28} className="text-blue-500" />
                    </div>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {proj.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-1 bg-slate-800 text-slate-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none technical-grid" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-slate-800">
                  <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-500 mb-4">
                    04. Connect
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-bold mb-8">
                    Let's discuss <br /> your next project.
                  </h3>
                  <p className="text-slate-400 mb-12 text-lg">
                    I am currently looking for summer internships and collaborative projects in 
                    embedded systems and hardware design.
                  </p>

                  <div className="space-y-6">
                    <a href="mailto:premvaidhya06@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                        <Mail size={18} />
                      </div>
                      premvaidhya06@gmail.com
                    </a>
                    <a href="tel:+917020083966" className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                        <Phone size={18} />
                      </div>
                      +91 7020083966
                    </a>
                  </div>
                </div>

                <div className="p-12 lg:p-20">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email</label>
                        <input 
                          type="email" 
                          placeholder="your@email.com"
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Message</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors resize-none"
                      />
                    </div>
                    <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                      Send Message
                      <ChevronRight size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} PREM VAIDYA. ARCHITECTED FOR INNOVATION.
          </p>
          <div className="flex gap-6">
            <span className="text-xs font-mono text-slate-400">VIT-AP UNIVERSITY</span>
            <span className="text-xs font-mono text-slate-600">|</span>
            <span className="text-xs font-mono text-slate-400 underline decoration-blue-500/50 underline-offset-4">ENTC ENGINEERING</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
