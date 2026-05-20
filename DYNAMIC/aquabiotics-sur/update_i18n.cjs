const fs = require('fs');
const path = require('path');

const baseEn = require('./src/locales/en/translation.json');
const baseEs = require('./src/locales/es/translation.json');

const newEn = {
    ...baseEn,
    about_page: {
        who_we_are: "Who We Are",
        our_journey: "Our Journey",
        timeline: [
            { year: "2023", title: "Project Inception", desc: "R&D begins on selective separation of mussel effluents." },
            { year: "2024", title: "Lab Validation", desc: "Successful recovery of high-purity natural taurine at lab scale." },
            { year: "2025", title: "Pilot Plant", desc: "Scaling up the biorefinery process to process 1,000L/day." },
            { year: "2026", title: "Commercialization", desc: "First B2B partnerships and market entry." }
        ],
        values: [
            { title: "Circular by Design", desc: "We design out waste and keep materials in use." },
            { title: "Scientific Rigor", desc: "Evidence-based biotechnology ensures highest quality." },
            { title: "Territorial Value", desc: "Empowering local communities in Southern Chile." }
        ]
    },
    sustainability_page: {
        impact_metrics: "Impact Metrics",
        circular_economy: "The Blue Circular Economy",
        mussel_farm: "Mussel Farm",
        cooking_broth: "Cooking Broth",
        effluent: "(Effluent)",
        biorefinery: "Biorefinery",
        to_market: "Natural Taurine to Market",
        territorial_impact: "Territorial Impact",
        territory_desc: "Operating in the Los Lagos Region of Chile, the epicenter of the global mussel industry.",
        metrics: [
            { label: 'Effluent Valorized' },
            { label: 'Water Recovery' },
            { label: 'Carbon Footprint Reduction' }
        ]
    },
    contact_page: {
        hero_title: "Get in Touch",
        hero_sub: "Let's collaborate for a more sustainable future.",
        contact_info: "Contact Information",
        contact_desc: "Whether you are a potential partner, investor, or customer, we'd love to hear from you. Reach out to discuss collaboration opportunities.",
        email_us: "Email Us",
        location: "Location",
        location_desc: "Los Lagos Region, Southern Chile",
        linkedin: "LinkedIn",
        follow: "Follow Aquabiotics Sur",
        form: {
            name: "Name",
            name_ph: "Your name",
            email: "Email",
            email_ph: "your@email.com",
            message: "Message",
            message_ph: "How can we help you?",
            send: "Send Message",
            sending: "Sending...",
            success: "✅ Message sent successfully! We'll get back to you soon.",
            error: "❌ Something went wrong. Please try again or email us."
        }
    },
    market_page: {
        comp_title: "Attribute",
        synth_col: "Synthetic Taurine",
        nat_col: "Natural Taurine (Aquabiotics)",
        rows: [
            { attr: "Source", synth: "Petrochemical derivates", nat: "Marine biomass (upcycled)" },
            { attr: "Environmental Impact", synth: "High carbon footprint", nat: "Carbon negative / Circular" },
            { attr: "Consumer Perception", synth: "Artificial additive", nat: "Clean label, natural origin" },
            { attr: "Traceability", synth: "Low to none", nat: "Full origin traceability" }
        ],
        proj_title: "Market Projection (Illustrative)",
        proj_desc: "The global functional food market is increasingly demanding natural and clean-label ingredients. As synthetic additives fall out of favor, natural alternatives like marine-derived taurine are projected to capture substantial market share.",
        proj_trend_nat: "Natural Taurine Growth Trend",
        proj_trend_synth: "Synthetic Taurine Market Share",
        target_industries: "Target Industries",
        industries: [
            { name: 'Functional Beverages', desc: 'Premium natural ingredient integration for advanced functional formulations.' },
            { name: 'Sports Nutrition', desc: 'Premium natural ingredient integration for advanced functional formulations.' },
            { name: 'Pet Food & Aquaculture', desc: 'Premium natural ingredient integration for advanced functional formulations.' }
        ]
    },
    technology_page: {
        biorefinery: "Biorefinery Process",
        steps: [
            { title: 'Mussel Industry', desc: 'Raw material sourcing from local producers.' },
            { title: 'Cooking Broth', desc: 'Collection of organic effluent rich in metabolites.' },
            { title: 'Selective Separation', desc: 'Advanced filtration and concentration.' },
            { title: 'Taurine Purification', desc: 'Extraction of high-purity natural taurine.' },
            { title: 'Market', desc: 'Integration into functional foods and neutraceuticals.' }
        ],
        quality_desc: "Our process ensures the highest standards of purity and traceability, aligned with international food safety regulations. By maintaining an end-to-end controlled biorefinery line, we guarantee a premium ingredient for the most demanding functional food and nutraceutical applications.",
        innov_desc: "We continuously optimize our selective separation methods, combining biotechnology with advanced process engineering. This allows us to scale up efficiently while maximizing the recovery rates of endogenous marine metabolites that would otherwise be lost."
    },
    updates_new: {
        u1_title: "Biorefinery Prototype Integration: Scale-up Phase",
        u1_cat: "Circular Economy",
        u1_date: "14 Feb, 2026",
        u1_exc: "We have successfully integrated our proprietary selective separation technology into the main processing line.",
        u2_title: "Territorial Impact: Partnering with Local Producers",
        u2_cat: "Sustainability",
        u2_date: "10 Feb, 2026",
        u2_exc: "Deepening our commitment to the territorial impact in Southern Chile through new operational partnerships.",
        u3_title: "Blue Circular Economy: 0% Waste, 100% Value",
        u3_cat: "Innovation",
        u3_date: "05 Feb, 2026",
        u3_exc: "Explaining our core philosophy: why natural taurine from cooking broth is the key to a sustainable market."
    }
};

