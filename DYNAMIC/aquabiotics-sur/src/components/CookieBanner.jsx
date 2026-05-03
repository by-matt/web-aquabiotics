import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
    const { i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const consent = localStorage.getItem('aquabiotics_cookie_consent');
        if (!consent) {
            // Show banner after a short delay so it doesn't block immediate viewing
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else if (consent === 'granted') {
            // If previously granted, make sure GA knows
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aquabiotics_cookie_consent', 'granted');
        setIsVisible(false);
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    };

    const handleDecline = () => {
        localStorage.setItem('aquabiotics_cookie_consent', 'denied');
        setIsVisible(false);
        // Default is already denied in index.html, so we just hide the banner.
    };

    const isEn = i18n.language === 'en';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
                >
                    <div className="pointer-events-auto w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-ocean via-aqua to-teal" />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-navy mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                {isEn ? "Your Privacy Matters" : "Tu Privacidad es Importante"}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {isEn 
                                    ? "We use strictly necessary cookies to make our site work. We'd also like to set optional analytics cookies to help us improve it by collecting anonymous usage data. We will not set optional cookies unless you enable them."
                                    : "Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio. También nos gustaría configurar cookies analíticas opcionales para ayudarnos a mejorarlo recopilando datos de uso anónimos. No configuraremos estas cookies a menos que las aceptes."}
                                {' '}
                                <Link to="/privacy" className="text-ocean font-bold hover:underline">
                                    {isEn ? "Read Privacy Policy" : "Leer Política"}
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 min-w-max">
                            <button 
                                onClick={handleDecline}
                                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 transition-all text-sm w-full sm:w-auto"
                            >
                                {isEn ? "Decline Optional" : "Rechazar Opcionales"}
                            </button>
                            <button 
                                onClick={handleAccept}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean to-teal text-white font-bold shadow-lg hover:shadow-xl shadow-teal-500/20 transition-all text-sm w-full sm:w-auto hover:scale-105 active:scale-95"
                            >
                                {isEn ? "Accept All" : "Aceptar Todas"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
