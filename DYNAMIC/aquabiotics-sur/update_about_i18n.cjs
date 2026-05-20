const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'locales', 'en', 'translation.json');
const esPath = path.join(__dirname, 'src', 'locales', 'es', 'translation.json');

const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Update English
enJson.about_page = enJson.about_page || {};
Object.assign(enJson.about_page, {
    origins_title: "Our Origins",
    origins_p1: "Aquabiotics Sur was born in the heart of the Los Lagos Region in southern Chile, a territory known for its pristine fjords and thriving aquaculture industry. We recognized a paradox: while the mussel industry is a major economic driver, it also generates significant volumes of liquid waste that are currently discarded.",
    origins_p2: "We saw this not as waste, but as an untapped reservoir of valuable marine biomolecules. Our team of biologists and engineers came together with a single mission: to lead the Blue Circular Economy through marine biotechnology.",
    cards: [
        {
            title: "Mission",
            desc: "To lead the Blue Circular Economy by sanitizing our coasts, replacing synthetics with sustainable purity, and positioning Patagonia as a global hub for biotech innovation."
        },
        {
            title: "Vision",
            desc: "To be the global leader in upcycled marine metabolites, setting the standard for circular economy and biotech excellence from the heart of Patagonia."
        },
        {
            title: "Location",
            desc: "Strategic operations in Los Lagos Region, Chile—the hub of the Chilean mussel industry."
        }
    ],
    team_title: "Who We Are",
    team: [
        {
            name: "Byron Calderón",
            role: "CEO | Biotechnologist | Sustainable Bioprocess Development | Scientific Strategy",
            sub_role: "Scientific & Strategic Lead",
            img: "byron.png",
            linkedin: "https://www.linkedin.com/in/byron-calder%C3%B3n/",
            paragraphs: [
                "Specialized in sustainable bioprocess design, industrial microbiology, and science-driven innovation. His work is grounded in the integration of molecular biology, biochemical engineering, and circular economy principles to transform environmental challenges into scalable, high-value biological solutions.",
                "With experience in research, industrial biotechnology, and project management, he brings a structured and evidence-based approach to innovation. His professional background spans applied microbiology, bioprocess optimization, water systems, quality standards, and scientific technical writing. He combines analytical rigor with execution capability, ensuring that scientific concepts move beyond laboratory potential into commercially viable systems.",
                "At Aquabiotics Sur, he plays a key role in the scientific and strategic development of the company’s blue circular biorefinery model. His focus centers on the design and validation of organic bio-mining processes that transform industrial side-streams from the Patagonian mussel industry into high-purity, traceable, marine-derived bioactive compounds. His work supports the transition from extractive models to regenerative, value-added marine biotechnology."
            ],
            contributions_title: "Key Contributions:",
            contributions: [
                "Bioprocess design and optimization",
                "Scientific validation and quality frameworks",
                "Sustainability metrics and circularity integration",
                "Technical documentation and regulatory alignment",
                "Innovation roadmap development"
            ],
            paragraphs_end: [
                "His vision aligns with positioning Chilean Patagonia as a global reference in sustainable marine biotech. He is particularly driven by the opportunity to replace petrochemical-derived ingredients with biologically upcycled alternatives that preserve ecosystem integrity while generating economic value.",
                "Beyond operational development, he brings a systems-thinking mindset to the organization. He views marine biotechnology not as a single-product endeavor but as a platform for long-term regenerative industry transformation. His work reflects a commitment to scientific integrity, environmental stewardship, and scalable impact.",
                "At Aquabiotics Sur, he represents the integration of deep scientific understanding with pragmatic execution — ensuring that innovation is measurable, traceable, and globally competitive."
            ]
        }
    ]
});

