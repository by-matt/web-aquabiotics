import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-navy pt-16 pb-8 border-t border-ocean/30 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block mb-6">
                            <img src={logo} alt="Aquabiotics Sur" className="h-24 w-auto opacity-90" />
                        </Link>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Links: Technology */}
                    <div>
                        <h4 className="text-white font-bold mb-5 tracking-wider uppercase text-sm">{t('footer.technology')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/technology" state={{ tab: 'biorefinery', section: 'biorefinery-top' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.biorefinery')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/technology" state={{ tab: 'quality' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.quality')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/technology" state={{ tab: 'innovation', section: 'innovation-section' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.innovation')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Company */}
                    <div>
                        <h4 className="text-white font-bold mb-5 tracking-wider uppercase text-sm">{t('footer.company')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.about')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/sustainability" className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.sustainability')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Market */}
                    <div>
                        <h4 className="text-white font-bold mb-5 tracking-wider uppercase text-sm">{t('footer.market')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/market" state={{ section: 'natural-vs' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.natural_vs')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/market" state={{ section: 'value-prop' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.value')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/market" state={{ section: 'industries' }} className="text-gray-400 hover:text-aqua transition-colors flex items-center group text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ocean mr-2 group-hover:bg-aqua transition-colors" />
                                    {t('footer.links.industries')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-ocean/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-ocean text-xs md:text-sm">
                        {t('footer.copyright')}
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-ocean hover:text-aqua text-xs md:text-sm transition-colors">{t('footer.privacy')}</Link>
                        <a href="https://cl.linkedin.com/company/aquabiotics-sur" target="_blank" rel="noopener noreferrer" className="text-ocean hover:text-aqua transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
