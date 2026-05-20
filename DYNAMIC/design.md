# 🎨 Diseño — Aquabiotics Sur: Sistema Visual Dinámico

## 1. Identidad Visual Base

> Todo el diseño parte del sitio original `aqua-biotics.com`. No se inventa nada: se potencia.

### 1.1 Paleta de Colores

Extraída del sitio estático original (marino, oceánico, sostenible):

```css
/* Primarios — extraídos del código fuente real del sitio */
--color-navy:       #0A1628;   /* Fondo oscuro principal */
--color-ocean:      #0c4a6e;   /* Azul marino — inicio del gradiente real */
--color-teal:       #064e3b;   /* Verde marino — fin del gradiente real */
--color-aqua:       #0ea5e9;   /* Azul cielo — primary_action_color real */
--color-emerald:    #10b981;   /* Verde esmeralda — secondary_action_color real */

/* Secundarios */
--color-seafoam:    #E8F5F5;   /* Fondos claros de secciones alternas */
--color-sand:       #F5F0E8;   /* Fondos cálidos */
--color-white:      #FFFFFF;   /* Texto sobre fondos oscuros */

/* Funcionales */
--color-success:    #10b981;   /* Confirmaciones — mismo que emerald */
--color-text-dark:  #1e293b;   /* Texto cuerpo (valor real: text_color del config) */
--color-text-muted: #6B8A9E;   /* Texto secundario */
--color-border:     #e5e7eb;   /* Bordes (gray-200 de Tailwind) */
```

**Gradiente real del Hero/Header:**
```css
background: linear-gradient(135deg, #0c4a6e 0%, #064e3b 100%);
```

**Configuración en `tailwind.config.js`:**
```js
colors: {
  navy:    '#0A1628',
  ocean:   '#0c4a6e',    // real
  teal:    '#064e3b',    // real
  aqua:    '#0ea5e9',    // real (primary action)
  emerald: '#10b981',    // real (secondary action)
  seafoam: '#E8F5F5',
  sand:    '#F5F0E8',
}
```

---

### 1.2 Tipografía

Replicar la tipografía del sitio original. Si no se puede identificar exactamente, usar este pairing que respeta el espíritu científico/marino:

```css
/* Títulos: limpio, moderno, autoridad científica */
font-family: 'Inter', sans-serif;        /* o la detectada en el original */

/* Cuerpo: legible, neutro */
font-family: 'Inter', sans-serif;

/* Monospace (opcional para datos técnicos) */
font-family: 'JetBrains Mono', monospace;
```

**Escala tipográfica:**
| Token | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| `display` | 56–72px | 700 | Hero headline |
| `h1` | 40–48px | 700 | Títulos de página |
| `h2` | 28–36px | 600 | Títulos de sección |
| `h3` | 20–24px | 600 | Subtítulos de card |
| `body` | 16–18px | 400 | Cuerpo de texto |
| `small` | 13–14px | 400 | Metadata, labels |
| `caption` | 11–12px | 500 | Tags, badges |

---

### 1.3 Logo

- Usar `logo.png` original en todos los lugares donde aparece.
- En navbar: altura fija de `40px`, sin distorsión.
- En footer: altura `36px`, versión con opacity reducida si está sobre fondo oscuro.
- En cards de updates: `32px` circular/con border-radius.

---

## 2. Sistema de Componentes

