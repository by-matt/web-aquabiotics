import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

export default function UpdateCard({ date, category, title, excerpt, url }) {
    const { t } = useTranslation();

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Circular Economy':
            case 'Economía Circular':
                return 'bg-teal/10 text-teal';
            case 'Sustainability':
            case 'Sostenibilidad':
                return 'bg-emerald/10 text-emerald';
            case 'Innovation':
            case 'Innovación':
                return 'bg-ocean/10 text-ocean';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block group h-full">
            <motion.div
                className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 border border-white/50 h-full flex flex-col relative overflow-hidden"
                whileHover={{ y: -8 }}
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-teal transition-colors duration-300" />

                <div className="flex items-start justify-between mb-4">
                    <img src={logo} alt="Aquabiotics Sur" className="w-8 h-8 object-contain opacity-80" />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(category)}`}>
                        {category}
                    </span>
                </div>

                <div className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">{date}</div>

                <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-ocean transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {excerpt}
                </p>

                <div className="text-aqua font-semibold text-sm flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                    {t('updates.view_post')}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </motion.div>
        </a>
    );
}
