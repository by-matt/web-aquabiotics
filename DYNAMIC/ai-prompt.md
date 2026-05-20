# 🤖 Prompt para Asistente IA (VSCode / Cursor / Windsurf)

---

## INSTRUCCIÓN MAESTRA

Eres un desarrollador frontend senior especializado en React, Tailwind CSS y Framer Motion. Vas a transformar el sitio web estático de **Aquabiotics Sur** (`aqua-biotics.com`) en una aplicación React moderna, dinámica e interactiva.

**Regla absoluta:** No modificarás ningún texto de contenido. Cada palabra, título, párrafo y label se mantiene exactamente igual al original. Solo transformas la presentación y le agregas dinamismo.

---

## CONTEXTO DEL PROYECTO

**Empresa:** Aquabiotics Sur — startup de biotecnología marina en el sur de Chile.  
**Producto:** Taurina natural extraída de efluentes de cocción de mejillones mediante biorrefinería circular.  
**Sitio original:** https://www.aqua-biotics.com/ (HTML estático, sin JavaScript significativo)  
**Objetivo:** Convertirlo en una SPA (Single Page Application) con React que use las mismas páginas, el mismo logo, los mismos colores y el mismo texto, pero con animaciones, transiciones y componentes interactivos.  
**Idiomas:** Inglés (EN) y Español (ES) con toggle de idioma funcional.

---

## DATOS DE CONFIGURACIÓN REALES (usar exactamente estos valores)

```
Google Analytics ID : G-95YGFVTCSF
Formspree endpoint  : https://formspree.io/f/mykdeqla
Email de contacto   : info@aqua-biotics.com
LinkedIn            : https://cl.linkedin.com/company/aquabiotics-sur
```

---

## STEP 1 — SETUP DEL PROYECTO

Ejecuta los siguientes comandos en la terminal:

```bash
npm create vite@latest aquabiotics-sur -- --template react
cd aquabiotics-sur
npm install react-router-dom framer-motion react-i18next i18next react-hook-form @hookform/resolvers zod recharts leaflet react-leaflet
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## STEP 2 — CONFIGURACIÓN BASE

### `tailwind.config.js`
Configura los colores de la marca EXACTAMENTE como sigue (extraídos del sitio original):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#0A1628',
        ocean:   '#0c4a6e',   // color real del gradiente del sitio
        teal:    '#064e3b',   // color real del gradiente del sitio
        aqua:    '#0ea5e9',   // primary action color real
        emerald: '#10b981',   // secondary action color real
        seafoam: '#E8F5F5',
        sand:    '#F5F0E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'wave-slow': 'wave 12s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25px) scaleY(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
```

### `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-white text-gray-800 font-sans; }
}