// Update Spanish
esJson.about_page = esJson.about_page || {};
Object.assign(esJson.about_page, {
    origins_title: "Nuestros Orígenes",
    origins_p1: "Aquabiotics Sur nació en el corazón de la Región de Los Lagos, en el sur de Chile, un territorio conocido por sus fiordos prístinos y su próspera industria acuícola. Reconocimos una paradoja: mientras que la industria del mejillón es un motor económico importante, también genera volúmenes significativos de residuos líquidos que actualmente se descartan.",
    origins_p2: "No vimos esto como un desperdicio, sino como un depósito sin explotar de valiosas biomoléculas marinas. Nuestro equipo de biólogos e ingenieros se unió con una única misión: liderar la Economía Circular Azul a través de la biotecnología marina.",
    cards: [
        {
            title: "Misión",
            desc: "Liderar la Economía Circular Azul saneando nuestras costas, reemplazando los productos sintéticos con pureza sostenible y posicionando a la Patagonia como un centro global para la innovación biotecnológica."
        },
        {
            title: "Visión",
            desc: "Ser el líder global en metabolitos marinos reciclados, estableciendo el estándar de excelencia en economía circular y biotecnología desde el corazón de la Patagonia."
        },
        {
            title: "Ubicación",
            desc: "Operaciones estratégicas en la Región de Los Lagos, Chile, el centro de la industria del mejillón chileno."
        }
    ],
    team_title: "Quiénes Somos",
    team: [
        {
            name: "Byron Calderón",
            role: "CEO | Biotecnólogo | Desarrollo de Bioprocesos Sostenibles | Estrategia Científica",
            sub_role: "Líder Científico y Estratégico",
            img: "byron.png",
            linkedin: "https://www.linkedin.com/in/byron-calder%C3%B3n/",
            paragraphs: [
                "Especializado en el diseño de bioprocesos sostenibles, microbiología industrial e innovación basada en la ciencia. Su trabajo se fundamenta en la integración de la biología molecular, la ingeniería bioquímica y los principios de economía circular para transformar desafíos ambientales en soluciones biológicas escalables y de alto valor.",
                "Con experiencia en investigación, biotecnología industrial y gestión de proyectos, aporta un enfoque estructurado y basado en evidencia a la innovación. Su trayectoria profesional abarca microbiología aplicada, optimización de bioprocesos, sistemas de agua, estándares de calidad y redacción técnica científica. Combina el rigor analítico con la capacidad de ejecución, asegurando que los conceptos científicos trasciendan el potencial de laboratorio hacia sistemas comercialmente viables.",
                "En Aquabiotics Sur, desempeña un papel clave en el desarrollo científico y estratégico del modelo de biorrefinería circular azul de la empresa. Su enfoque se centra en el diseño y validación de procesos de bio-minería orgánica que transforman los flujos secundarios industriales de la industria mitilicultora de la Patagonia en compuestos bioactivos de origen marino, trazables y de alta pureza. Su trabajo apoya la transición de modelos extractivos a una biotecnología marina regenerativa y de valor agregado."
            ],
            contributions_title: "Contribuciones Clave:",
            contributions: [
                "Diseño y optimización de bioprocesos",
                "Validación científica y marcos de calidad",
                "Métricas de sostenibilidad e integración de circularidad",
                "Documentación técnica y alineación regulatoria",
                "Desarrollo de hoja de ruta de innovación"
            ],
            paragraphs_end: [
                "Su visión se alinea con posicionar a la Patagonia chilena como un referente global en biotecnología marina sostenible. Le motiva particularmente la oportunidad de reemplazar ingredientes derivados de petroquímicos con alternativas biológicamente recicladas que preserven la integridad del ecosistema mientras generan valor económico.",
                "Más allá del desarrollo operativo, aporta una mentalidad de pensamiento sistémico a la organización. Concibe la biotecnología marina no como un esfuerzo de un solo producto, sino como una plataforma para la transformación industrial regenerativa a largo plazo. Su trabajo refleja un compromiso con la integridad científica, la gestión ambiental y el impacto escalable.",
                "En Aquabiotics Sur, representa la integración de un profundo entendimiento científico con una ejecución pragmática — asegurando que la innovación sea medible, trazable y globalmente competitiva."
            ]
        }
    ]
});

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 4));
fs.writeFileSync(esPath, JSON.stringify(esJson, null, 4));
console.log("Translation JSON files updated successfully.");
