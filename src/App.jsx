"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Data
const STAFF = [
  { 
    name: "Gurider Singh Shahi", 
    role: "Managing Director", 
    img: "/papa.jpeg", 
    info: "Gurinder Singh Shahi leads the studio with 15+ years of experience in architectural design and management." 
  },
  { 
    name: "Manpreet Singh", 
    role: "Architect", 
    img: "/mama.jpeg", 
    info: "Manpreet Singh specializes in modern, sustainable, and functional architecture." 
  },
];

const SERVICES = [
  { title: "Residential Design", desc: "Modern, functional homes tailored to your lifestyle." },
  { title: "Commercial Architecture", desc: "Smart commercial spaces that inspire productivity." },
  { title: "Interior Design", desc: "Elegant and functional interior layouts." },
];

const PROJECTS = [
  { name: "Skyline Tower", images: ["/img1.jpeg"], info: "A modern skyscraper with sustainable design and panoramic views." },
  { name: "Oceanfront Villa", images: ["/img2.jpeg"], info: "Luxury villa combining modern architecture with beachfront aesthetics." },
  { name: "Urban Library", images: ["/img3.jpeg"], info: "A public library designed to inspire creativity and community engagement." },
];

const PRICING = [
  { title: "Basic Package", price: "$2000", desc: "Ideal for small residential projects and consultations." },
  { title: "Standard Package", price: "$5000", desc: "Perfect for medium-sized projects and interior designs." },
  { title: "Premium Package", price: "$10000", desc: "Complete design solutions for large-scale projects." },
];

export default function App() {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [modalContent, setModalContent] = useState(null);

  // Hero animations
  const fadeOut = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const slideUp = useTransform(scrollYProgress, [0, 0.05], [0, -50]);
  const fadeIn1 = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const slideDown1 = useTransform(scrollYProgress, [0.15, 0.25], [50, 0]);
  const fadeIn2 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const slideUp2 = useTransform(scrollYProgress, [0.4, 0.5], [-50, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (videoRef.current && videoRef.current.duration) {
        const loopProgress = progress % 1;
        videoRef.current.currentTime = loopProgress * videoRef.current.duration;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-screen min-h-screen font-sans text-white overflow-x-hidden overflow-y-scroll scrollbar-hide">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md py-4 px-4 md:px-8 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}>SHAHI ARCHITECTS</div>
        <div className="flex gap-4 md:gap-6 text-sm md:text-base">
          {["hero","staff","services","projects","pricing","contact"].map((sec) => (
            <button key={sec} onClick={() => scrollToSection(sec)} className="hover:text-green-500 transition">{sec.charAt(0).toUpperCase() + sec.slice(1)}</button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="sticky top-0 w-screen h-screen flex flex-col justify-center items-center text-center pointer-events-none">
        <video ref={videoRef} src="/video.mp4" muted autoPlay loop playsInline className="fixed top-0 left-0 w-screen h-screen object-cover z-0" />
        <motion.h1 style={{ opacity: fadeOut, y: slideUp }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold z-10 px-2">SHAHI ARCHITECTS</motion.h1>
        <motion.h2 style={{ opacity: fadeIn1, y: slideDown1 }} className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold z-10 px-2">Designing spaces that inspire.</motion.h2>
        <motion.h2 style={{ opacity: fadeIn2, y: slideUp2 }} className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold z-10 px-2">Bridging creativity and functionality.</motion.h2>
      </section>

      {/* Staff Section */}
      <section id="staff" className="relative z-20 max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-12 text-center">Meet Our Staff</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {STAFF.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setModalContent({ type: "staff", data: member })}
            >
              <img src={member.img} alt={member.name} className="w-32 h-32 rounded-xl mb-4 object-cover" />
              <h3 className="text-xl font-bold text-center">{member.name}</h3>
              <p className="text-white/70 text-center">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-20 max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-12 text-center">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.15}}
              onClick={()=>setModalContent({type:"service", data:s})}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">{s.title}</h3>
              <p className="text-white/70 text-center text-sm sm:text-base">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-20 max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((proj,i)=>(
            <motion.div key={i} initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.15}}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={()=>setModalContent({type:"project", data:proj})}>
              <img src={proj.images[0]} alt={proj.name} className="w-24 sm:w-32 h-24 sm:h-32 rounded-xl mb-2 sm:mb-4 object-cover" />
              <h3 className="text-lg sm:text-xl font-bold text-white text-center">{proj.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-20 max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-12 text-center">Pricing / Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {PRICING.map((p,i)=>(
            <motion.div key={i} initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.15}}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={()=>setModalContent({type:"pricing", data:p})}>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">{p.title}</h3>
              <p className="text-2xl sm:text-3xl font-extrabold mb-2">{p.price}</p>
              <p className="text-white/70 text-center text-sm sm:text-base">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-20 bg-transparent py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">Contact Me</h2>
        <p className="text-white/80 mb-4 text-sm sm:text-base">Want to discuss your project? Contact me on WhatsApp.</p>
        <a href="https://wa.me/8872088177" target="_blank" className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition text-sm sm:text-base">
          Contact on WhatsApp
        </a>
      </section>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
          <div className="bg-[#1f1f1f] p-4 sm:p-6 rounded-2xl max-w-xl sm:max-w-3xl w-full relative">
            <button onClick={()=>setModalContent(null)} className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-2xl sm:text-3xl">&times;</button>
            
            {modalContent.type==="project" && (
              <div className="flex flex-col items-center">
                <img src={modalContent.data.images[0]} className="w-full h-64 sm:h-80 object-cover rounded-xl mb-4"/>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">{modalContent.data.name}</h3>
                <p className="text-white/70 text-center text-sm sm:text-base">{modalContent.data.info}</p>
              </div>
            )}

            {modalContent.type==="staff" && (
              <div className="flex flex-col items-center">
                <img src={modalContent.data.img} className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-xl mb-2 sm:mb-4"/>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{modalContent.data.name}</h3>
                <p className="text-white/70 text-center text-sm sm:text-base mb-2">{modalContent.data.role}</p>
                <p className="text-white/70 text-center text-sm sm:text-base">{modalContent.data.info}</p>
              </div>
            )}

            {modalContent.type==="service" && (
              <div className="flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{modalContent.data.title}</h3>
                <p className="text-white/70 text-center text-sm sm:text-base">{modalContent.data.desc}</p>
              </div>
            )}

            {modalContent.type==="pricing" && (
              <div className="flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{modalContent.data.title}</h3>
                <p className="text-2xl sm:text-3xl font-extrabold mb-2">{modalContent.data.price}</p>
                <p className="text-white/70 text-center text-sm sm:text-base">{modalContent.data.desc}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}