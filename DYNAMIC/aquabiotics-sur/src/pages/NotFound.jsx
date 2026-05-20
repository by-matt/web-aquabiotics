import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
    const { t, i18n } = useTranslation();

    const isEn = i18n.language === 'en';

    return (
        <div className="min-h-screen bg-navy relative flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aqua/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 max-w-md w-full relative z-10"
            >
                <h1 className="text-8xl font-black text-aqua mb-4">404</h1>
                <h2 className="text-2xl font-bold text-navy mb-4">
                    {isEn ? "Page Not Found" : "Página no encontrada"}
                </h2>
                <p className="text-gray-500 mb-10 leading-relaxed">
                    {isEn
                        ? "The page you are looking for doesn't exist or has been moved."
                        : "La página que buscas no existe o ha sido movida."}
                </p>

                <NavLink
                    to="/"
                    className="inline-block bg-gradient-to-r from-ocean to-aqua text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-aqua/20 hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    {isEn ? "Go Back Home" : "Volver al Inicio"}
                </NavLink>

                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center gap-4 text-sm font-medium text-gray-400">
                    <button onClick={() => i18n.changeLanguage('en')} className={isEn ? 'text-aqua' : ''}>EN</button>
                    <span>|</span>
                    <button onClick={() => i18n.changeLanguage('es')} className={!isEn ? 'text-aqua' : ''}>ES</button>
                </div>
            </motion.div>
        </div>
    );
}