const newEs = {
    ...baseEs,
    about_page: {
        who_we_are: "Quiénes Somos",
        our_journey: "Nuestra Trayectoria",
        timeline: [
            { year: "2023", title: "Inicio del Proyecto", desc: "Comienza la I+D sobre la separación selectiva de efluentes de mejillón." },
            { year: "2024", title: "Validación en Lab", desc: "Recuperación exitosa de taurina natural de alta pureza a escala de laboratorio." },
            { year: "2025", title: "Planta Piloto", desc: "Escalado del proceso de biorrefinería para procesar 1.000L/día." },
            { year: "2026", title: "Comercialización", desc: "Primeras alianzas B2B y entrada al mercado." }
        ],
        values: [
            { title: "Circularidad desde el Diseño", desc: "Eliminamos los residuos y mantenemos los materiales en uso." },
            { title: "Rigor Científico", desc: "Biotecnología basada en evidencia que asegura la máxima calidad." },
            { title: "Valor Territorial", desc: "Empoderando a las comunidades locales en el sur de Chile." }
        ]
    },
    sustainability_page: {
        impact_metrics: "Métricas de Impacto",
        circular_economy: "La Economía Circular Azul",
        mussel_farm: "Cultivo Mejillón",
        cooking_broth: "Caldo de Cocción",
        effluent: "(Efluente)",
        biorefinery: "Biorrefinería",
        to_market: "Taurina Natural al Mercado",
        territorial_impact: "Impacto Territorial",
        territory_desc: "Operando en la Región de Los Lagos, Chile, el epicentro de la industria mundial del mejillón.",
        metrics: [
            { label: 'Efluente Valorizado' },
            { label: 'Recuperación de Agua' },
            { label: 'Reducción de Huella de Carbono' }
        ]
    },
    contact_page: {
        hero_title: "Ponte en Contacto",
        hero_sub: "Colaboremos por un futuro más sostenible.",
        contact_info: "Información de Contacto",
        contact_desc: "Ya sea un socio potencial, inversor o cliente, nos encantaría escucharlo. Contáctenos para conversar sobre posibles colaboraciones.",
        email_us: "Escríbenos",
        location: "Ubicación",
        location_desc: "Región de Los Lagos, Sur de Chile",
        linkedin: "LinkedIn",
        follow: "Sigue a Aquabiotics Sur",
        form: {
            name: "Nombre",
            name_ph: "Tu nombre",
            email: "Correo Electrónico",
            email_ph: "tu@email.com",
            message: "Mensaje",
            message_ph: "¿Cómo podemos ayudarte?",
            send: "Enviar Mensaje",
            sending: "Enviando...",
            success: "✅ ¡Mensaje enviado con éxito! Nos comunicaremos pronto.",
            error: "❌ Algo salió mal. Por favor, intenta de nuevo o escríbenos directamente."
        }
    },
    market_page: {
        comp_title: "Atributo",
        synth_col: "Taurina Sintética",
        nat_col: "Taurina Natural (Aquabiotics)",
        rows: [
            { attr: "Fuente", synth: "Derivados petroquímicos", nat: "Biomasa marina (upcycled)" },
            { attr: "Impacto Ambiental", synth: "Alta huella de carbono", nat: "Carbono negativo / Circular" },
            { attr: "Percepción del Consumidor", synth: "Aditivo artificial", nat: "Etiqueta limpia, origen natural" },
            { attr: "Trazabilidad", synth: "Baja a nula", nat: "Trazabilidad total de origen" }
        ],
        proj_title: "Proyección del Mercado (Ilustrativa)",
        proj_desc: "El mercado mundial de alimentos funcionales demanda cada vez más ingredientes naturales y de etiqueta limpia. A medida que los aditivos sintéticos pierden popularidad, se prevé que las alternativas naturales, como la taurina de origen marino, capturen una porción sustancial del mercado.",
        proj_trend_nat: "Tendencia de Crecimiento de Taurina Natural",
        proj_trend_synth: "Cuota de Mercado de Taurina Sintética",
        target_industries: "Industrias Objetivo",
        industries: [
            { name: 'Bebidas Funcionales', desc: 'Integración de ingredientes naturales puros para formulaciones avanzadas.' },
            { name: 'Nutrición Deportiva', desc: 'Integración de ingredientes naturales puros para formulaciones avanzadas.' },
            { name: 'Alimentos para Mascotas', desc: 'Integración de ingredientes naturales puros para formulaciones avanzadas.' }
        ]
    },
    technology_page: {
        biorefinery: "Proceso de Biorrefinería",
        steps: [
            { title: 'Industria del Mejillón', desc: 'Abastecimiento de materia prima de productores locales.' },
            { title: 'Caldo de Cocción', desc: 'Recolección de efluente orgánico rico en metabolitos.' },
            { title: 'Separación Selectiva', desc: 'Filtración y concentración avanzada.' },
            { title: 'Purificación de Taurina', desc: 'Extracción de taurina natural de alta pureza.' },
            { title: 'Mercado', desc: 'Integración en alimentos funcionales y nutracéuticos.' }
        ],
        quality_desc: "Nuestro proceso asegura los más altos estándares de pureza y trazabilidad, alineados con las normativas internacionales de seguridad alimentaria. Al mantener una línea de biorrefinería controlada de principio a fin, garantizamos un ingrediente de primera calidad para las aplicaciones más exigentes.",
        innov_desc: "Optimizamos continuamente nuestros métodos de separación selectiva, combinando la biotecnología con la ingeniería de procesos avanzada. Esto nos permite escalar eficientemente mientras maximizamos las tasas de recuperación de los metabolitos marinos."
    },
    updates_new: {
        u1_title: "Integración de Prototipo de Biorrefinería: Fase de Escalamiento",
        u1_cat: "Economía Circular",
        u1_date: "14 de Febrero, 2026",
        u1_exc: "Hemos integrado con éxito nuestra tecnología propia de separación selectiva en la línea principal de proceso, mejorando las tasas de recuperación.",
        u2_title: "Impacto Territorial: Alianza con Productores Locales de Mejillón",
        u2_cat: "Sustentabilidad",
        u2_date: "10 de Febrero, 2026",
        u2_exc: "Profundizando nuestro compromiso con el impacto territorial en el sur de Chile a través de nuevas asociaciones operativas.",
        u3_title: "Economía Circular Azul: 0% Residuo, 100% Valor",
        u3_cat: "Innovación",
        u3_date: "05 de Febrero, 2026",
        u3_exc: "Explicando nuestra filosofía central: por qué la taurina natural a partir del caldo de cocción es la clave."
    }
};

