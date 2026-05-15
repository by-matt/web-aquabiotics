import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import WaveBackground from '../components/WaveBackground';
import AnimatedSection from '../components/AnimatedSection';
import StatCounter from '../components/StatCounter';
import UpdateCard from '../components/UpdateCard';
import updatesData from '../data/updates.json';

export default function Home() {
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        // Redirect root traffic to the new premium landing
        if (window.location.pathname === '/') {
            window.location.href = '/landing_exp/';
        }
    }, []);

    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center pt-20 overflow-hidden">
                <WaveBackground />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-[100px] font-light tracking-tight mb-6 leading-[1.0] text-cream drop-shadow-lg">
                            {t('hero.title')}
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl text-muted-strong font-light italic mb-10 max-w-2xl border-l-4 border-teal pl-6"
                        >
                            {t('hero.hero_subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link to="/technology" className="relative group overflow-hidden bg-coral hover:bg-coral-light backdrop-blur-md text-white font-sans font-medium tracking-wider text-sm uppercase py-4 px-8 rounded-full shadow-[0_0_20px_rgba(217,113,90,0.3)] hover:shadow-[0_0_30px_rgba(217,113,90,0.5)] transition-all duration-300 transform hover:-translate-y-1 text-center">
                                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-in-out" />
                                <span className="relative z-10 drop-shadow-md">{t('hero.cta_primary')}</span>
                            </Link>
                            <Link to="/contact" className="border border-white/30 hover:border-white text-white hover:bg-white/5 backdrop-blur-sm font-sans font-medium tracking-wider text-sm uppercase py-4 px-8 rounded-full transition-all duration-300 text-center">
                                {t('hero.cta_secondary')}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce-slow"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="bg-sand relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCounter value={t('stats.natural')} label={t('stats.natural_label')} />
                        <StatCounter value={t('stats.waste')} label={t('stats.waste_label')} />
                        <StatCounter value={t('stats.esg')} label={t('stats.esg_label')} />
                    </div>
                </div>
            </section>

            {/* About snippet */}
            <section className="py-24 bg-seafoam relative overflow-hidden">
                <div className="absolute -left-32 -top-32 w-96 h-96 bg-aqua/10 rounded-full blur-3xl" />
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-lg md:text-xl text-navy leading-relaxed font-medium relative z-10">
                    <AnimatedSection direction="up">
                        <p>{t('about_blurb')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Challenge / Solution */}
            <section className="py-24 bg-sand/20 relative overflow-hidden text-navy">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-aqua/5 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <AnimatedSection direction="left" className="bg-white/60 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-4">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                {t('challenge.title')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {t('challenge.body')}
                            </p>
                        </AnimatedSection>

                        <AnimatedSection direction="right" delay={0.2} className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-ocean to-teal opacity-10 blur-2xl rounded-3xl group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="relative bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-xl shadow-navy/5 border border-white/50 hover:-translate-y-1 transition-transform duration-500">
                                <h2 className="text-3xl font-bold mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-emerald/20 text-emerald flex items-center justify-center mr-4">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    {t('solution.title')}
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                                    {t('solution.intro')}
                                </p>

                                <h3 className="font-bold mb-4">{t('solution.process_title')}</h3>
                                <ul className="space-y-4 mb-6">
                                    {(t('solution.bullets', { returnObjects: true }) || []).map((bullet, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="flex items-start"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (idx * 0.1) }}
                                        >
                                            <svg className="w-5 h-5 text-aqua mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-600">{bullet}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <p className="text-teal font-bold italic border-l-4 border-teal pl-4 py-1">
                                    {t('solution.closing')}
                                </p>
                            </div>
                        </AnimatedSection>

                    </div>
                </div>
            </section>

            {/* Latest Updates */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{t('updates.title')}</h2>
                            <p className="text-gray-600 text-lg">{t('updates.subtitle')}</p>
                        </AnimatedSection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {updatesData.map((update, idx) => (
                            <AnimatedSection key={update.id} direction="up" delay={idx * 0.15}>
                                <UpdateCard
                                    date={i18n.language === 'en' ? update.date : update.dateEs}
                                    category={i18n.language === 'en' ? update.category : update.categoryEs}
                                    title={i18n.language === 'en' ? update.title : update.titleEs}
                                    excerpt={i18n.language === 'en' ? update.excerpt : update.excerptEs}
                                    url={update.url}
                                />
                            </AnimatedSection>
                        ))}
                    </div>

                    <div className="text-center">
                        <AnimatedSection delay={0.4} direction="up">
                            <a
                                href="https://cl.linkedin.com/company/aquabiotics-sur"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-ocean font-bold hover:text-aqua transition-colors py-3 px-6 rounded-full bg-ocean/5 hover:bg-ocean/10 border border-ocean/10"
                            >
                                {t('updates.cta')}
                                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

        </PageWrapper>
    );
}
