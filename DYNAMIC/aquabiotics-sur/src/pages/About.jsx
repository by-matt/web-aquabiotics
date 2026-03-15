import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';

export default function About() {
    const { t } = useTranslation();

    const timeline = t('about_page.timeline', { returnObjects: true });
    const cards = t('about_page.cards', { returnObjects: true });
    const team = t('about_page.team', { returnObjects: true });

    return (
        <PageWrapper>
            {/* Hero */}
            <header className="bg-gradient-to-br from-[#0c4a6e] to-[#064e3b] pt-32 pb-20 px-6 text-center text-white relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                            {t('nav.about')}
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                            {t('about_page.hero_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </header>

            <section className="py-20 bg-white relative z-20 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

                    {/* Our Origins */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <AnimatedSection direction="right">
                            <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Southern Chile Fjord"
                                className="rounded-xl shadow-lg w-full h-auto object-cover transform transition-transform hover:scale-[1.02] duration-500" />
                        </AnimatedSection>
                        <AnimatedSection direction="left" delay={0.2}>
                            <h2 className="text-3xl font-bold mb-6 text-navy">{t('about_page.origins_title')}</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                {t('about_page.origins_p1')}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('about_page.origins_p2')}
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* Mission Vision Location Cards */}
                    {cards && Array.isArray(cards) && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {cards.map((card, i) => {
                                const iconColors = ['text-ocean bg-ocean/10', 'text-teal bg-teal/10', 'text-purple-600 bg-purple-100'];
                                const svgs = [
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                ];
                                return (
                                    <AnimatedSection key={i} direction="up" delay={i * 0.15}>
                                        <div className="p-8 rounded-xl bg-gray-50 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
                                            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${iconColors[i]}`}>
                                                {svgs[i]}
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 text-navy">{card.title}</h3>
                                            <p className="text-gray-600">{card.desc}</p>
                                        </div>
                                    </AnimatedSection>
                                )
                            })}
                        </div>
                    )}

                    {/* Who We Are - Team Section */}
                    {team && Array.isArray(team) && (
                        <div>
                            <div className="text-center mb-12">
                                <AnimatedSection>
                                    <h2 className="text-3xl font-bold text-navy mb-4 inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-aqua after:to-emerald">
                                        {t('about_page.team_title')}
                                    </h2>
                                </AnimatedSection>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {team.map((member, i) => (
                                    <AnimatedSection key={i} direction="up" delay={0.2 + (i * 0.2)}>
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                            <div className="flex flex-col items-center text-center mb-6">
                                                <div className="w-[95px] h-[95px] rounded-full overflow-hidden border-2 border-ocean mb-4 shadow-lg flex items-center justify-center bg-gray-100">
                                                    <img src={`/${member.img}`} alt={member.name} className="w-full h-full object-cover scale-110" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-navy mb-1">{member.name}</h3>
                                                <p className="text-ocean font-medium text-sm leading-relaxed">{member.role}</p>
                                                <p className="text-xs text-gray-400 mt-2 italic">{member.sub_role}</p>
                                            </div>

                                            <div className="text-gray-600 leading-relaxed text-left text-sm space-y-4">
                                                {member.paragraphs && member.paragraphs.map((p, j) => <p key={j}>{p}</p>)}

                                                {member.contributions_title && (
                                                    <p className="mt-6"><strong>{member.contributions_title}</strong></p>
                                                )}
                                                {member.contributions && (
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {member.contributions.map((c, j) => <li key={j}>{c}</li>)}
                                                    </ul>
                                                )}

                                                {member.paragraphs_end && member.paragraphs_end.map((p, j) => <p key={j} className="mt-4">{p}</p>)}
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-ocean hover:text-navy transition-colors flex items-center gap-2 font-medium">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                    LinkedIn
                                                </a>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timeline (Original React addition) */}
                    {timeline && Array.isArray(timeline) && (
                        <div className="pt-12 border-t border-gray-100">
                            <div className="text-center mb-16">
                                <AnimatedSection>
                                    <h2 className="text-3xl font-bold text-navy mb-4">{t('about_page.our_journey')}</h2>
                                </AnimatedSection>
                            </div>

                            <div className="max-w-3xl mx-auto relative pl-6 md:pl-0">
                                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block" />
                                <div className="absolute left-[26px] top-0 bottom-0 w-1 bg-gray-100 md:hidden" />

                                <div className="space-y-12 pb-12">
                                    {timeline.map((item, i) => (
                                        <AnimatedSection key={i} direction={i % 2 === 0 ? "right" : "left"} delay={0.2} className="relative">
                                            <div className={`md:w-1/2 flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'} pl-12 md:pl-0`}>

                                                <div className={`absolute top-4 md:top-1/2 left-[10px] md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-aqua flex items-center justify-center -translate-y-1/2 md:-translate-x-1/2 shadow-md z-10`} />

                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
                                                    <div className="text-aqua font-extrabold text-2xl mb-1">{item.year}</div>
                                                    <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                                                    <p className="text-gray-600">{item.desc}</p>
                                                </div>

                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </PageWrapper>
    );
}
