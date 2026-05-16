/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  ArrowRight, 
  Home, 
  Building2, 
  Hotel, 
  Key, 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Mail,
  ChevronRight,
  ChevronLeft,
  Star,
  Users,
  Compass,
  Zap,
  MessageSquare,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';

// --- Components ---

const Navbar = ({ user, onAuthClick, onLogout }: { user: any, onAuthClick: () => void, onLogout: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'glass py-3' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tighter cursor-pointer group"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-amber-400">LUXE</span>
          <span className="italic font-light opacity-70 border-r border-white/20 pr-4 mr-4 italic text-white/80 group-hover:opacity-100 transition-opacity">ESTATE</span>
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
          {['Home', 'Properties', 'Agents', 'Services', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Welcome</span>
                <span className="text-sm font-serif">{user.name}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="p-3 glass rounded-full hover:bg-white hover:text-black transition-all"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all shadow-xl"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onAction, onSearch, searchQuery, suggestions, onSearchExecute }: { 
  onAction: () => void, 
  onSearch: (val: string) => void, 
  searchQuery: string,
  suggestions: string[],
  onSearchExecute: () => void
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-neutral-950/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071" 
          alt="Luxury Villa" 
          className="w-full h-[120%] object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-xs uppercase tracking-[0.5em] text-white/60 mb-6 block">Elite Real Estate Collection</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-none mb-8 tracking-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-rose-400 italic font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Dream</span> Property
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Curating the world's most prestigious residences for those who demand excellence in every detail of their lives.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-3xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center px-6 w-full border-b md:border-b-0 md:border-r border-white/10 py-3 group relative">
              <Search className="w-5 h-5 text-white/40 mr-4 group-focus-within:text-white/70 transition-colors" />
              <div className="w-[1px] h-5 bg-white/10 mr-4" />
              <input 
                type="text" 
                placeholder="Search by location (e.g. Hills, Florida, Japan)..." 
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-transparent w-full outline-none text-white placeholder:text-white/20 text-sm"
              />
              
              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {isFocused && searchQuery.length > 0 && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-4 glass-dark rounded-2xl overflow-hidden z-50 py-2 border border-white/10 shadow-2xl"
                  >
                    {suggestions.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          onSearch(loc);
                          onSearchExecute();
                        }}
                        className="w-full px-6 py-3 text-left text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <MapPin className="w-4 h-4 opacity-40" />
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex-1 flex items-center px-6 w-full border-b md:border-b-0 md:border-r border-white/10 py-3 group">
              <Home className="w-5 h-5 text-white/40 mr-4 group-focus-within:text-white/70 transition-colors" />
              <div className="w-[1px] h-5 bg-white/10 mr-4" />
              <select className="bg-transparent w-full outline-none text-white text-sm appearance-none cursor-pointer placeholder:text-white/20">
                <option value="" className="bg-neutral-900">Property Type</option>
                <option value="villa" className="bg-neutral-900">Villa</option>
                <option value="apartment" className="bg-neutral-900">Apartment</option>
                <option value="mansion" className="bg-neutral-900">Mansion</option>
              </select>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onSearchExecute}
              className="w-full md:w-auto bg-gradient-to-r from-indigo-600 via-emerald-600 to-rose-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl"
            >
              Search
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={onAction}
            className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-bold group text-indigo-400"
          >
            Explore Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.button>
          <div className="h-[1px] w-12 bg-white/20 hidden md:block"></div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={onAction}
            className="text-sm uppercase tracking-[0.2em] text-emerald-400 font-bold opacity-80 hover:opacity-100 transition-opacity"
          >
            Contact Agent
          </motion.button>
        </div>
      </div>

      {/* Hero Gradients */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-neutral-950 to-transparent z-10"></div>
    </section>
  );
};

const PropertyCard = ({ property, onAction }: { property: any, onAction: (prop: any) => void }) => {
  const { image, price, title, location, beds, baths, sqft } = property;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-neutral-900/50 border border-white/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-all duration-500"></div>
        <div className="absolute top-6 left-6 inline-flex px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-emerald-400 z-20 border border-emerald-400/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          Available
        </div>
        <div className="absolute top-6 right-6 inline-flex px-4 py-2 glass rounded-full text-sm font-bold text-white z-20 border border-white/10">
          ${price}
        </div>
        <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button 
            onClick={() => onAction(property)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
          >
            Inquire Now
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif mb-1 group-hover:text-white transition-colors">{title}</h3>
            <div className="flex items-center text-white/40 text-sm">
              <MapPin className="w-3 h-3 mr-1" /> {location}
            </div>
          </div>
          <div className="text-xl font-bold text-white">${price}</div>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-white/5 text-white/50 text-sm">
          <div className="flex items-center gap-2"><Bed className="w-4 h-4" /> {beds} Beds</div>
          <div className="flex items-center gap-2"><Bath className="w-4 h-4" /> {baths} Baths</div>
          <div className="flex items-center gap-2 space-x-1"> {sqft} sqft</div>
        </div>
      </div>
    </motion.div>
  );
};

const PropertyDetailsModal = ({ isOpen, onClose, property, onInquire }: { isOpen: boolean, onClose: () => void, property: any, onInquire: () => void }) => {
  if (!property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="max-w-5xl w-full bg-neutral-900 rounded-[3rem] overflow-hidden luxury-shadow border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
              {/* Left Side: Large Image */}
              <div className="lg:w-1/2 relative bg-neutral-800">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover min-h-[300px] lg:min-h-[600px]" 
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={onClose}
                  className="absolute top-6 left-6 p-3 glass rounded-full hover:bg-white hover:text-black transition-all z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Right Side: Details & Action */}
              <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Property Details</span>
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      Rare Opportunity
                    </div>
                  </div>

                  <h3 className="text-4xl lg:text-5xl font-serif mb-4 leading-tight">{property.title}</h3>
                  <div className="flex items-center text-white/60 mb-8 text-lg">
                    <MapPin className="w-5 h-5 mr-3 text-indigo-400" /> {property.location}
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-white/5">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-white text-xl mb-1">
                        <Bed className="w-5 h-5 text-indigo-400" /> {property.beds}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Beds</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-white text-xl mb-1">
                        <Bath className="w-5 h-5 text-emerald-400" /> {property.baths}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Baths</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-white text-xl mb-1">
                        <Compass className="w-5 h-5 text-rose-400" /> {property.sqft}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Sqft</div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <h4 className="text-xs uppercase tracking-widest font-black text-white/60">Description</h4>
                    <p className="text-white/40 leading-relaxed font-light">
                      This exceptional property offers an unparalleled level of luxury and sophistication. 
                      Featuring bespoke craftsmanship, state-of-the-art technology, and breathtaking views, 
                      it represents the pinnacle of modern architecture and design. Ideal for the discerning 
                      investor or individual seeking a legacy residence.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Market Value</div>
                      <div className="text-4xl font-black text-white">${property.price}</div>
                    </div>
                    <div className="text-xs text-white/20 italic">Pre-approved financing available</div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onInquire}
                    className="w-full py-6 bg-gradient-to-r from-indigo-600 via-emerald-600 to-rose-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:brightness-110 transition-all shadow-2xl shadow-indigo-600/20"
                  >
                    Send Private Inquiry
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Categories = ({ onSelect }: { onSelect: (title: string) => void }) => {
  const cats = [
    { title: 'Apartments', icon: Hotel, count: 124, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
    { title: 'Villas', icon: Home, count: 86, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800' },
    { title: 'Mansions', icon: Building2, count: 42, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
    { title: 'All Properties', icon: Zap, count: 250, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cats.map((cat, i) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(cat.title)}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl"
          >
            <img 
              src={cat.img} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-neutral-950/60 transition-opacity group-hover:opacity-40"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                i === 0 ? 'bg-indigo-600/40 group-hover:bg-indigo-600' :
                i === 1 ? 'bg-emerald-600/40 group-hover:bg-emerald-600' :
                i === 2 ? 'bg-amber-600/40 group-hover:bg-amber-600' :
                'bg-rose-600/40 group-hover:bg-rose-600'
              }`}>
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-serif mb-1">{cat.title}</h3>
              <p className="text-white/60 text-sm tracking-widest uppercase">{cat.count} Listings</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ value, title }: { value: number, title: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    let timer: any;

    const onScroll = (entries: any) => {
      if (entries[0].isIntersecting) {
        timer = setInterval(() => {
          start += end / (duration / 16);
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    };

    const observer = new IntersectionObserver(onScroll);
    if (ref.current) observer.observe(ref.current);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [value]);

  return (
    <div ref={ref} className="text-center px-10 border-r border-white/10 last:border-0">
      <div className="text-5xl md:text-7xl font-serif mb-4 flex items-center justify-center">
        {count} <span className="text-3xl ml-1 font-sans opacity-50">+</span>
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/40">{title}</div>
    </div>
  );
};

const SectionHeader = ({ subtitle, title, description }: any) => (
  <div className="max-w-4xl mb-20">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-xs uppercase tracking-[0.5em] font-bold mb-6 flex items-center gap-4"
    >
      <div className="w-12 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-500"></div> 
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-amber-400">
        {subtitle}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-serif mb-8 leading-tight tracking-tight"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
    >
      {description}
    </motion.p>
  </div>
);

const Agents = () => {
  const agents = [
    { name: 'Isabella Vane', role: 'Luxury Advisor', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Marcus Thorne', role: 'Property Specialist', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' },
    { name: 'Elena Sterling', role: 'Global Sales Exec', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section id="agents" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader 
        subtitle="The Experts"
        title="Meet Our Premium Agents"
        description="A group of dedicated professionals with decades of experience in high-end real estate and private investments."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {agents.map((agent, i) => (
          <motion.div 
            key={agent.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 transition-all duration-700">
              <img 
                src={agent.img} 
                alt={agent.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-all duration-500"></div>
              
              {/* Socials */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="glass p-3 rounded-full hover:bg-white hover:text-black cursor-pointer transition-colors"><Twitter className="w-4 h-4" /></div>
                <div className="glass p-3 rounded-full hover:bg-white hover:text-black cursor-pointer transition-colors"><Instagram className="w-4 h-4" /></div>
                <div className="glass p-3 rounded-full hover:bg-white hover:text-black cursor-pointer transition-colors"><Linkedin className="w-4 h-4" /></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif mb-1">{agent.name}</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">{agent.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const images = [
    { 
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      title: 'Parametric Ceiling Design',
      detail: 'This installation features custom-milled white oak panels arranged in a mathematical sequence to optimize acoustics and light diffusion. The pattern creates a sense of rhythmic movement that defines the primary living space.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
      title: 'Floating Spiral Staircase',
      detail: 'A structural masterpiece of cantilevered steel and tempered glass. The staircase provides a transparent vertical axis, allowing natural light from the skylight to reach the basement levels.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800',
      title: 'Minimalist Materiality',
      detail: 'The kitchen utilizes seamless Pietra Grey marble surfaces integrated with hidden smart appliances. The handle-less cabinetry creates a monolithic appearance that blends into the architecture.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
      title: 'Indoor-Outdoor Infinity Pool',
      detail: 'Constructed with a zero-edge perimeter and basalt stone tiling. The pool uses a hidden hydraulic system to maintain water levels and temperature, creating a continuous water plane.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
      title: 'Smart Lighting Integration',
      detail: 'Advanced sensor-driven lighting that adapts to circadian rhythms. Recessed linear LEDs define the structural lines of the room while maintaining a glare-free environment.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      title: 'Zen Master Suite',
      detail: 'A sanctuary designed using sacred geometry principles. The proportions of the space are derived from the Golden Ratio, complemented by floor-to-ceiling glass that frames the natural landscape.'
    },
  ];

  return (
    <section className="py-24 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          subtitle="Portfolio"
          title="Luxury Interior Designs"
          description="A glimpse into the architectural masterpieces we handle, where elegance meets functionality in every corner."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:grid-rows-2">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(i)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square md:aspect-auto h-full'}`}
            >
              <img 
                src={img.url} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black leading-loose">View Architectural Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neutral-950/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-neutral-900 rounded-[3rem] overflow-hidden luxury-shadow border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 aspect-square md:aspect-auto">
                  <img src={images[selectedImage].url} alt="Detail" className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block">Detail Analysis</span>
                  <h3 className="text-4xl font-serif mb-8">{images[selectedImage].title}</h3>
                  <p className="text-white/60 leading-relaxed font-light mb-12">
                    {images[selectedImage].detail}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(null)}
                    className="self-start px-10 py-4 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-black"
                  >
                    Close Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default function App() {
  const locations = [
    "Beverly Hills, CA", "Malibu, Florida", "Kyoto, Japan", "Dubai, UAE", 
    "Monaco", "Singapore", "Aspen, CO", "Santorini, Greece",
    "Upper East Side, NY", "Lake Como, Italy", "Zermatt, Switzerland",
    "Ubud, Bali", "Cap d'Antibes, France", "Cape Town, SA",
    "Islamabad, Pakistan", "Karachi, Pakistan", "Lahore, Pakistan"
  ];

  const [activeTab, setActiveTab] = useState('All');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAllPropertiesVisible, setIsAllPropertiesVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const propertiesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) throw new Error('Unable to load properties');
        const data = await response.json();
        if (Array.isArray(data.properties)) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.warn('Backend properties load failed:', error);
      }
    };

    loadProperties();
  }, []);

  const allPropertiesList = [
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      title: "The Glass Pavilion",
      location: "Beverly Hills, CA",
      price: "12,500,000",
      beds: 6, baths: 8, sqft: 7500,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Oceanfront Sanctuary",
      location: "Malibu, Florida",
      price: "8,200,000",
      beds: 4, baths: 5, sqft: 4200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      title: "Zen Modernist Estate",
      location: "Kyoto, Japan",
      price: "15,000,000",
      beds: 5, baths: 6, sqft: 6800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Alpine Crystal Lodge",
      location: "Aspen, CO",
      price: "18,900,000",
      beds: 7, baths: 9, sqft: 9200,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
      title: "Mediterranean Cliff House",
      location: "Santorini, Greece",
      price: "6,500,000",
      beds: 3, baths: 4, sqft: 3100,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      title: "Urban Penthouse Oasis",
      location: "Upper East Side, NY",
      price: "22,000,000",
      beds: 5, baths: 5, sqft: 5500,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
      title: "Desert Mirage Villa",
      location: "Dubai, UAE",
      price: "11,200,000",
      beds: 6, baths: 6, sqft: 8400,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800",
      title: "Azure Bay Estate",
      location: "Monaco",
      price: "45,000,000",
      beds: 8, baths: 10, sqft: 12500,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
      title: "Skyline Majesty",
      location: "Singapore",
      price: "14,500,000",
      beds: 4, baths: 4, sqft: 3800,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1564013799911-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
      title: "Villa Lake Como",
      location: "Lake Como, Italy",
      price: "32,000,000",
      beds: 10, baths: 12, sqft: 15000,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800",
      title: "Matterhorn Ridge",
      location: "Zermatt, Switzerland",
      price: "12,900,000",
      beds: 5, baths: 5, sqft: 4500,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800",
      title: "Balinese Forest Haven",
      location: "Ubud, Bali",
      price: "3,500,000",
      beds: 4, baths: 4, sqft: 3200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1602343168117-bb89182354c0?auto=format&fit=crop&q=80&w=800",
      title: "Indigo Blue Estate",
      location: "Islamabad, Pakistan",
      price: "4,500,000",
      beds: 6, baths: 7, sqft: 8500,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Emerald Coast Penthouse",
      location: "Karachi, Pakistan",
      price: "2,800,000",
      beds: 4, baths: 4, sqft: 4500,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
      title: "Golden Heritage Villa",
      location: "Lahore, Pakistan",
      price: "1,950,000",
      beds: 3, baths: 3, sqft: 2800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      title: "Rosewood Gardens",
      location: "Islamabad, Pakistan",
      price: "3,200,000",
      beds: 5, baths: 5, sqft: 5200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Royal Palm Residence",
      location: "Lahore, Pakistan",
      price: "5,800,000",
      beds: 7, baths: 8, sqft: 9500,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800",
      title: "Amber Reef Villa",
      location: "Cap d'Antibes, France",
      price: "18,500,000",
      beds: 5, baths: 6, sqft: 6200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
      title: "Violet Peak Retreat",
      location: "Cape Town, SA",
      price: "7,200,000",
      beds: 4, baths: 4, sqft: 4800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1628592102751-ba824971447d?auto=format&fit=crop&q=80&w=800",
      title: "Neon City Tower",
      location: "Tokyo, Japan",
      price: "19,500,000",
      beds: 3, baths: 3, sqft: 4200,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      title: "Emerald Lake Lodge",
      location: "Banff, Canada",
      price: "9,800,000",
      beds: 5, baths: 5, sqft: 5800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      title: "Golden Desert Oasis",
      location: "Riyadh, Saudi Arabia",
      price: "25,000,000",
      beds: 8, baths: 9, sqft: 11000,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Silver Moon Villa",
      location: "Ibiza, Spain",
      price: "6,400,000",
      beds: 4, baths: 5, sqft: 3800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1628592102751-ba824971447d?auto=format&fit=crop&q=80&w=800",
      title: "Pearl of the Orient",
      location: "Hong Kong",
      price: "15,200,000",
      beds: 4, baths: 4, sqft: 4500,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      title: "Verdant Hill Estate",
      location: "Singapore",
      price: "21,000,000",
      beds: 6, baths: 7, sqft: 8200,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Azure Shore Villa",
      location: "Phuket, Thailand",
      price: "4,200,000",
      beds: 3, baths: 4, sqft: 2800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1576013551527-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800",
      title: "Cloud Nine Penthouse",
      location: "Melbourne, Australia",
      price: "8,900,000",
      beds: 4, baths: 4, sqft: 4100,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
      title: "Diamond Head Manor",
      location: "Honolulu, Hawaii",
      price: "12,500,000",
      beds: 5, baths: 6, sqft: 6500,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800",
      title: "Snowy Peak Chalet",
      location: "Courchevel, France",
      price: "14,000,000",
      beds: 6, baths: 7, sqft: 5200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      title: "The Ruby Estate",
      location: "Karachi, Pakistan",
      price: "3,500,000",
      beds: 5, baths: 6, sqft: 6200,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      title: "Safire Palace",
      location: "Islamabad, Pakistan",
      price: "6,200,000",
      beds: 7, baths: 8, sqft: 10500,
      type: "Mansions"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Gulberg Heights Penthouse",
      location: "Lahore, Pakistan",
      price: "2,100,000",
      beds: 3, baths: 4, sqft: 3400,
      type: "Apartments"
    },
    {
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800",
      title: "Clifton Marina Vista",
      location: "Karachi, Pakistan",
      price: "3,750,000",
      beds: 5, baths: 5, sqft: 5800,
      type: "Villas"
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
      title: "E-7 Executive Estate",
      location: "Islamabad, Pakistan",
      price: "8,500,000",
      beds: 8, baths: 9, sqft: 12000,
      type: "Mansions"
    }
  ];

  const filteredProperties = (properties.length > 0 ? properties : allPropertiesList).filter(prop => {
    const collection = properties.length > 0 ? properties : allPropertiesList;
    const matchesSearch = prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || prop.type === activeTab;
    
    const isBasicFeatured = collection.indexOf(prop) < 6;
    
    if (searchQuery.length > 0) return matchesSearch && matchesTab;
    if (isAllPropertiesVisible) return matchesTab;
    return isBasicFeatured && matchesTab;
  });
  
  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleAction = (property?: any) => {
    if (property) {
      setSelectedProperty(property);
      setIsDetailsOpen(true);
      return;
    }

    if (!user) {
      setIsAuthOpen(true);
    } else {
      setShowSuccessToast(true);
      setIsDetailsOpen(false);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }
  };

  const handleSearchExecute = () => {
    setShowSuggestions(false);
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="relative">
      <div className="grain" />
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-[30%] right-[5%] w-[30%] h-[30%] bg-rose-500/10 blur-[80px] rounded-full"></div>
      </div>

      <Navbar 
        user={user} 
        onAuthClick={() => setIsAuthOpen(true)} 
        onLogout={() => setUser(null)}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess}
      />

      <PropertyDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        property={selectedProperty}
        onInquire={() => handleAction()}
      />

      {/* Floating Message Button */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMessageOpen(true)}
        className="fixed bottom-10 right-10 z-[150] w-16 h-16 bg-gradient-to-tr from-indigo-600 via-emerald-600 to-rose-600 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] border border-white/20 group"
      >
        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 group-hover:hidden"></div>
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Message Modal */}
      <AnimatePresence>
        {isMessageOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-xl"
            onClick={() => setIsMessageOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="max-w-md w-full glass-dark p-10 rounded-[3rem] luxury-shadow border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-serif mb-2">Message Agent</h3>
                <p className="text-white/40 text-sm">Direct connection to our elite advisors.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsMessageOpen(false); handleAction(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Your Name</label>
                  <input required type="text" className="luxury-input" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Message</label>
                  <textarea required className="luxury-input min-h-[120px] resize-none" placeholder="How can we assist you with your search?"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 via-emerald-600 to-rose-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:brightness-110 shadow-2xl transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-8 py-5 glass rounded-2xl luxury-shadow flex items-center gap-4 border border-emerald-500/30"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-serif text-lg">Message sent successfully!</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">A reply will come soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative z-10">
        <Hero 
          onAction={handleAction} 
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          suggestions={locations.filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()))}
          onSearchExecute={handleSearchExecute}
        />
        
        {/* Categories / Quick Nav */}
        <Categories onSelect={(cat) => {
          const tab = cat === 'All Properties' ? 'All' : cat;
          setActiveTab(tab);
          handleSearchExecute();
        }} />

        {/* Featured Properties */}
        <section id="properties" ref={propertiesRef as any} className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
            <SectionHeader 
              subtitle="Exclusive Deals"
              title={searchQuery ? `Results for "${searchQuery}"` : "Featured Properties"}
              description={searchQuery ? `Found ${filteredProperties.length} properties matching your search.` : "Explore our handpicked collection of ultra-luxury estates in prime locations across the globe."}
            />
            <div className="flex flex-wrap gap-4 pb-4">
              {['All', 'Villas', 'Apartments', 'Mansions'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${activeTab === tab ? 'bg-white text-black' : 'glass text-white/50 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop, idx) => (
                <PropertyCard 
                  key={idx}
                  property={prop}
                  onAction={handleAction}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-white/40 italic">No properties found matching your search.</p>
              </div>
            )}
          </div>
          
          <div className="mt-20 flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsAllPropertiesVisible(!isAllPropertiesVisible)}
              className="px-12 py-5 border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all bg-transparent"
            >
              {isAllPropertiesVisible ? "Show Featured Only" : "Discover All Properties"}
            </motion.button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 px-6 bg-neutral-900/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <SectionHeader 
                subtitle="Why Choose Us"
                title="Redefining Luxury Living Standards"
                description="Our approach goes beyond traditional real-estate. We provide a lifestyle and investment security for the world's most elite clientele."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                {[
                  { icon: ShieldCheck, title: 'Secure Investment', desc: 'Verified titles and high ROI locations.' },
                  { icon: Award, title: 'Trusted Agents', desc: 'Over 25 years of luxury market expertise.' },
                  { icon: Compass, title: 'Prime Locations', desc: 'Exclusive access to off-market gems.' },
                  { icon: Users, title: 'Professional Support', desc: '24/7 dedicated concierge services.' },
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/80">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif mb-2">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[4rem] overflow-hidden luxury-shadow transition-all duration-1000 border-4 border-white/5"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Luxury Feature" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </motion.div>
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 md:right-0 glass p-10 rounded-3xl z-20 backdrop-blur-3xl border-white/20"
              >
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-serif">25+</div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold leading-tight">Years Of<br/>Experience</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-white/5 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
            <Counter value={1200} title="Properties Sold" />
            <Counter value={950} title="Happy Clients" />
            <Counter value={12} title="Cities Covered" />
            <Counter value={150} title="Special Awards" />
          </div>
        </section>

        {/* Agents */}
        <Agents />

        {/* Gallery */}
        <GallerySection />

        {/* Testimonials */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <SectionHeader 
              subtitle="Testimonials"
              title="What Our Clients Say"
              description="Real feedback from families and investors who found their legacy through LuxeEstate."
            />
          </div>
          <div className="max-w-4xl mx-auto relative px-10">
            <div className="glass p-12 md:p-20 rounded-[3rem] relative text-center">
              <Star className="w-10 h-10 text-white/40 absolute top-10 left-10 opacity-20" />
              <p className="text-2xl md:text-4xl font-serif italic mb-10 leading-relaxed">
                "Working with LuxeEstate was naturally smooth. They understood our requirements for privacy and architectural brilliance perfectly. Our new villa in Malibu is more than a home; it's a sanctuary."
              </p>
              <div className="flex flex-col items-center">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
                  alt="Client" 
                  className="w-20 h-20 rounded-full object-cover mb-6 border-2 border-white/10"
                />
                <h4 className="text-xl font-serif">Jonathan Henderson</h4>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">CEO, Global Ventures</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="glass flex flex-col lg:flex-row rounded-[4rem] overflow-hidden border-white/10 luxury-shadow">
            <div className="lg:w-1/2 p-12 md:p-20">
              <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's Find Your <br/><span className="italic font-light">Legacy</span>.</h2>
              <p className="text-white/40 mb-12 max-w-md">Our consultants are ready to assist you in finding the perfect property that matches your status and lifestyle.</p>
              
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleAction(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="luxury-label">Full Name</label>
                    <input required type="text" className="luxury-input" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="luxury-label">Email Address</label>
                    <input required type="email" className="luxury-input" placeholder="john@example.com" />
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-neutral-200 transition-all shadow-2xl"
                >
                  Send Inquiry
                </motion.button>
              </form>
            </div>
            
            <div className="lg:w-1/2 relative min-h-[400px]">
              <div className="absolute inset-0 grayscale contrast-125 opacity-70">
                <iframe 
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.41173292350702!3d34.053225817812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bb20d656093d%3A0xc3f587214691459a!2sBeverly%20Hills!5e0!3m2!1sen!2sus!4v1715891341231!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none"></div>
              
              <div className="absolute bottom-10 left-10 p-10 glass rounded-3xl backdrop-blur-2xl">
                <h4 className="text-xl font-serif mb-4">Contact Info</h4>
                <div className="space-y-4 text-sm text-white/60">
                  <div className="flex items-center gap-3"><PhoneCall className="w-4 h-4" /> +1 (321) LUXE-STATE</div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4" /> info@luxestate.com</div>
                  <div className="flex items-center gap-3 underline decoration-white/20"><MapPin className="w-4 h-4" /> Beverly Hills, CA 90210</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-8">
              <div className="text-2xl font-serif font-bold tracking-tighter">
                LUXE<span className="italic font-light opacity-50">ESTATE</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                The world's most trusted name in luxury real estate, providing unparalleled service to a global audience of elite buyers and investors.
              </p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <motion.div key={i} whileHover={{ y: -3, color: '#fff' }} className="text-white/40 cursor-pointer border border-white/10 p-3 rounded-xl hover:border-white/20 transition-all">
                    <Icon className="w-4 h-4" />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 lg:col-span-2">
              <div className="space-y-6">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Quick Links</h4>
                <ul className="space-y-4 text-sm text-white/40 font-light">
                  <li><a href="#" className="hover:text-white transition-colors">Property Search</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Elite Agents</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Market Insights</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Global Portfolio</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Support</h4>
                <ul className="space-y-4 text-sm text-white/40 font-light">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Site Map</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Newsletter</h4>
              <p className="text-sm text-white/40 leading-relaxed mb-6">Receive exclusive off-market opportunities directly in your inbox.</p>
              <form className="relative group" onSubmit={(e) => { e.preventDefault(); handleAction(); }}>
                <input required type="email" placeholder="Email Address" className="luxury-input pr-16" />
                <button type="submit" className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black rounded-xl flex items-center justify-center hover:bg-neutral-200 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 LUXEESTATE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white">Imprint</a>
              <a href="#" className="hover:text-white">Accessibility</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
