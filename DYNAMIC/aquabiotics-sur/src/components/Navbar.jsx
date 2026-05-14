import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Glassmorphism background
            if (currentScrollY > 60) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Hide/Show navbar on scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.technology'), path: '/technology' },
        { name: t('nav.market'), path: '/market' },
        { name: t('nav.sustainability'), path: '/sustainability' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.contact'), path: '/contact' }
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'
                    } ${isScrolled
                        ? 'bg-navy/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-white/5 py-3'
                        : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo */}
                        <NavLink to="/" className="flex items-center flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                            <img src={logo} alt="Aquabiotics Sur" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
                            <div className="ml-3 hidden sm:flex flex-col justify-center">
                                <span className="font-bold tracking-tight text-white mb-0.5 text-[22px]">
                                    Aquabiotics Sur
                                </span>
                                <span className="text-sm text-gray-300">
                                    {t('nav.tagline')}
                                </span>
                            </div>
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `font-mono text-[10px] uppercase tracking-[0.12em] transition-colors relative pb-1 ${isActive ? 'text-cream font-bold' : 'text-muted hover:text-cream'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.name}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}

                            {/* Language Toggle */}
                            <div className="flex items-center space-x-2 border-l pl-6 ml-2 border-white/20">
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                    className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${i18n.language === 'en' ? 'text-teal font-bold' : 'text-muted hover:text-cream'}`}
                                >
                                    EN
                                </button>
                                <span className="text-gray-500/50">|</span>
                                <button
                                    onClick={() => i18n.changeLanguage('es')}
                                    className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${i18n.language === 'es' ? 'text-teal font-bold' : 'text-muted hover:text-cream'}`}
                                >
                                    ES
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white hover:text-aqua focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-6 px-6"
                    >
                        <div className="flex flex-col space-y-6 text-center text-lg">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `font-medium transition-colors ${isActive ? 'text-aqua' : 'text-gray-300 hover:text-white'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center space-x-8">
                                <button
                                    onClick={() => {
                                        i18n.changeLanguage('en');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-base font-bold transition-colors ${i18n.language === 'en' ? 'text-aqua' : 'text-gray-400'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => {
                                        i18n.changeLanguage('es');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-base font-bold transition-colors ${i18n.language === 'es' ? 'text-aqua' : 'text-gray-400'}`}
                                >
                                    Español
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
