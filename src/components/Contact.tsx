import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Github, Linkedin, Send, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { personalInfo } from '../data/portfolioData';

const Contact: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { isDark } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `);
    
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsChatOpen(false);
  };

  const handleContactClick = (type: string) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${personalInfo.email}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${personalInfo.phone}`, '_blank');
        break;
      case 'github':
        window.open(personalInfo.github, '_blank');
        break;
      case 'linkedin':
        window.open(personalInfo.linkedin, '_blank');
        break;
    }
  };

  return (
    <>
      <section id="contact" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Get In Touch
            </h2>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Let's discuss your next React JS project or collaboration opportunity
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Email */}
              <div
                onClick={() => handleContactClick('email')}
                className={`hoverable group p-6 lg:p-8 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'
                } shadow-lg hover:shadow-2xl transform hover:scale-105`}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Mail className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Email
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base break-all`}>
                  {personalInfo.email}
                </p>
              </div>

              {/* Phone */}
              <div
                onClick={() => handleContactClick('phone')}
                className={`hoverable group p-6 lg:p-8 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'
                } shadow-lg hover:shadow-2xl transform hover:scale-105`}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Phone className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Phone
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  {personalInfo.phone}
                </p>
              </div>

              {/* GitHub */}
              <div
                onClick={() => handleContactClick('github')}
                className={`hoverable group p-6 lg:p-8 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'
                } shadow-lg hover:shadow-2xl transform hover:scale-105`}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Github className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  GitHub
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  View Projects
                </p>
              </div>

              {/* LinkedIn */}
              <div
                onClick={() => handleContactClick('linkedin')}
                className={`hoverable group p-6 lg:p-8 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'
                } shadow-lg hover:shadow-2xl transform hover:scale-105`}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Linkedin className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  LinkedIn
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={`hoverable fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 z-30 ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white hover:scale-110`}
        style={{
          boxShadow: isDark 
            ? '0 0 20px rgba(0, 191, 255, 0.5)' 
            : '0 0 20px rgba(0, 128, 255, 0.5)',
        }}
      >
        <MessageCircle className="w-8 h-8 mx-auto" />
      </button>

      {/* Chat Modal - Slides out from the chat button */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <div 
            className={`w-full max-w-md rounded-xl shadow-2xl pointer-events-auto transform transition-all duration-300 ${
              isDark ? 'bg-slate-800' : 'bg-white'
            } ${isChatOpen ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-full translate-y-full opacity-0'}`}
            style={{
              marginRight: '1rem',
              marginBottom: '5rem', // Position above the chat button
            }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Send a Message
              </h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`hoverable p-2 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              <button
                type="submit"
                className={`hoverable w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2`}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;