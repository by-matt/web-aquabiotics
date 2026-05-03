import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/AnimatedSection';

// Fix leaflet icon issue in React
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Sustainability() {
    const { t } = useTranslation();

    const impactCards = t('sustainability_page.impact_cards', { returnObjects: true });
    const sdgGroups = t('sustainability_page.sdg_groups', { returnObjects: true });

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
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                            {t('nav.sustainability')}
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                            {t('sustainability_page.hero_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </header>

            <section className="py-20 px-6 bg-sand/20 relative z-20 min-h-screen overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                    <div className="absolute top-20 right-20 w-80 h-80 bg-aqua/5 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="max-w-7xl mx-auto relative">
                    {/* Circular Economy Title */}
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold mb-6 text-navy">
                                {t('sustainability_page.circular_economy')}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                {t('sustainability_page.circular_model_desc')}
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* Detailed Impact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {impactCards && impactCards.map((card, i) => (
                            <AnimatedSection key={i} direction="up" delay={i * 0.15}>
                                <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.color === 'emerald' ? 'from-emerald-400 to-teal' : 'from-ocean to-aqua'}`} />
                                    <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center mt-2">
                                        {card.color === 'emerald' ? (
                                            <svg className="w-8 h-8 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        )}
                                        {card.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {card.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className={`mr-3 mt-1.5 w-2 h-2 rounded-full shrink-0 ${card.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                                <span className="text-gray-600 leading-relaxed">
                                                    <strong className="text-gray-900">{item.label}</strong> {item.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* SDG Interactive Grid */}
                    <div className="mb-24">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold mb-12 text-center text-navy relative inline-block left-1/2 -translate-x-1/2 pb-4">
                                {t('sustainability_page.sdg_title')}
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-aqua to-teal rounded-full" />
                            </h2>
                        </AnimatedSection>

                        {sdgGroups && sdgGroups.map((group, groupIdx) => (
                            <div key={groupIdx} className="mb-16">
                                <AnimatedSection>
                                    <h3 className={`text-xl font-bold mb-8 pl-4 border-l-4 ${group.color === 'emerald' ? 'text-emerald-700 border-emerald-500' : group.color === 'sky' ? 'text-sky-700 border-sky-500' : 'text-purple-700 border-purple-500'}`}>
                                        {group.title}
                                    </h3>
                                </AnimatedSection>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                    {group.items.map((sdg, i) => (
                                        <AnimatedSection key={i} direction="up" delay={i * 0.05}>
                                            <div className="relative group perspective-1000 h-[220px]">
                                                {/* Front */}
                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 flex flex-col items-center text-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 z-20">
                                                    <div
                                                        className="w-12 h-12 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4 shadow-md"
                                                        style={{ backgroundColor: sdg.color }}
                                                    >
                                                        {sdg.id}
                                                    </div>
                                                    <h4 className="font-bold text-sm text-gray-800 mb-2 px-1 leading-tight">{sdg.title}</h4>
                                                    <p className="text-[11px] leading-tight text-gray-500 font-medium">{sdg.subtitle}</p>
                                                </div>
                                                {/* Back / Overlay (Hover) */}
                                                <div
                                                    className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center text-center text-white opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-10 shadow-xl overflow-hidden"
                                                    style={{ backgroundColor: sdg.color }}
                                                >
                                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                                        <span className="text-6xl font-black">{sdg.id}</span>
                                                    </div>
                                                    <h5 className="font-bold text-sm mb-3 border-b border-white/30 pb-2 w-full relative z-10">
                                                        {sdg.overlay_title}
                                                    </h5>
                                                    <div className="space-y-2 relative z-10 overflow-y-auto max-h-[140px] px-1 custom-scrollbar">
                                                        {sdg.targets.map((target, tIdx) => (
                                                            <p key={tIdx} className="text-[10px] leading-snug font-medium text-white/95">{target}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Territorial Impact Map */}
                    <div className="mb-12">
                        <div className="text-center mb-12">
                            <AnimatedSection>
                                <h2 className="text-3xl font-bold text-navy mb-4">{t('sustainability_page.territorial_impact')}</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto font-light">{t('sustainability_page.territory_desc')}</p>
                            </AnimatedSection>
                        </div>

                        <AnimatedSection direction="up" delay={0.2} className="h-[500px] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-white/50 z-0 relative">
                            <MapContainer center={[-41.4693, -72.9424]} zoom={6} scrollWheelZoom={false} className="h-full w-full absolute inset-0">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[-41.4693, -72.9424]}>
                                    <Popup>
                                        <div className="font-bold text-navy p-2">
                                            <div className="text-aqua mb-1 text-xs uppercase tracking-wider">Operational Hub</div>
                                            <div className="text-lg">Aquabiotics Sur</div>
                                            <div className="text-sm font-normal text-gray-500 mt-1">Puerto Montt, Los Lagos Region, Chile</div>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </AnimatedSection>
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
}