### 2.1 Navbar

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo] Aquabiotics Sur     Home  Technology  Market  About  Contact │
│                                                               [EN|ES] │
└─────────────────────────────────────────────────────────────────────┘
```

- **Comportamiento:** transparente sobre el Hero → glassmorphism (`backdrop-blur-md bg-navy/80`) al hacer scroll.
- **Transición:** `transition-all duration-300 ease-in-out`
- **Mobile:** hamburger menu con panel lateral deslizante (slide-in derecha).
- **Link activo:** underline animado `scaleX` desde izquierda, color `aqua`.
- **Toggle idioma:** pill animado `[EN | ES]` con deslizamiento del indicador.

---

### 2.2 Hero Section (Home)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [ANIMACIÓN DE ONDAS/PARTÍCULAS OCEÁNICAS — fondo]                  │
│                                                                      │
│           Natural Taurine from Marine                                │
│           Circular Biorefinery                ← stagger fade-in     │
│                                                                      │
│    Upcycling mussel cooking effluents into high-value marine         │
│    metabolites                                ← fade-in delay 0.3s  │
│                                                                      │
│    [Explore Technology]    [Get in Touch]     ← fade-in delay 0.6s  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

- **Fondo:** animación SVG/Canvas de ondas oceánicas (color `ocean` sobre `navy`), sutiles y lentas.
- **Gradiente overlay:** `from-navy via-navy/70 to-transparent` para legibilidad del texto.
- **Altura:** `100vh` mínimo.
- **Scroll indicator:** flecha animada (bounce) en la parte inferior.

---

### 2.3 Stat Counters

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│    100%      │  │     Zero     │  │     ESG      │
│ Natural      │  │    Waste     │  │   Aligned    │
│  Origin      │  │  Discharge   │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

- **Animación:** CountUp al entrar en viewport (Intersection Observer).
- **Border:** `border-t-2 border-aqua` en cada card.
- **Hover:** leve elevación `translateY(-4px)` + sombra `shadow-aqua/20`.

---

### 2.4 Cards de Sección (Challenge / Solution)

- Fondo alterno: secciones pares `bg-seafoam`, impares `bg-white`.
- **Entrada:** izquierda-derecha desde `x: -60` / `x: 60` con `opacity: 0 → 1`.
- **Trigger:** `whileInView` de Framer Motion con `viewport: { once: true, margin: "-100px" }`.

---

### 2.5 Update Cards (Latest Updates)

```
┌───────────────────────────────────────────────────────┐
│  [Logo]  Aquabiotics Sur                              │
│          Feb 14, 2026 · Circular Economy              │
│                                                       │
│  Biorefinery Prototype Integration: Scale-up Phase    │
│                                                       │
│  We have successfully integrated our proprietary...   │
│                                                       │
│  [View full post →]                                   │
└───────────────────────────────────────────────────────┘
```

- **Grid:** `grid-cols-1 md:grid-cols-3` con gap.
- **Hover:** elevación + border-left `4px solid teal` aparece con transición.
- **Badge de categoría:** pill con color por tipo (`Circular Economy` → teal, `Sustainability` → green, `Innovation` → ocean).
- **Entrada:** stagger con delay progresivo entre cards (`delay: index * 0.15s`).

---

### 2.6 Botones (CTA)

```
Primario:  [Explore Technology]   bg-aqua hover:bg-ocean text-white       (#0ea5e9)
Secundario: [Get in Touch]        border-2 border-white text-white hover:bg-white/10
Hero gradient: linear-gradient(135deg, #0c4a6e 0%, #064e3b 100%)
```

- **Transición:** `duration-200 ease-out`
- **Efecto ripple:** implementar en el primario con pseudo-elemento CSS animado.
- **Tamaño:** `px-8 py-3 rounded-lg text-base font-semibold`

---

### 2.7 Diagrama de Proceso (Technology)

Flujo horizontal animado (o vertical en mobile):

```
[Mussel Industry] →→→ [Cooking Broth] →→→ [Selective Separation] →→→ [Taurine] →→→ [Market]
        ↑ step 1              ↑ step 2              ↑ step 3             ↑ step 4      ↑ step 5
```

- Los pasos aparecen de izquierda a derecha con delay progresivo.
- Las flechas se dibujan con animación `strokeDashoffset` (SVG).
- Al hacer click en cada paso: panel expandible con descripción detallada.

---

### 2.8 Footer

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo] Aquabiotics Sur                                              │
│  Blue circular biorefinery for organic, traceable, sustainable...    │
│                                                                      │
│  Technology        Company         Market                            │
│  · Biorefinery     · About Us      · Natural vs Synthetic            │
│  · Quality Std     · Sustainability · Value Proposition              │
│  · Innovation      · Contact       · Target Industries               │
│                                                                      │
│  © 2026 Aquabiotics Sur. Blue circular economy...  [Privacy Policy]  │
└─────────────────────────────────────────────────────────────────────┘
```

- **Fondo:** `bg-navy`
- **Links:** hover con `color: aqua` + `translateX(4px)` transición suave.
- **Divider:** `border-t border-ocean/40` antes del copyright.

---

## 3. Animaciones — Guía de Referencia

| Elemento | Tipo | Duración | Easing |
|----------|------|----------|--------|
| Fade-in en scroll | opacity 0→1, y 20→0 | 0.6s | easeOut |
| Hero text stagger | opacity 0→1 | 0.5s por elemento | easeOut |
| Navbar glassmorphism | bg, blur | 0.3s | linear |
| Card hover elevación | translateY | 0.2s | easeOut |
| Contadores | countUp | 2s | easeInOut |
| Proceso flow arrows | strokeDashoffset | 1s | easeInOut |
| Page transition | opacity 0→1 | 0.4s | easeInOut |
| Hamburger → X | rotate + translate | 0.3s | easeInOut |

**Principio:** Las animaciones deben ser **funcionales**, no decorativas. Si no aportan comprensión, no van.

---

## 4. Ondas Marinas (Hero Background)

Implementar con SVG animado inline o biblioteca `tsParticles` en modo oceánico:

```jsx
// Opción A: SVG ondas con animación CSS
<svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full opacity-20">
  <path fill="#1DB8B8" className="animate-wave" d="M0,192L48,..."/>
</svg>

// Opción B: Canvas con partículas tipo burbujas/plancton
// tsParticles config: color aqua, movimiento lento, pocos elementos
```

---

## 5. Responsive Breakpoints

| Breakpoint | Tamaño | Cambios clave |
|------------|--------|---------------|
| `sm` | 640px | Stacking de columnas |
| `md` | 768px | Navbar muestra links, grid 2 cols |
| `lg` | 1024px | Grid 3 cols, hero full |
| `xl` | 1280px | Contenido máx-width centrado |

**Contenedor máximo:** `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 6. Accesibilidad

- Todos los botones con `aria-label`.
- Animaciones respetan `prefers-reduced-motion` → se desactivan si el usuario lo prefiere.
- Contraste de colores: mínimo WCAG AA (ratio 4.5:1 para texto normal).
- Focus visible con ring `ring-aqua ring-2 ring-offset-2`.
- Imágenes con `alt` descriptivo.

---

## 7. Moodboard Visual

**Referentes de estilo:** Notion + Linear + startups biotech marinas europeas  
**Sensación:** científico pero accesible, marino pero limpio, sustentable pero premium  
**Densidad:** espaciado generoso, no saturar de contenido  
**Fotografía:** si se agregan imágenes, solo fotografía real de mejillones, mar del sur de Chile, procesos industriales reales. No stock genérico.
