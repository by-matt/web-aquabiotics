import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    const sections = t('privacy_page.sections', { returnObjects: true });

    return (
        <PageWrapper>
            {/* Header */}
            <header className="bg-gradient-to-br from-[#0c4a6e] to-[#064e3b] pt-32 pb-20 px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('privacy_page.title')}</h1>
                        <p className="text-seafoam italic opacity-90">{t('privacy_page.last_updated')}</p>
                    </AnimatedSection>
                </div>
            </header>

            {/* Content */}
            <main className="py-20 bg-gray-50 min-h-[60vh]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-12">
                        {sections && Array.isArray(sections) && sections.map((section, i) => (
                            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                                <section className="mb-10">
                                    <h2 className="text-3xl font-bold mb-4 text-navy">
                                        {section.title}
                                    </h2>
                                    <p className="leading-relaxed text-lg text-gray-600">
                                        {section.content}
                                    </p>
                                    {section.bullets && (
                                        <ul className="list-disc pl-6 mt-4 space-y-2 text-lg text-gray-600">
                                            {section.bullets.map((bullet, j) => (
                                                <li key={j}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
}
