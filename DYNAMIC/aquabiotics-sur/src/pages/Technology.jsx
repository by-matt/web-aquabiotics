import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';

export default function Technology() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('biorefinery');

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
            if (location.state.section) {
                setTimeout(() => {
                    document.getElementById(location.state.section)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const tabs = [
        { id: 'biorefinery', label: t('footer.links.biorefinery') },
        { id: 'quality', label: t('footer.links.quality') },
        { id: 'innovation', label: t('footer.links.innovation') }
    ];

    const stepsData = t('technology_page.steps', { returnObjects: true }) || [];
    const steps = stepsData.map ? stepsData.map((s, i) => ({ id: i + 1, ...s })) : [];

    const stepColors = [
        { border: 'border-purple-600', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', bg: 'bg-purple-600' }, // 1: Morado
        { border: 'border-blue-500', text: 'text-blue-500', hoverBg: 'group-hover:bg-blue-500', bg: 'bg-blue-500' }, // 2: Azulado
        { border: 'border-teal-400', text: 'text-teal-400', hoverBg: 'group-hover:bg-teal-400', bg: 'bg-teal-400' }, // 3: Turquesa agua
        { border: 'border-orange-400', text: 'text-orange-400', hoverBg: 'group-hover:bg-orange-400', bg: 'bg-orange-400' }, // 4: Salmon/Naranjo
        { border: 'border-gray-900', text: 'text-gray-900', hoverBg: 'group-hover:bg-gray-900', bg: 'bg-gray-900' } // 5: Negro
    ];

    const handleStepClick = (stepId) => {
        switch (stepId) {
            case 1:
                document.getElementById('raw-material')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            case 2:
                document.getElementById('biorefinery-top')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 3:
                setActiveTab('innovation');
                setTimeout(() => {
                    document.getElementById('innovation-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 4:
                document.getElementById('main-product')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            case 5:
                navigate('/market');
                break;
            default:
                break;
        }
    };

    return (
        <PageWrapper>
            {/* Hero */}
            <header className="bg-gradient-to-br from-navy via-ocean to-teal pt-32 pb-20 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aqua/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-[80px] font-light mb-6 tracking-tight leading-none text-cream">
                            {t('nav.technology')}
                        </h1>
                        <span className="font-mono text-[10px] tracking-widest text-teal uppercase mb-6 block opacity-80">{t('archetypes.sage')}</span>
                        <p className="text-xl md:text-2xl font-light italic text-muted-strong max-w-2xl mx-auto border-l-2 border-lavender pl-4">
                            {t('technology_page.hero_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <section className="py-20 bg-sand/20 min-h-[60vh] relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-10 right-10 w-64 h-64 bg-aqua/5 rounded-full blur-3xl animate-blob" />
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-teal text-white shadow-lg shadow-teal/30 translate-y-px'
                                    : 'bg-cream/80 backdrop-blur-sm text-navy hover:bg-cream border border-teal/20 shadow-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div id="biorefinery-top" className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 md:p-12 min-h-[400px]">

                        <AnimatePresence mode="wait">
                            {activeTab === 'biorefinery' && (
                                <motion.div
                                    key="biorefinery"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-16">
                                        <h2 className="text-4xl md:text-5xl font-light text-navy tracking-tight mb-6">{t('technology_page.biorefinery')}</h2>
                                        <div className="brand-rule center lavender"></div>
                                    </div>

                                    {/* Raw Material & Main Product Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                        <motion.div
                                            id="raw-material"
                                            initial={{ opacity: 0, x: -20 }}

                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                <span className="w-2 h-8 bg-ocean rounded-full mr-3" />
                                                {t('technology_page.raw_material_title')}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {t('technology_page.raw_material_desc')}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            id="main-product"
                                            initial={{ opacity: 0, x: 20 }}

                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                <span className="w-2 h-8 bg-teal rounded-full mr-3" />
                                                {t('technology_page.main_product_title')}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {t('technology_page.main_product_desc')}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Destop flow */}
                                    <div className="hidden md:flex justify-between items-start relative mt-16 mb-8 px-4">
                                        {/* Connecting line */}
                                        <div className="absolute top-8 left-8 right-8 h-1 bg-gray-100 -z-10">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundImage: 'linear-gradient(to right, #9333ea, #3b82f6, #2dd4bf, #fb923c, #111827)' }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>

                                        {steps.map((step, idx) => {
                                            const colors = stepColors[idx % stepColors.length];
                                            return (
                                                <motion.div
                                                    key={step.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.3 }}
                                                    className="relative flex flex-col items-center w-48 group cursor-pointer"
                                                    onClick={() => handleStepClick(step.id)}
                                                >
                                                    <div className={`w-16 h-16 rounded-full bg-white border-4 ${colors.border} flex items-center justify-center text-xl font-bold ${colors.text} ${colors.hoverBg} group-hover:text-white transition-colors duration-300 shadow-lg`}>
                                                        {step.id}
                                                    </div>
                                                    <h3 className="mt-4 font-bold text-navy text-center text-sm">{step.title}</h3>
                                                    <div className="mt-2 text-xs text-gray-500 text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full pt-2 bg-white shadow-lg rounded-lg border border-gray-100 p-3 w-48 pointer-events-none z-20">
                                                        {step.desc}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Mobile flow */}
                                    <div className="md:hidden space-y-8 mt-8 relative">
                                        <div 
                                            className="absolute left-[26px] top-0 bottom-0 w-1 rounded-full opacity-50" 
                                            style={{ backgroundImage: 'linear-gradient(to bottom, #9333ea, #3b82f6, #2dd4bf, #fb923c, #111827)' }} 
                                        />
                                        {steps.map((step, idx) => {
                                            const colors = stepColors[idx % stepColors.length];
                                            return (
                                                <motion.div
                                                    key={step.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.2 }}
                                                    className="flex items-start relative z-10 cursor-pointer"
                                                    onClick={() => handleStepClick(step.id)}
                                                >
                                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} text-white flex items-center justify-center font-bold text-lg shadow-md mr-4 border-4 border-white`}>
                                                        {step.id}
                                                    </div>
                                                    <div className="pt-2">
                                                        <h3 className="font-bold text-navy text-base">{step.title}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'quality' && (
                                <motion.div
                                    key="quality"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-6xl mx-auto"
                                >
                                    <h2 className="text-2xl font-bold text-navy mb-12 text-center">{t('footer.links.quality')}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {(Array.isArray(t('technology_page.quality_cards', { returnObjects: true })) ? t('technology_page.quality_cards', { returnObjects: true }) : []).map((card, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                                            >
                                                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${idx === 0 ? 'from-blue-500 to-indigo-400' : idx === 1 ? 'from-indigo-500 to-purple-400' : 'from-sky-500 to-cyan-400'}`} />
                                                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${idx === 0 ? 'bg-blue-50 text-blue-600' :
                                                    idx === 1 ? 'bg-indigo-50 text-indigo-600' :
                                                        'bg-sky-50 text-sky-600'
                                                    }`}>
                                                    {idx === 0 && (
                                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    )}
                                                    {idx === 1 && (
                                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                        </svg>
                                                    )}
                                                    {idx === 2 && (
                                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-navy mb-4">{card.title}</h3>
                                                <p className="text-gray-500 leading-relaxed text-sm">
                                                    {card.desc}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-16 pt-16 border-t border-gray-100/60 text-center max-w-2xl mx-auto">
                                        <p className="text-gray-400 text-sm italic leading-relaxed">
                                            {t('technology_page.quality_desc')}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'innovation' && (
                                <motion.div
                                    key="innovation"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-6xl mx-auto space-y-20"
                                >
                                    {/* Next-Gen Marine Tech Section */}
                                    <section id="innovation-section" className="bg-gradient-to-br from-navy to-ocean p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">

                                        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
                                            <div className="lg:col-span-3">
                                                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-aqua">
                                                    {t('technology_page.innovation_nextgen.title')}
                                                </h2>
                                                <p className="text-gray-200 text-lg leading-relaxed mb-10 font-medium">
                                                    {t('technology_page.innovation_nextgen.subtitle')}
                                                </p>

                                                <ul className="space-y-6">
                                                    {(Array.isArray(t('technology_page.innovation_nextgen.items', { returnObjects: true })) ? t('technology_page.innovation_nextgen.items', { returnObjects: true }) : []).map((item, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-start gap-4 group"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-aqua border border-white/20 group-hover:bg-aqua group-hover:text-white transition-colors">
                                                                {String(idx + 1).padStart(2, '0')}
                                                            </div>
                                                            <span className="text-gray-100 font-medium pt-1">{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-4">{t('technology_page.innovation_nextgen.ip_strategy_title')}</h3>
                                                        <p className="text-gray-300 text-sm leading-relaxed mb-12">
                                                            {t('technology_page.innovation_nextgen.ip_strategy_desc')}
                                                        </p>
                                                    </div>
                                                    <a href={i18n?.language?.startsWith('es') ? '/ONE-PAGER_AB_SUR.html' : '/ONE-PAGER_AB_SUR_EN.html'} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-center block">
                                                        {t('technology_page.innovation_nextgen.download_btn')}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Innovation Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
                                        {(Array.isArray(t('technology_page.innovation_cards', { returnObjects: true })) ? t('technology_page.innovation_cards', { returnObjects: true }) : []).map((card, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col hover:-translate-y-1"
                                            >
                                                <h3 className="text-2xl font-extrabold text-navy mb-8 border-b border-gray-100/50 pb-4">
                                                    {card.title}
                                                </h3>

                                                {card.items ? (
                                                    <ul className="space-y-6 flex-grow">
                                                        {card.items.map((item, i) => (
                                                            <li key={i} className="flex flex-col gap-1">
                                                                <span className="font-bold text-navy flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-ocean" />
                                                                    {item.label}:
                                                                </span>
                                                                <span className="text-gray-500 text-sm leading-relaxed pl-3.5 italic border-l-2 border-ocean/10">{item.desc}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="flex-grow">
                                                        <div className="flex items-baseline gap-2 mb-6">
                                                            <span className="font-bold text-navy">{card.trl_label}:</span>
                                                            <span className="text-ocean font-bold">{card.trl_value}</span>
                                                        </div>
                                                        <p className="text-gray-500 leading-relaxed text-sm">
                                                            {card.desc}
                                                        </p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-12 pt-12 border-t border-gray-100/60 text-center max-w-2xl mx-auto">
                                        <p className="text-gray-400 text-sm italic leading-relaxed">
                                            {t('technology_page.innov_desc')}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
