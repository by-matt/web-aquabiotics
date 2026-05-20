# 📋 Alcance del Proyecto — Aquabiotics Sur: De Estático a Dinámico

## 1. Visión General

**Proyecto:** Transformación del sitio estático `aqua-biotics.com` en una aplicación web dinámica, moderna e interactiva.  
**Empresa:** Aquabiotics Sur — Marine Circular Biorefinery (Sur de Chile)  
**Stack tecnológico propuesto:** React + Vite + Tailwind CSS + Framer Motion  
**Idiomas:** Inglés (EN) y Español (ES) — bilingual desde el día 1  
**Dominio existente:** https://www.aqua-biotics.com/

---

## 2. Páginas a Desarrollar

| Ruta | Nombre | Prioridad |
|------|--------|-----------|
| `/` | Home | Alta |
| `/technology` | Technology | Alta |
| `/market` | Market | Alta |
| `/sustainability` | Sustainability | Media |
| `/about` | About Us | Media |
| `/contact` | Contact | Alta |
| `/privacy` | Privacy Policy | Baja |

**Versión en español:** misma estructura bajo `/es/` o mediante toggle de idioma con i18n (`react-i18next`).

---

## 3. Funcionalidades Nuevas (Dinámicas)

### 3.1 Globales (todas las páginas)
- **Navbar dinámica:** se oculta al hacer scroll hacia abajo, reaparece al subir (scroll-aware). Fondo translúcido con blur (glassmorphism) sobre contenido.
- **Transiciones entre páginas:** fade suave via React Router + Framer Motion.
- **Modo idioma EN/ES:** toggle animado con cambio instantáneo sin recarga (i18n).
- **Footer dinámico:** mismo contenido, con hover effects y links activos.
- **SEO básico:** meta tags dinámicos por página con React Helmet.

### 3.2 Home (`/`)
- **Hero section:** animación de partículas o ondas marinas (canvas/SVG animado) con texto que aparece escalonadamente (stagger animation).
- **Contadores animados:** "100% Natural Origin", "Zero Waste Discharge", "ESG Aligned" se animan al entrar en viewport (CountUp).
- **Sección "The Challenge / Our Solution":** aparece con scroll-triggered fade-in desde lados opuestos.
- **Cards de "Latest Updates":** efecto hover con elevación y transición de color. Carga dinámica (datos hardcodeados en JSON, preparados para API LinkedIn futura).
- **CTA buttons:** efecto ripple y hover animado.

### 3.3 Technology (`/technology`)
- **Proceso Biorefinery:** diagrama de flujo interactivo (paso a paso animado con SVG o Framer Motion).
- **Tabs interactivos:** "Biorefinery Process", "Quality Standards", "Innovation" con transición suave entre vistas.
- **Iconografía animada** en los pasos del proceso.

### 3.4 Market (`/market`)
- **Comparativa Natural vs Synthetic:** tabla interactiva con highlight de columnas al hover.
- **Gráfico de mercado:** chart animado (Recharts o Chart.js) mostrando proyección de mercado de taurina natural.
- **Target Industries:** cards con iconos que pulsan al hacer hover.

### 3.5 Sustainability (`/sustainability`)
- **Métricas de impacto:** barras de progreso animadas al entrar en viewport.
- **Economía Circular:** diagrama circular/loop animado mostrando el ciclo: Mejillón → Cocción → Efluente → Taurina → Producto.
- **Mapa interactivo:** pin en el sur de Chile (Leaflet.js o Google Maps embed).

### 3.6 About (`/about`)
- **Timeline animado:** hitos del proyecto con entrada escalonada.
- **Team cards** (si existen): hover con flip effect.

### 3.7 Contact (`/contact`)
- **Formulario funcional:** validación en tiempo real (React Hook Form + Zod), feedback visual de error/éxito.
- **Envío via EmailJS** o endpoint propio (sin backend obligatorio en MVP).
- **Mapa embed** con ubicación en sur de Chile.

---

## 4. Activos que se Reutilizan del Sitio Original

| Activo | Uso |
|--------|-----|
| `logo.png` | Navbar y footer (mismo logo) |
| Paleta de colores | Se extrae del sitio original y se mantiene exacta |
| Todo el texto | Se migra sin modificar (EN y ES) |
| Estructura de navegación | Idéntica al menú original |
| Tipografías | Se replican (identificar via inspector o Google Fonts) |

---

## 5. Lo que NO Cambia

- **Contenido textual:** ni una palabra se modifica.
- **Nombres de secciones:** idénticos al original.
- **Estructura de navegación:** mismo orden y jerarquía.
- **Identidad visual:** mismos colores, logo, y estilo general.
- **Propósito:** comunicar el proyecto de biotaurina marina de forma clara.

---

## 6. Infraestructura & Deploy

- **Build:** Vite (rápido, moderno, compatible con React 18+)
- **Hosting recomendado:** Vercel o Netlify (gratis, CI/CD automático desde GitHub)
- **Dominio:** apuntar `aqua-biotics.com` al nuevo deployment
- **Formulario de contacto:** EmailJS (sin backend, gratis hasta 200 emails/mes)
- **i18n:** `react-i18next` con archivos JSON por idioma en `/locales/en/` y `/locales/es/`

---

## 7. Estructura de Archivos Propuesta

```
aquabiotics-sur/
├── public/
│   ├── logo.png              ← logo original
│   └── favicon.ico
├── src/
│   ├── assets/               ← imágenes y SVGs
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── CounterStat.jsx
│   │   ├── UpdateCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Technology.jsx
│   │   ├── Market.jsx
│   │   ├── Sustainability.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── es/translation.json
│   ├── data/
│   │   └── updates.json      ← posts de LinkedIn hardcodeados
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 8. Timeline Estimado (MVP)

| Semana | Entregable |
|--------|-----------|
| 1 | Setup, componentes base (Navbar, Footer, Hero), Home completa |
| 2 | Technology + Market |
| 3 | Sustainability + About + Contact con formulario |
| 4 | i18n EN/ES, pulido de animaciones, QA, deploy |

---

## 9. Dependencias Clave

```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "framer-motion": "^11",
  "react-i18next": "^14",
  "react-hook-form": "^7",
  "zod": "^3",
  "emailjs-com": "^3",
  "recharts": "^2",
  "leaflet": "^1.9",
  "countup.js": "^2",
  "tailwindcss": "^3"
}
```
