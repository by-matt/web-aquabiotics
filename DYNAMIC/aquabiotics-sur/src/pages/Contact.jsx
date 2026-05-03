import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            {/* Hero */}
            <section className="bg-gradient-to-br from-navy via-ocean to-teal pt-32 pb-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aqua/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-5xl lg:text-[80px] font-light mb-6 tracking-tight leading-none text-cream">{t('contact_page.hero_title')}</h1>
                        <p className="text-xl md:text-2xl text-muted-strong font-light italic border-l-2 border-teal pl-4 max-w-2xl mx-auto">
                            {t('contact_page.hero_sub')}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-20 bg-sand/20 min-h-[60vh] relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Contact Information */}
                        <AnimatedSection direction="left" className="py-8">
                            <h2 className="text-4xl md:text-5xl font-light text-navy mb-6 tracking-tight">{t('contact_page.contact_info')}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                {t('contact_page.contact_desc')}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-aqua/10 text-aqua flex items-center justify-center mr-6 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{t('contact_page.email_us')}</h3>
                                        <a href="mailto:info@aqua-biotics.com" className="text-ocean hover:text-aqua transition-colors font-medium">info@aqua-biotics.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mr-6 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{t('contact_page.location')}</h3>
                                        <p className="text-gray-600 font-medium">{t('contact_page.location_desc')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-ocean/10 text-ocean flex items-center justify-center mr-6 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-1">{t('contact_page.linkedin')}</h3>
                                        <a href="https://cl.linkedin.com/company/aquabiotics-sur" target="_blank" rel="noopener noreferrer" className="text-ocean hover:text-aqua transition-colors font-medium">{t('contact_page.follow')}</a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Form */}
                        <AnimatedSection direction="right" delay={0.2}>
                            <ContactForm />
                        </AnimatedSection>

                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