@layer utilities {
  .animate-wave { animation: wave 8s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
}
```

---

## STEP 3 — ESTRUCTURA DE ARCHIVOS

Crea exactamente esta estructura:

```
src/
├── assets/
│   └── logo.png              ← copia logo.png del sitio original aquí
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── WaveBackground.jsx
│   ├── AnimatedSection.jsx
│   ├── StatCounter.jsx
│   ├── UpdateCard.jsx
│   ├── ProcessStep.jsx
│   └── ContactForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── Technology.jsx
│   ├── Market.jsx
│   ├── Sustainability.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── locales/
│   ├── en/translation.json
│   └── es/translation.json
├── data/
│   └── updates.json
├── i18n.js
├── App.jsx
└── main.jsx
```

---

## STEP 4 — DATOS Y TRADUCCIONES

### `src/data/updates.json`
```json
[
  {
    "id": 1,
    "date": "February 14, 2026",
    "dateEs": "14 de febrero de 2026",
    "category": "Circular Economy",
    "categoryEs": "Economía Circular",
    "title": "Biorefinery Prototype Integration: Scale-up Phase",
    "titleEs": "Integración del Prototipo de Biorrefinería: Fase de Escalado",
    "excerpt": "We have successfully integrated our proprietary selective separation technology into the main processing line, significantly improving taurine recovery rates.",
    "excerptEs": "Hemos integrado exitosamente nuestra tecnología propietaria de separación selectiva en la línea de procesamiento principal, mejorando significativamente las tasas de recuperación de taurina.",
    "url": "https://cl.linkedin.com/company/aquabiotics-sur"
  },
  {
    "id": 2,
    "date": "February 10, 2026",
    "dateEs": "10 de febrero de 2026",
    "category": "Sustainability",
    "categoryEs": "Sostenibilidad",
    "title": "Territorial Impact: Partnering with Local Mussel Producers",
    "titleEs": "Impacto Territorial: Alianzas con Productores Locales de Mejillón",
    "excerpt": "Deepening our commitment to the territorial impact in Southern Chile through new operational partnerships focused on 100% waste valorization.",
    "excerptEs": "Profundizando nuestro compromiso con el impacto territorial en el sur de Chile a través de nuevas alianzas operativas centradas en la valorización del 100% de los residuos.",
    "url": "https://cl.linkedin.com/company/aquabiotics-sur"
  },
  {
    "id": 3,
    "date": "February 05, 2026",
    "dateEs": "5 de febrero de 2026",
    "category": "Innovation",
    "categoryEs": "Innovación",
    "title": "Blue Circular Economy: 0% Waste, 100% Value",
    "titleEs": "Economía Circular Azul: 0% Residuos, 100% Valor",
    "excerpt": "Explaining our core philosophy: why natural taurine from cooking broth is the key to a more sustainable functional food market.",
    "excerptEs": "Explicando nuestra filosofía central: por qué la taurina natural del caldo de cocción es la clave para un mercado de alimentos funcionales más sostenible.",
    "url": "https://cl.linkedin.com/company/aquabiotics-sur"
  }
]
```

### `src/locales/en/translation.json`
Crea un archivo con TODAS las cadenas de texto del sitio original en inglés, organizadas por página:
```json
{
  "nav": {
    "home": "Home", "technology": "Technology", "market": "Market",
    "sustainability": "Sustainability", "about": "About", "contact": "Contact"
  },
  "hero": {
    "title": "Natural Taurine from Marine Circular Biorefinery",
    "subtitle": "Upcycling mussel cooking effluents into high-value marine metabolites",
    "cta_primary": "Explore Technology",
    "cta_secondary": "Get in Touch"
  },
  "stats": {
    "natural": "100%", "natural_label": "Natural Origin",
    "waste": "Zero", "waste_label": "Waste Discharge",
    "esg": "ESG", "esg_label": "Aligned"
  },
  "about_blurb": "Aquabiotics Sur is a marine biotechnology project focused on the recovery and purification of natural taurine from residual cooking broth generated by the mussel industry in southern Chile. Through a sustainable biorefinery approach, we transform an industrial liquid waste stream into a high-value functional ingredient, aligned with circular economy principles and territorial impact.",
  "challenge": {
    "title": "The Challenge",
    "body": "The mussel cooking process generates large volumes of liquid effluents with high organic load, currently managed as waste. These residual streams contain valuable endogenous metabolites, such as taurine, which are lost despite their significant industrial and functional value. This represents both an environmental liability and a missed economic opportunity for the marine food processing sector."
  },
  "solution": {
    "title": "Our Solution",
    "intro": "Aquabiotics Sur applies marine biorefinery and selective separation technologies to recover taurine naturally present in mussel cooking broth.",
    "process_title": "Our process enables:",
    "bullets": [
      "Valorization of an existing industrial residue",
      "Production of taurine with marine origin and traceability",
      "Reduction of environmental burden associated with liquid effluents"
    ],
    "closing": "The result is a scalable platform for the sustainable production of marine-derived metabolites."
  },
  "updates": {
    "title": "Latest Updates",
    "subtitle": "Follow our journey in marine biotechnology and circular economy milestones as we scale our impact.",
    "cta": "View all posts on LinkedIn",
    "view_post": "View full post"
  },
  "footer": {
    "tagline": "Blue circular biorefinery for organic, traceable, and sustainable taurine bioprocessing",
    "technology": "Technology",
    "company": "Company",
    "market": "Market",
    "copyright": "© 2026 Aquabiotics Sur. Blue circular economy through sustainable innovation.",
    "privacy": "Privacy Policy",
    "links": {
      "biorefinery": "Biorefinery Process", "quality": "Quality Standards", "innovation": "Innovation",
      "about": "About Us", "sustainability": "Sustainability", "contact": "Contact",
      "natural_vs": "Natural vs Synthetic", "value": "Value Proposition", "industries": "Target Industries"
    }
  }
}
```

Crea `src/locales/es/translation.json` con las mismas claves pero con el texto en español (extraído de `https://www.aqua-biotics.com/es/index.html`).

### `src/i18n.js`
```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

---

## STEP 5 — COMPONENTES

### `src/components/Navbar.jsx`
Crea una navbar con estas características EXACTAS:
1. Logo + nombre "Aquabiotics Sur" alineados a la izquierda.
2. Links de navegación centrados/derecha: Home, Technology, Market, Sustainability, About, Contact.
3. Toggle de idioma `EN | ES` a la derecha con un pill deslizante animado.
4. **Comportamiento de scroll:** empieza transparente (en Hero, fondo oscuro), cambia a `bg-navy/90 backdrop-blur-md shadow-lg` al hacer scroll > 80px. Usar `useEffect` con `window.addEventListener('scroll', ...)`.
5. **Ocultamiento al scroll:** se oculta (`translateY(-100%)`) al hacer scroll hacia abajo rápido, reaparece al subir. Usar `useRef` para trackear posición previa.
6. **Mobile:** hamburger icon (Heroicons o SVG inline), menú lateral con `framer-motion` `AnimatePresence` + `motion.div` slide-in desde la derecha.
7. Link activo: usar `NavLink` de `react-router-dom` con clase `text-aqua border-b-2 border-aqua`.

### `src/components/WaveBackground.jsx`
SVG animado de ondas oceánicas para el fondo del Hero. Debe:
- Tener 2-3 capas de ondas SVG con colores `ocean`, `teal`, `aqua` y opacidades diferentes.
- Animarse lentamente con `animation: wave 8s ease-in-out infinite`.
- Estar `position: absolute` llenando el fondo del Hero.
- Renderizar burbujas/partículas sutiles opcionales con CSS puro.

### `src/components/AnimatedSection.jsx`
Wrapper reutilizable para animaciones al scroll:
```jsx
// Props: children, direction ('left'|'right'|'up'), delay (número), className
// Usar framer-motion whileInView con viewport {{ once: true, margin: "-80px" }}
// Animación: opacity 0→1, x o y desde 40→0
```

### `src/components/StatCounter.jsx`
```jsx
// Props: value (string: "100%", "Zero", "ESG"), label (string)
// Animar el valor con CountUp si es numérico, o simplemente fade-in si es texto
// Border superior con color aqua
// Hover: translateY(-4px) + shadow
```

### `src/components/UpdateCard.jsx`
```jsx
// Props: date, category, title, excerpt, url
// Colores de badge por categoría:
//   "Circular Economy" → bg-teal/10 text-teal
//   "Sustainability"   → bg-green-100 text-green-700  
//   "Innovation"       → bg-ocean/10 text-ocean
// Hover: border-l-4 border-teal aparece con transición, leve elevación
// Logo de la empresa en la cabecera de la card
```

### `src/components/ContactForm.jsx`
El formulario usa **Formspree** (ya configurado, sin backend ni variables de entorno).

```jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykdeqla';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: 'New message from Aquabiotics Web',
        }),
      });
      if (res.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm">
      {/* Honeypot anti-spam (oculto) */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input {...register('name')} type="text" placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input {...register('email')} type="email" placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea {...register('message')} placeholder="How can we help you?"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all h-32 resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-teal text-white font-bold py-3 px-6 rounded-lg hover:bg-aqua transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending...
          </span>
        ) : 'Send Message'}
      </button>

      {status === 'success' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-3 rounded-lg bg-green-100 text-green-800 font-medium">
          ✅ Message sent successfully! We'll get back to you soon.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-3 rounded-lg bg-red-100 text-red-800 font-medium">
          ❌ Something went wrong. Please try again or email us at{' '}
          <a href="mailto:info@aqua-biotics.com" className="underline">info@aqua-biotics.com</a>
        </motion.div>
      )}
    </form>
  );
}
```

---

## STEP 6 — PÁGINAS

### `src/pages/Home.jsx`
Construye la home con exactamente estas secciones en orden:
1. **Hero:** WaveBackground + texto escalonado + dos CTAs. Texto del hero EXACTO del original.
2. **Stats:** 3 StatCounters en fila (100% Natural Origin, Zero Waste Discharge, ESG Aligned).
3. **About blurb:** párrafo introductorio de Aquabiotics Sur sobre fondo `seafoam`, AnimatedSection desde abajo.
4. **The Challenge:** título + texto del original, AnimatedSection desde la izquierda.
5. **Our Solution:** título + intro + lista de bullets + closing del original, AnimatedSection desde la derecha.
6. **Latest Updates:** título, subtítulo, grid de 3 UpdateCards con stagger, link a LinkedIn.

### `src/pages/Technology.jsx`
1. **Page Hero:** título "Technology" sobre fondo `ocean`, altura 40vh.
2. **Tabs:** 3 tabs "Biorefinery Process" | "Quality Standards" | "Innovation" con animación de contenido.
3. **Biorefinery Process tab:** diagrama de flujo de 5 pasos:
   - Mussel Industry → Cooking Broth → Selective Separation → Taurine Purification → Market
   - SVG animado con líneas que se dibujan progresivamente.
   - Cada paso: click para expandir descripción.
4. **Quality Standards tab:** contenido con iconos y texto.
5. **Innovation tab:** contenido con iconos y texto.

### `src/pages/Market.jsx`
1. **Page Hero:** título "Market".
2. **Natural vs Synthetic:** tabla comparativa con columnas animadas al hover.
3. **Value Proposition:** cards con iconos flotantes (animate-float).
4. **Target Industries:** grid de industrias con iconos que pulsan.
5. **Gráfico de mercado:** `LineChart` de Recharts mostrando proyección de mercado de taurina natural (datos ficticios ilustrativos, claramente marcados como proyección).

### `src/pages/Sustainability.jsx`
1. **Page Hero:** título "Sustainability".
2. **Métricas de impacto:** barras de progreso animadas (width 0 → % al entrar en viewport).
3. **Ciclo Circular:** diagrama circular animado mostrando:
   Mussel Farm → Processing Plant → Cooking Broth (Waste) → Biorefinery → Natural Taurine → Market → ↺
4. **Mapa:** `react-leaflet` con pin en Región de Los Lagos, Chile.

### `src/pages/About.jsx`
1. **Page Hero:** título "About Us".
2. **Descripción del proyecto:** texto del original.
3. **Timeline:** hitos animados con stagger.
4. **Valores/Principios:** cards con hover.

### `src/pages/Contact.jsx`
1. **Page Hero:** título "Get in Touch", subtítulo "Let's collaborate for a more sustainable future." sobre gradiente `from-[#0c4a6e] to-[#064e3b]`.
2. **Layout 2 columnas:**
   - **Izquierda — Contact Information:**
     - Título "Contact Information"
     - Párrafo: "Whether you are a potential partner, investor, or customer, we'd love to hear from you."
     - Email con ícono: `info@aqua-biotics.com` (link `mailto:info@aqua-biotics.com`)
     - Location con ícono: "Los Lagos Region, Southern Chile"
   - **Derecha:** componente `<ContactForm />` (Formspree ya configurado).
3. Ambas columnas con `AnimatedSection` (izquierda desde left, derecha desde right con delay 0.2s).

---

## STEP 7 — ROUTING Y APP

### `src/App.jsx`
```jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Importar todas las páginas

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/market" element={<Market />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}
```

### `index.html` (en la raíz del proyecto Vite)
Agrega el snippet de Google Analytics dentro del `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-95YGFVTCSF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-95YGFVTCSF');
</script>
```

### `src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n.js';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## STEP 8 — WRAPPER DE TRANSICIÓN DE PÁGINAS

Cada página debe estar envuelta en este componente de animación:

```jsx
// src/components/PageWrapper.jsx
import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## STEP 9 — LOGO

1. Descarga el logo desde `https://www.aqua-biotics.com/logo.png`.
2. Colócalo en `src/assets/logo.png`.
3. Impórtalo en Navbar y Footer: `import logo from '../assets/logo.png'`.
4. Navbar: `<img src={logo} alt="Aquabiotics Sur" className="h-10 w-auto" />`
5. Footer: `<img src={logo} alt="Aquabiotics Sur" className="h-9 w-auto opacity-90" />`

---

## STEP 10 — REGLAS FINALES Y QA

Antes de dar la tarea por completada, verifica:

- [ ] **Ningún texto ha sido modificado** respecto al original en inglés.
- [ ] El toggle EN/ES funciona en todas las páginas.
- [ ] La navbar se oculta/muestra correctamente al hacer scroll.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] El sitio es completamente responsive (probar en 375px, 768px, 1280px).
- [ ] El formulario de contacto valida los campos correctamente.
- [ ] No hay errores en consola.
- [ ] Las rutas funcionan correctamente (incluir `vite.config.js` con `base: '/'`).
- [ ] El logo original se carga correctamente en navbar y footer.
- [ ] Los colores usados coinciden EXACTAMENTE con la paleta definida.

---

## NOTAS PARA EL ASISTENTE

- **Pregunta si hay dudas** sobre el contenido de páginas internas (Technology, Market, etc.) antes de inventar texto.
- **No inventes información** sobre la empresa, procesos o métricas que no estén en el sitio original.
- **El diagrama de flujo** de Technology debe ser funcional aunque sea simplificado — prioriza que funcione bien sobre que sea muy elaborado.
- **El mapa** puede ser un simple `<iframe>` de Google Maps si Leaflet da problemas de setup.
- **Primero construye Home completa** y pide validación antes de continuar con el resto.
- **Commit frecuente** con mensajes descriptivos en inglés.
