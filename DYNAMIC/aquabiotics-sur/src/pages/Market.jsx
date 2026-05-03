import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';

const data = [
    { year: '2014', value: 206.1, volume: 69151 },
    { year: '2015', value: 214.7, volume: 71859 },
    { year: '2016', value: 223.8, volume: 74744 },
    { year: '2017', value: 233.7, volume: 77849 },
    { year: '2018', value: 244.5, volume: 81196 },
    { year: '2019', value: 256.4, volume: 84817 },
    { year: '2020', value: 269.5, volume: 88773 },
    { year: '2021', value: 284.1, volume: 93106 },
    { year: '2022', value: 300.2, volume: 97842 },
    { year: '2023', value: 317.7, volume: 102955 },
    { year: '2024', value: 336.6, volume: 108407 },
    { year: '2025', value: 356.6, volume: 114124 },
    { year: '2026', value: 377.8, volume: 120070 },
    { year: '2027', value: 400.1, volume: 126221 },
    { year: '2028', value: 423.5, volume: 132517 },
    { year: '2029', value: 447.8, volume: 138914 }
];

export default function Market() {
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.section) {
            setTimeout(() => {
                document.getElementById(location.state.section)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    const rows = t('market_page.rows', { returnObjects: true }) || [];
    const industries = t('market_page.industries', { returnObjects: true }) || [];

    const industryColors = [
        { bg: 'bg-purple-100', text: 'text-purple-600' }, // 1: Morado/Púrpura
        { bg: 'bg-blue-100', text: 'text-blue-500' },     // 2: Azulado
        { bg: 'bg-teal-100', text: 'text-teal-500' },     // 3: Turquesa agua
        { bg: 'bg-orange-100', text: 'text-orange-500' }, // 4: Salmon/Naranjo
        { bg: 'bg-gray-200', text: 'text-gray-900' }      // 5: Negro
    ];

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
                            {t('nav.market')}
                        </h1>
                        <p className="text-xl md:text-2xl font-light italic text-muted-strong max-w-2xl mx-auto border-l-2 border-coral pl-4">
                            {t('market_page.hero_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Why Natural Taurine Section */}
            <section id="value-prop" className="py-20 bg-white relative overflow-hidden">
                <div className="absolute -left-32 -top-32 w-96 h-96 bg-aqua/5 rounded-full blur-3xl animate-blob" />
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-light text-navy mb-8 tracking-tight">
                                {t('market_page.why_natural.title')}
                            </h2>
                            <div className="brand-rule coral"></div>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                {t('market_page.why_natural.description')}
                            </p>

                            <div className="bg-ocean/5 border-l-4 border-ocean p-8 rounded-r-xl mb-12">
                                <p className="text-xl text-navy font-medium italic">
                                    {t('market_page.why_natural.highlight')}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-navy">
                                    {t('market_page.why_natural.value_prop.title')}
                                </h3>
                                <div className="space-y-4">
                                    {t('market_page.why_natural.value_prop.items', { returnObjects: true }).map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 text-green-500">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-lg text-gray-700">
                                                <span className="font-bold text-navy">{item.label}</span> {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-sand/20 min-h-[60vh] relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                    {/* Natural vs Synthetic Comparison */}
                    <div id="natural-vs">
                        <div className="text-center mb-12">
                            <AnimatedSection>
                                <h2 className="text-3xl font-bold text-navy mb-4">{t('footer.links.natural_vs')}</h2>
                            </AnimatedSection>
                        </div>

                        <AnimatedSection direction="up" delay={0.2}>
                            <div className="overflow-x-auto rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 bg-white/70 backdrop-blur-xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-6 border-b border-gray-100 font-bold text-navy w-1/3 text-lg">{t('market_page.comp_title')}</th>
                                            <th className="p-6 border-b border-gray-100 font-bold bg-gray-50 text-gray-500 w-1/3 text-center transition-colors hover:bg-gray-100">{t('market_page.synth_col')}</th>
                                            <th className="p-6 border-b border-gray-100 font-bold bg-teal/5 text-teal w-1/3 text-center transition-colors hover:bg-teal/10">{t('market_page.nat_col')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {rows.map && rows.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-6 font-medium text-gray-700">{row.attr}</td>
                                                <td className="p-6 text-gray-500 text-center">{row.synth}</td>
                                                <td className="p-6 text-teal font-semibold text-center">{row.nat}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Market Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <AnimatedSection direction="left">
                            <h2 className="text-3xl font-bold text-navy mb-6">{t('market_page.proj_title')}</h2>
                            <ul className="space-y-3 mb-8">
                                {(t('market_page.proj_bullets', { returnObjects: true }) || []).map((bullet, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700">
                                        <svg className="w-5 h-5 text-teal mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="leading-relaxed font-light">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col space-y-4 mb-10">
                                <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-sm bg-[#0ea5e9] mr-3 shadow-sm"></span>
                                    <span className="text-navy font-medium">{t('market_page.proj_trend_value')}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-5 h-5 rounded-sm bg-[#14b8a6] mr-3 shadow-sm"></span>
                                    <span className="text-gray-500">{t('market_page.proj_trend_volume')}</span>
                                </div>
                            </div>

                            {/* Sources Box */}
                            <div className="bg-gray-100/50 rounded-xl p-6 border border-gray-200">
                                <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                                    {t('market_page.sources_title')}
                                </h4>
                                <div className="space-y-4">
                                    {(t('market_page.sources', { returnObjects: true }) || []).map((source, idx) => (
                                        <div key={idx} className="text-xs">
                                            <p className="font-bold text-navy mb-1">{source.name}</p>
                                            <a
                                                href={source.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-ocean hover:underline block mb-1"
                                            >
                                                {source.report}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        <div className="space-y-4">
                            <AnimatedSection direction="right" delay={0.2} className="h-[400px] w-full bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 13 }} dy={10} />
                                        <YAxis
                                            yAxisId="left"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6B7280', fontSize: 13 }}
                                            dx={-10}
                                            label={{ value: 'USD Millions', angle: -90, position: 'insideLeft', offset: -5, fill: '#6B7280', fontSize: 12 }}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6B7280', fontSize: 13 }}
                                            dx={10}
                                            label={{ value: 'Tons', angle: 90, position: 'insideRight', offset: -5, fill: '#6B7280', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                                        />
                                        <Line yAxisId="left" type="monotone" name={t('market_page.proj_trend_value')} dataKey="value" stroke="#0ea5e9" strokeWidth={5} dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} animationDuration={2500} />
                                        <Line yAxisId="right" type="monotone" name={t('market_page.proj_trend_volume')} dataKey="volume" stroke="#14b8a6" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} animationDuration={2500} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </AnimatedSection>
                            <p className="text-[10px] text-gray-400 text-center italic">
                                * Data extracted from "Estudio de Mercado de Bioproductos Marinos (Taller 1)".
                            </p>
                        </div>
                    </div>

                    {/* Target Industries */}
                    <div id="industries">
                        <div className="text-center mb-12">

                            <AnimatedSection>
                                <h2 className="text-3xl font-bold text-navy mb-4">{t('market_page.target_industries')}</h2>
                            </AnimatedSection>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {industries.map && industries.map((industry, i) => {
                                const colors = industryColors[i % industryColors.length];
                                return (
                                <AnimatedSection key={i} direction="up" delay={i * 0.15}>
                                    <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/50 text-center group hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">
                                        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${i % 4 === 0 ? 'from-purple-500 to-fuchsia-400' : i % 4 === 1 ? 'from-ocean to-blue-400' : i % 4 === 2 ? 'from-teal to-emerald-400' : 'from-orange-500 to-amber-400'}`} />
                                        <motion.div
                                            className={`relative z-10 w-16 h-16 mx-auto ${colors.bg} ${colors.text} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: i }}
                                        >
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {industry.icon === 'pet' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5c-1.33 0-3.14 1.25-3.14 1.25S7 5 5 5c-1.1 0-2 .9-2 2v7c0 4.42 4.03 8 9 8s9-3.58 9-8V7c0-1.1-.9-2-2-2-2 0-3.86 1.25-3.86 1.25S13.33 5 12 5z M9 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0z M17 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0z M12 16c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
                                                )}
                                                {industry.icon === 'fish' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 12c0 2.5-4 5-9 5s-9-2.5-9-5 4-5 9-5 9 2.5 9 5z M5 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z M17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                )}
                                                {industry.icon === 'nutra' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                                                )}
                                                {industry.icon === 'energy' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                )}
                                                {!industry.icon && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                                                )}
                                            </svg>
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-navy mb-3">{industry.name}</h3>
                                        {industry.focus && (
                                            <p className={`font-bold text-sm mb-2 italic ${colors.text}`}>
                                                {industry.focus}
                                            </p>
                                        )}
                                        <p className="text-gray-600 text-sm">
                                            {industry.desc}
                                        </p>
                                    </div>
                                </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
}
