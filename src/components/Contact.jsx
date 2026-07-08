import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Download, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Operator name required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Communication link required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid link address.";
    }
    if (!formData.message.trim()) tempErrors.message = "Transmission content required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Transmission failed.');
        }
        setIsSubmitting(false);
        setSubmittedName(formData.name);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error("Transmission error:", error);
        setIsSubmitting(false);
        setErrors({ form: error.message || "Transmission link failed. Please check backend connection." });
      });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-cyber-bg relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
          >
            Signal Link Establish
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-cyan mt-4 rounded-full shadow-neon-cyan" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Metadata & Social Connections Column (Left) */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="cyber-glass p-6 sm:p-8 rounded-lg relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyber-pink" />
              
              <h3 className="text-xl font-bold font-mono text-cyber-cyan mb-4">[CONTACT_CHANNELS]</h3>

              <div className="space-y-4">
                <a href="mailto:viragsjain1975@gmail.com" className="flex items-center gap-4 group text-gray-300 hover:text-white transition-colors">
                  <span className="p-3 rounded bg-cyber-dark/60 border border-cyber-purple/20 text-cyber-pink shadow-neon-pink group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 font-bold">EMAIL PROTOCOL</span>
                    <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-none block">viragsjain1975@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+919325033281" className="flex items-center gap-4 group text-gray-300 hover:text-white transition-colors">
                  <span className="p-3 rounded bg-cyber-dark/60 border border-cyber-purple/20 text-cyber-cyan shadow-neon-cyan group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 font-bold">CELL TERMINAL</span>
                    <span className="text-sm font-semibold">+91 9325033281</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 group text-gray-300">
                  <span className="p-3 rounded bg-cyber-dark/60 border border-cyber-purple/20 text-cyber-purple shadow-neon-purple">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 font-bold">GEO POSITION</span>
                    <span className="text-sm font-semibold">Pune, Maharashtra</span>
                  </div>
                </div>
              </div>

              {/* Social Anchors Row */}
              <div className="flex gap-4 pt-4 border-t border-cyber-purple/10">
                <a
                  href="https://www.linkedin.com/in/virag-nandgaonkar"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-cyber-dark border border-cyber-purple/20 rounded text-cyber-pink hover:bg-cyber-pink hover:text-white hover:border-cyber-pink transition-all shadow-neon-pink"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Virag23"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-cyber-dark border border-cyber-purple/20 rounded text-cyber-cyan hover:bg-cyber-cyan hover:text-white hover:border-cyber-cyan transition-all shadow-neon-cyan"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Direct Resume Download Button Card */}
            <a
              href="/Virag_Nandgaonkar.pdf"
              download="Virag_Nandgaonkar.pdf"
              className="cyber-glass p-6 rounded-lg w-full flex items-center justify-between border-t-2 border-t-cyber-cyan hover:border-cyber-pink group transition-all"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-cyber-cyan animate-bounce" />
                <div className="text-left">
                  <span className="block text-xs font-mono text-gray-400">RESUME CORE FILE</span>
                  <span className="text-sm font-bold text-white group-hover:text-cyber-pink transition-colors">Virag_Nandgaonkar.pdf</span>
                </div>
              </div>
              <span className="bg-cyber-dark border border-cyber-purple/20 text-cyber-cyan px-3 py-1.5 rounded text-xs font-mono group-hover:bg-cyber-pink group-hover:text-white transition-all">
                FETCH
              </span>
            </a>
          </div>

          {/* Contact Input Form (Right) */}
          <div className="md:col-span-7">
            <div className="cyber-glass p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-cyber-cyan" />
              
              <h3 className="text-xl font-bold font-heading text-white mb-6 text-left">Transmission Payload</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="relative text-left">
                  <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Operator Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-cyber-bg border border-cyber-purple/20 rounded px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-pink focus:ring-1 focus:ring-cyber-pink transition-all font-mono"
                    placeholder="Enter identity label"
                  />
                  {errors.name && <span className="text-xs text-cyber-pink font-mono mt-1 block">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="relative text-left">
                  <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Communication Channel (Email)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-cyber-bg border border-cyber-purple/20 rounded px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-pink focus:ring-1 focus:ring-cyber-pink transition-all font-mono"
                    placeholder="name@domain.com"
                  />
                  {errors.email && <span className="text-xs text-cyber-pink font-mono mt-1 block">{errors.email}</span>}
                </div>

                {/* Message */}
                <div className="relative text-left">
                  <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Data Packet Payload (Message)</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-cyber-bg border border-cyber-purple/20 rounded px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-pink focus:ring-1 focus:ring-cyber-pink transition-all font-mono"
                    placeholder="Enter packet details to transmit..."
                  />
                  {errors.message && <span className="text-xs text-cyber-pink font-mono mt-1 block">{errors.message}</span>}
                </div>

                 {errors.form && <span className="text-xs text-cyber-pink font-mono mt-1 mb-2 block">{errors.form}</span>}

                 {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink hover:scale-[1.01] transition-all text-black hover:text-white font-bold py-3.5 px-6 rounded shadow-neon-cyan flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span className="text-white">TRANSMISSION SUCCESSFUL</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT PACKET</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

    {/* Thank You Animated Modal Overlay */}
    <AnimatePresence>
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          {/* Confetti container inside viewport */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }).map((_, idx) => {
              const angle = (idx / 25) * 2 * Math.PI;
              const distance = 120 + Math.random() * 120;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              const colors = ['#00f0ff', '#ff007f', '#39ff14', '#8b5cf6'];
              const color = colors[idx % colors.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ x: '50vw', y: '45vh', scale: 0, opacity: 1 }}
                  animate={{ x: `calc(50vw + ${tx}px)`, y: `calc(45vh + ${ty}px)`, scale: [0, 1.5, 1, 0], opacity: [1, 1, 0] }}
                  transition={{ duration: 2.2, ease: "easeOut", delay: 0.05 }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </div>

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="w-full max-w-md bg-cyber-dark border border-cyber-lime/45 p-8 rounded-lg shadow-neon-lime text-center relative overflow-hidden space-y-6"
          >
            {/* Glowing Success Ring */}
            <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-cyber-lime/10 border-2 border-cyber-lime flex items-center justify-center text-cyber-lime shadow-neon-lime">
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
              >
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </motion.div>
            </div>

            {/* Header */}
            <div className="relative z-10 space-y-2">
              <h4 className="text-2xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-lime to-cyber-cyan text-glow-lime">
                DATA TRANSMITTED!
              </h4>
              <p className="text-xs font-mono text-cyber-purple uppercase tracking-widest">
                Secure SMTP Tunnel Active
              </p>
            </div>

            {/* Message */}
            <p className="relative z-10 text-sm sm:text-base text-gray-300 font-body leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white font-semibold">{submittedName || 'Operator'}</strong>! Your message has bypassed local firewalls and successfully reached my personal email box.
            </p>

            <div className="relative z-10 bg-cyber-lime/5 border border-cyber-lime/20 p-4 rounded font-mono text-xs text-cyber-lime max-w-xs mx-auto leading-relaxed">
              📧 A confirmation receipt has been dispatched to your email address!
            </div>

            {/* Close CTA */}
            <button
              onClick={() => setIsSuccess(false)}
              className="relative z-10 w-full bg-cyber-lime hover:bg-cyber-cyan text-black hover:scale-[1.02] transition-all font-bold py-3 rounded text-sm shadow-neon-lime font-mono cursor-pointer"
            >
              DISMISS SYSTEM POPUP
              </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </section>
  );
}
