import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { sendEmail, validateEmailData } from '../utils/email.js';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validation = validateEmailData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      const result = await sendEmail(formData);

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setSubmitMessage(result.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });

      // Clear success message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 8000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Failed to send message. Please try again or contact me directly.');

      // Clear error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/Vortex-16',
      color: 'hover:text-gray-300'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/vikash-gupta-16devlop',
      color: 'hover:text-blue-400'
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      href: 'https://instagram.com/gupta.16.vikash',
      color: 'hover:text-pink-400'
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      href: 'mailto:vikash.kr.gupta.dev@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'Vortex-16@gmail.com',
      href: 'mailto:vikash9c35@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 xxxxx xxxxx',
      href: 'tel:+918276039105'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'India',
      href: null
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
            <motion.h2
              className={`font-lexa text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-emerald-950'
                }`}
              variants={itemVariants}
            >
              Get In{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h2>
            <motion.p
              className={`font-monorama text-base md:text-lg max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-emerald-800'
                }`}
              variants={itemVariants}
            >
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
              Don't hesitate to reach out!
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className={`backdrop-blur-md border rounded-2xl md:rounded-3xl p-5 md:p-8 ${isDark
                ? 'bg-white/10 border-white/20'
                : 'bg-emerald-900/80 border-emerald-700/40'
                }`}>
                <h3 className={`font-monorama text-xl md:text-2xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-emerald-50'
                  }`}>Send me a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ✅ Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ❌ Sorry, there was an error sending your message. Please try again.
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-emerald-200'
                      }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${isDark
                        ? 'bg-white/10 text-white placeholder-white/50'
                        : 'bg-emerald-800/50 text-emerald-50 placeholder-emerald-300'
                        } ${errors.name
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-white/20 focus:ring-emerald-400 dark:focus:ring-purple-400'
                        }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-emerald-200'
                      }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${isDark
                        ? 'bg-white/10 text-white placeholder-white/50'
                        : 'bg-emerald-800/50 text-emerald-50 placeholder-emerald-300'
                        } ${errors.email
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-white/20 focus:ring-emerald-400 dark:focus:ring-purple-400'
                        }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-emerald-200'
                      }`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${isDark
                        ? 'bg-white/10 text-white placeholder-white/50'
                        : 'bg-emerald-800/50 text-emerald-50 placeholder-emerald-300'
                        } ${errors.message
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-white/20 focus:ring-emerald-400 dark:focus:ring-purple-400'
                        }`}
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                      : `bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-purple-500 dark:to-purple-600 
                           hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-purple-600 dark:hover:to-purple-700 
                           text-white hover:shadow-xl transform hover:-translate-y-1`
                      }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-lg" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {/* Contact Info Cards */}
              <div className="space-y-3 md:space-y-4">
                <h3 className={`font-monorama text-xl md:text-2xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-emerald-950'
                  }`}>Contact Information</h3>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className={`backdrop-blur-md border rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-emerald-900/80 border-emerald-700/40'
                      }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    {info.href ? (
                      <a href={info.href} className="flex items-center gap-4 group">
                        <div className="p-3 bg-emerald-500/20 dark:bg-purple-500/20 rounded-xl group-hover:bg-emerald-500/30 dark:group-hover:bg-purple-500/30 transition-colors duration-300">
                          <info.icon className="text-xl text-emerald-400 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-emerald-300'
                            }`}>{info.label}</p>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-emerald-50'
                            }`}>{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 dark:bg-purple-500/20 rounded-xl">
                          <info.icon className="text-xl text-emerald-400 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-emerald-300'
                            }`}>{info.label}</p>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-emerald-50'
                            }`}>{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h4 className={`font-monorama text-lg md:text-xl font-semibold mb-3 md:mb-4 ${isDark ? 'text-white' : 'text-emerald-950'
                  }`}>Follow me on</h4>
                <div className="flex gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 md:p-4 backdrop-blur-md border rounded-lg md:rounded-xl transition-all duration-300 ${isDark
                        ? 'bg-white/10 border-white/20 text-white/70 hover:text-white'
                        : 'bg-emerald-900/80 border-emerald-700/40 text-emerald-200 hover:text-emerald-50'
                        } ${social.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} className="md:w-6 md:h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                className={`backdrop-blur-md border rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark
                  ? 'bg-white/10 border-white/20'
                  : 'bg-emerald-900/80 border-emerald-700/40'
                  }`}
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h4 className={`font-monorama text-base md:text-lg font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Available for opportunities</h4>
                </div>
                <p className={`font-monorama text-xs md:text-sm ${isDark ? 'text-white/70' : 'text-emerald-200'
                  }`}>
                  I'm currently looking for internship opportunities and exciting projects to work on.
                  Feel free to reach out if you think we could collaborate!
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/20 text-center"
            variants={itemVariants}
          >
            <p className="font-monorama text-sm md:text-base text-white/60">
              Made with 💻 by Vikash Gupta • © 2026
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