fs.writeFileSync('./src/locales/en/translation.json', JSON.stringify(newEn, null, 4));
fs.writeFileSync('./src/locales/es/translation.json', JSON.stringify(newEs, null, 4));

// Rewrite updates.json
const updates = [
    {
        "id": 1,
        "date": "14 Feb, 2026",
        "dateEs": "14 de Febrero, 2026",
        "category": "Circular Economy",
        "categoryEs": "Economía Circular",
        "title": "Biorefinery Prototype Integration: Scale-up Phase",
        "titleEs": "Integración de Prototipo de Biorrefinería: Fase de Escalamiento",
        "excerpt": "We have successfully integrated our proprietary selective separation technology into the main processing line.",
        "excerptEs": "Hemos integrado con éxito nuestra tecnología propia de separación selectiva en la línea principal de proceso.",
        "url": "https://cl.linkedin.com/company/aquabiotics-sur"
    },
    {
        "id": 2,
        "date": "10 Feb, 2026",
        "dateEs": "10 de Febrero, 2026",
        "category": "Sustainability",
        "categoryEs": "Sustentabilidad",
        "title": "Territorial Impact: Partnering with Local Producers",
        "titleEs": "Impacto Territorial: Alianza con Productores Locales de Mejillón",
        "excerpt": "Deepening our commitment to the territorial impact in Southern Chile through new operational partnerships.",
        "excerptEs": "Profundizando nuestro compromiso con el impacto territorial en el sur de Chile a través de nuevas asociaciones operativas.",
        "url": "https://cl.linkedin.com/company/aquabiotics-sur"
    },
    {
        "id": 3,
        "date": "05 Feb, 2026",
        "dateEs": "05 de Febrero, 2026",
        "category": "Innovation",
        "categoryEs": "Innovación",
        "title": "Blue Circular Economy: 0% Waste, 100% Value",
        "titleEs": "Economía Circular Azul: 0% Residuo, 100% Valor",
        "excerpt": "Explaining our core philosophy: why natural taurine from cooking broth is the key to a sustainable market.",
        "excerptEs": "Explicando nuestra filosofía central: por qué la taurina natural a partir del caldo de cocción es la clave.",
        "url": "https://cl.linkedin.com/company/aquabiotics-sur"
    }
];
fs.writeFileSync('./src/data/updates.json', JSON.stringify(updates, null, 2));
