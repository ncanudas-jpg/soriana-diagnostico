/* ==========================================================================
   data.js — TODOS los datos y textos del sitio.
   Edita aquí: autores, textos, cifras, fuentes. No hace falta tocar app.js.
   Cifras en millones de pesos (mdp) salvo que se indique otra unidad.
   ========================================================================== */
window.SITE = {

  /* ---------- Portada y créditos (editables) ---------- */
  meta: {
    titulo: 'Soriana. Diagnóstico y estrategia.',
    subtitulo: 'La radiografía de Organización Soriana (BMV: SORIANAB) contra su rival directo, Chedraui, y un plan para volver a crecer con más eficiencia. Toca, juega y descubre.',
    autores: ['Nicolás Canudas Sagrero'],
    materia: '',
    profesor: '',
    institucion: '',
    fecha: 'Octubre 2026'
  },

  /* ---------- Logos: archivo en assets/ y su ruta en `archivo`. `principal` = protagonista (grande, con texto);
     `alto` = alto en px del logo secundario. Con `archivo: ''` o si falla la carga, se muestra el nombre en texto. ---------- */
  logos: [
    { nombre: 'Soriana',  archivo: 'assets/soriana-icono.png', color: '#E4002B', principal: true },
    { nombre: 'Chedraui', archivo: 'assets/chedraui.png',      color: '#F28C00', alto: 56 }
  ],

  /* ---------- Colores de datos ---------- */
  colores: { soriana: '#E4002B', chedraui: '#F28C00', ref: '#8e8e93', verde: '#006C32', lima: '#B6BF00' },

  /* ---------- Navegación ---------- */
  nav: [
    { id: 'inicio', texto: 'Inicio' },
    { id: 'perfil', texto: 'Perfil' },
    { id: 'diagnostico', texto: 'Diagnóstico' },
    { id: 'modelo', texto: 'Modelo' },
    { id: 'finanzas', texto: 'Finanzas' },
    { id: 'duelo', texto: 'Duelo' },
    { id: 'dashboard', texto: 'Dashboard' },
    { id: 'propuesta', texto: 'Propuesta' },
    { id: 'simulador', texto: 'Simulador' },
    { id: 'cierre', texto: 'Cierre' }
  ],

  /* ---------- Encabezados de cada diapositiva ---------- */
  heads: {
    perfil:      { k: '01 · Conócela', t: 'Soriana, de Torreón para todo México.', s: 'Más de 50 años llenando carritos. Toca las pestañas para saber qué la mueve.' },
    diagnostico: { k: '02 · Radiografía', t: 'El diagnóstico en diez toques.', s: 'Toca una letra y descubre qué pasa en su entorno (PESTEL) y por dentro (FODA).' },
    modelo:      { k: '03 · Cómo funciona', t: 'Su negocio y hacia dónde va.', s: 'Un vistazo al modelo Canvas y a las cinco tendencias que están moviendo el tablero.' },
    finanzas:    { k: '04 · Los números', t: 'Los números cuentan una historia.', s: 'Elige un tema y mira cómo se compara Soriana con su rival directo.' },
    duelo:       { k: '05 · El duelo', t: 'Soriana vs. Chedraui.', s: 'Veinte razones financieras, un solo rival. Chedraui (BMV: CHDRAUI) es el comparable directo. ¿Quién gana cada una?' },
    dashboard:   { k: '06 · Tablero', t: 'Tu tablero de control.', s: 'Elige empresa y año. Cada tarjeta compara contra el año anterior y contra una referencia.' },
    propuesta:   { k: '07 · Propuesta', t: 'Qué haríamos ahora.', s: 'Lo que hay que cuidar, dónde está la oportunidad y la ruta para lograrlo.' },
    simulador:   { k: '08 · Simulador', t: '¿Y si movemos las perillas?', s: 'Juega con inventario, margen y ventas y mira cuánto efectivo y EBITDA se liberan.' },
    cierre:      { k: '09 · Cierre', t: 'Lo que nos llevamos.', s: '' }
  },

  /* ---------- PERFIL ---------- */
  perfil: {
    contadores: [
      { valor: 820, prefijo: '', sufijo: '', etiqueta: 'Tiendas y clubes' },
      { valor: 32, prefijo: '', sufijo: '', etiqueta: 'Estados' },
      { valor: 84, prefijo: '+', sufijo: ' mil', etiqueta: 'Colaboradores' },
      { valor: 1968, prefijo: '', sufijo: '', etiqueta: 'Fundada en Torreón', sinSeparador: true },
      { texto: 'Monterrey', etiqueta: 'Oficinas corporativas' },
      { valor: 1987, prefijo: '', sufijo: '', etiqueta: 'Cotiza en la BMV', sinSeparador: true }
    ],
    pestanas: [
      { id: 'mision', titulo: 'Misión', texto: 'Satisfacer las necesidades de consumo de las comunidades, generando relaciones duraderas con sus grupos de interés y una rentabilidad sostenible.' },
      { id: 'vision', titulo: 'Visión', texto: 'Ampliar su presencia y liderazgo mediante la innovación, una experiencia de compra superior y un entorno laboral atractivo.' },
      { id: 'productos', titulo: 'Productos', texto: 'Comercialización de alimentos, perecederos, ropa, artículos para el hogar, productos de salud y mercancías generales, mediante tiendas físicas, clubes de precios y comercio electrónico.' },
      { id: 'valor', titulo: 'Propuesta de valor', texto: 'Amplio surtido, precios competitivos, accesibilidad y formatos de tienda adaptados a diferentes necesidades de consumo.' }
    ]
  },

  /* ---------- PESTEL ---------- */
  pestel: [
    { letra: 'P', factor: 'Político', situacion: 'Regulación de etiquetado nutrimental, IEPS, política comercial y salario mínimo afectan costos y precios. El aumento del IEPS y la inflación presionaron el consumo al inicio de 2026.', impacto: 'Mayor costo regulatorio y presión sobre márgenes; adaptar surtido, etiquetas y comunicación.' },
    { letra: 'E', factor: 'Económico', situacion: 'Consumo débil: las ventas de autoservicio crecieron por debajo de la inflación en varios meses.', impacto: 'Menor ticket, mayor sensibilidad al precio; necesidad de promociones, marcas propias y formatos de proximidad.' },
    { letra: 'S', factor: 'Social', situacion: 'El consumidor busca valor y compras más frecuentes de menor tamaño; crecen promociones, marcas propias y lealtad.', impacto: 'Oportunidad en formatos pequeños, abarrotes básicos y marca propia; riesgo si no responde rápido.' },
    { letra: 'T', factor: 'Tecnológico', situacion: 'E-commerce, comparación de precios desde el celular, entrega a domicilio y analítica de datos son centrales; Soriana impulsa negocios digitales.', impacto: 'Inversión en e-commerce, inventarios en tiempo real, personalización y ciberseguridad.' },
    { letra: 'E', factor: 'Ecológico', situacion: 'Expectativas de eficiencia energética, residuos, empaques sostenibles y resiliencia climática; las lluvias redujeron tráfico en tiendas en el 3T 2026.', impacto: 'Costos energéticos y logísticos, riesgo operativo por clima; oportunidad de diferenciación.' },
    { letra: 'L', factor: 'Legal', situacion: 'Normativa laboral, fiscal, protección de datos, competencia, publicidad y etiquetado.', impacto: 'Riesgo de multas y costos de cumplimiento; la expansión financiera exige más controles.' }
  ],

  /* ---------- FODA ---------- */
  foda: [
    { letra: 'F', nombre: 'Fortalezas', tipo: 'bien', items: ['Presencia nacional con 820 tiendas al cierre de 2025', 'Diversificación de formatos', 'Amplia red de proveedores y distribución', 'Reconocimiento de marca y campañas consolidadas'] },
    { letra: 'D', nombre: 'Debilidades', tipo: 'mal', items: ['Disminución de ventas netas en 2025 vs 2024', 'Incremento de gastos generales', 'Reducción de la utilidad operativa', 'Elevados costos fijos de tiendas físicas'] },
    { letra: 'O', nombre: 'Oportunidades', tipo: 'bien', items: ['Crecimiento de e-commerce y omnicanalidad', 'Expansión de marcas propias', 'Mayor demanda de opciones económicas y convenientes', 'Automatización logística y eficiencia operativa'] },
    { letra: 'A', nombre: 'Amenazas', tipo: 'mal', items: ['Competencia intensa en precios y promociones', 'Inflación y presión sobre el poder adquisitivo', 'Fluctuación en costos laborales, energéticos y logísticos', 'Expansión de plataformas digitales y formatos de descuento'] }
  ],

  /* ---------- 5 TENDENCIAS ---------- */
  tendencias: [
    { n: 1, titulo: 'Optimización', cifra: '820 → 812', texto: 'Prioriza eficiencia sobre número de tiendas: pasó de 820 a 812 y cerrará 20 y reducirá 60 para mejorar la rentabilidad por metro cuadrado.' },
    { n: 2, titulo: 'Marca propia', cifra: '+2,000', texto: 'Estrategia "Descubre lo Mejor": más de 2,000 productos y más de 1,000 SKUs nuevos en 2026.' },
    { n: 3, titulo: 'Omnicanalidad', cifra: '5×', texto: 'El negocio digital creció cinco veces más que las ventas físicas en 2025: "Súper en tu casa", recolección en tienda y entregas programadas.' },
    { n: 4, titulo: 'Retail media', cifra: 'Nuevos ingresos', texto: 'Usa datos de compra y lealtad para conectar marcas con clientes dentro y fuera de Soriana.com; nueva fuente de ingresos publicitarios.' },
    { n: 5, titulo: 'Rentabilidad', cifra: '+46.8%', texto: 'En el 2T 2026 las ventas bajaron de 45,810 a 43,559 mdp, pero la utilidad creció 46.8%.' }
  ],

  /* ---------- CANVAS (grid-area se define en css) ---------- */
  canvas: [
    { id: 'socios', titulo: 'Socios clave', items: ['Proveedores nacionales e internacionales', 'Productores agrícolas y ganaderos', 'Aliados logísticos', 'Instituciones financieras', 'Socios tecnológicos', 'Autoridades regulatorias'] },
    { id: 'actividades', titulo: 'Actividades clave', items: ['Compra y abasto', 'Operación de tiendas', 'Logística', 'Comercialización y promociones', 'Canales digitales', 'Marcas propias', 'Servicio al cliente'] },
    { id: 'recursos', titulo: 'Recursos clave', items: ['Red de tiendas y CEDIS', 'Capital humano', 'Marca Soriana', 'Relación con proveedores', 'Infraestructura tecnológica', 'Datos de clientes y lealtad', 'Capacidad financiera'] },
    { id: 'valor', titulo: 'Propuesta de valor', items: ['Amplio surtido', 'Precios competitivos y promociones', 'Formatos adaptados', 'Marcas propias con buena relación calidad-precio', 'Compra conveniente en tienda y en línea'] },
    { id: 'relaciones', titulo: 'Relaciones con clientes', items: ['Lealtad y recompensas', 'Comunicación personalizada digital', 'Atención en tienda y en línea', 'Confianza y cercanía con la comunidad'] },
    { id: 'canales', titulo: 'Canales', items: ['Tiendas (Híper, Súper, Express, Mercado, City Club)', 'soriana.com', 'App móvil', 'Redes sociales', 'Promociones y folletos'] },
    { id: 'segmentos', titulo: 'Segmentos de clientes', items: ['Hogares mexicanos de distintos niveles', 'Familias de consumo diario', 'Compradores de alto volumen (City Club)', 'Clientes en línea', 'Negocios, restaurantes y pequeños comercios'] },
    { id: 'costos', titulo: 'Estructura de costos', items: ['Costo de mercancía', 'Operación de tiendas (renta, servicios, mantenimiento)', 'Personal', 'Logística', 'Generales y administrativos', 'Tecnología', 'Mercadotecnia y promociones'] },
    { id: 'ingresos', titulo: 'Fuentes de ingresos', items: ['Venta en tiendas', 'E-commerce', 'Membresías City Club', 'Marcas propias', 'Servicios complementarios (recargas, pagos)', 'Promociones y alianzas comerciales'] }
  ],

  /* ---------- RIVAL (único competidor analizado) ---------- */
  rival: { nombre: 'Chedraui', ticker: 'CHDRAUI', nota: 'Empresa pública. Es el comparable directo en todo el análisis financiero.' },

  /* ---------- BASE FINANCIERA (mdp) — hoja DATOS del Excel del equipo ---------- */
  anios: [2023, 2024, 2025],
  base: {
    soriana: {
      ingresos: [172184, 175592, 173980], costoVentas: [140872, 141739, 139691], utilidadBruta: [31312, 33853, 34289],
      utilidadOperacion: [9439, 8664, 7552], ebitda: [12905, 12706, 11894], utilidadNeta: [5021, 3885, 3307],
      efectivo: [6746, 9615, 9295], cxc: [3358, 823, 876], inventario: [33866, 32923, 32283],
      activoCirc: [49096, 49733, 48529], activoTotal: [151500, 156852, 156037], cxp: [32084, 28071, 30485],
      pasivoCirc: [37282, 40258, 39219], pasivoTotal: [72682, 74237, 71305], capital: [78818, 82615, 84732],
      deudaSinArr: [12834, 18377, 11500], deudaTotal: [23279, 29427, 23618]
    },
    chedraui: {
      ingresos: [263057.724, 281761.525, 295313.651], costoVentas: [201790.575, 216667.684, 234609.977], utilidadBruta: [61267.149, 65093.841, 60703.674],
      utilidadOperacion: [15712.332, 15069.681, 15097.902], ebitda: [21909.105, 22374.16, 24729.719], utilidadNeta: [7644.896, 6720.639, 6535.09],
      efectivo: [13695.971, 13657.483, 14640.162], cxc: [4984.772, 2280.006, 5100.708], inventario: [20773.755, 24360.213, 23436.915],
      activoCirc: [40314.736, 44791.718, 44626.646], activoTotal: [140237.611, 171285.405, 160365.409], cxp: [31822.96, 34315.717, 33770.884],
      pasivoCirc: [43913.811, 51041.324, 48465.26], pasivoTotal: [94363.909, 118913.381, 108016.747], capital: [45873.702, 52349.251, 52348.662],
      deudaSinArr: [8142.667, 11445.741, 7716.698], deudaTotal: [47234.078, 68830.401, 57274.355]
    }
  },

  /* ---------- 2T 2026 (matiz importante) ---------- */
  segundoTrimestre: {
    titulo: 'El matiz del 2T 2026',
    ventas: { antes: 45810, ahora: 43559 },
    utilidad: { antes: 743, ahora: 1090 },
    texto: 'La utilidad de Soriana creció 46.8% en el 2T26 (1,090 vs 743 mdp) principalmente por menor costo financiero, no por la operación. Las ventas cayeron.'
  },

  /* ---------- RAZONES (tabla de 20) — [2024, 2025]
     unit: pct | x | dias | mdp · better: high | low | na ---------- */
  razones: [
    { id: 'crec', cat: 'Rentabilidad', nombre: 'Crecimiento de ingresos', unit: 'pct', s: [2.0, -0.9], c: [7.1, 4.8], better: 'high', ref: { v: 5.6, txt: 'Walmex 2025: +5.6%' } },
    { id: 'mbruto', cat: 'Rentabilidad', nombre: 'Margen bruto', unit: 'pct', s: [19.3, 19.7], c: [23.1, 20.6], better: 'high', aviso: 'Advertencia: el margen bruto de los archivos no coincide con el reportado (Soriana reporta ~24%) por diferencias de clasificación. Compara en margen operativo y EBITDA.', ref: { v: 24.0, txt: 'Walmex 4T25: 24.0%' } },
    { id: 'mop', cat: 'Rentabilidad', nombre: 'Margen operativo', unit: 'pct', s: [4.9, 4.3], c: [5.3, 5.1], better: 'high', ref: { v: 7.8, txt: 'Walmex 2025: 7.8% · Damodaran (abarrotes EE.UU., antes de impuestos): 2.29%' } },
    { id: 'mebitda', cat: 'Rentabilidad', nombre: 'Margen EBITDA', unit: 'pct', s: [7.2, 6.8], c: [7.9, 8.4], better: 'high', ref: { v: 10.2, txt: 'Walmex 2025: 10.2%' } },
    { id: 'mneto', cat: 'Rentabilidad', nombre: 'Margen neto', unit: 'pct', s: [2.21, 1.90], c: [2.39, 2.21], better: 'high', ref: { v: 4.9, txt: 'Walmex 2025: 4.9% · Damodaran: 1.32%' } },
    { id: 'roa', cat: 'Rentabilidad', nombre: 'ROA', unit: 'pct', s: [2.48, 2.12], c: [3.92, 4.08], better: 'high', ref: { txt: 'Sin dato sectorial directo. ROIC de abarrotes EE.UU. (Damodaran): ~7%' } },
    { id: 'roe', cat: 'Rentabilidad', nombre: 'ROE', unit: 'pct', s: [4.70, 3.90], c: [12.84, 12.48], better: 'high', ref: { v: 12.9, txt: 'Damodaran, abarrotes y alimentos EE.UU. (ene-2026): 12.9%' } },
    { id: 'rotact', cat: 'Rentabilidad', nombre: 'Rotación de activos', unit: 'x', s: [1.12, 1.11], c: [1.64, 1.84], better: 'high', ref: { txt: 'Sin referencia sectorial directa' } },
    { id: 'circ', cat: 'Liquidez', nombre: 'Razón circulante', unit: 'x', s: [1.24, 1.24], c: [0.88, 0.92], better: 'high', ref: { criterio: true, txt: 'Criterio general: 1.0 a 2.0. En autoservicio es normal estar por debajo de 1' } },
    { id: 'acida', cat: 'Liquidez', nombre: 'Prueba del ácido', unit: 'x', s: [0.42, 0.41], c: [0.40, 0.44], better: 'high', ref: { criterio: true, txt: 'Criterio general: 1.0 o más; valores bajos son habituales en autoservicio' } },
    { id: 'ctrab', cat: 'Liquidez', nombre: 'Capital de trabajo (mdp)', unit: 'mdp', s: [9475, 9310], c: [-6250, -3839], better: 'na', ref: { criterio: true, txt: 'Criterio general: negativo o cercano a cero es habitual en autoservicio' } },
    { id: 'ctoi', cat: 'Liquidez', nombre: 'Capital de trabajo operativo / ingresos', unit: 'pct', s: [3.2, 1.5], c: [-2.7, -1.8], better: 'low', ref: { v: 1.9, txt: 'Damodaran, abarrotes EE.UU. (ene-2026): 1.9%' } },
    { id: 'dso', cat: 'Eficiencia operativa', nombre: 'Días de cuentas por cobrar', unit: 'dias', s: [1.7, 1.8], c: [3.0, 6.3], better: 'low', ref: { txt: 'Sin dato público comparable. En autoservicio se cobra casi de inmediato' } },
    { id: 'dio', cat: 'Eficiencia operativa', nombre: 'Días de inventario', unit: 'dias', s: [84.8, 84.4], c: [41.0, 36.5], better: 'low', ref: { txt: 'Sin dato público comparable. Menos días = menos dinero parado en mercancía' } },
    { id: 'dpo', cat: 'Eficiencia operativa', nombre: 'Días de cuentas por pagar', unit: 'dias', s: [72.3, 79.7], c: [57.8, 52.5], better: 'high', ref: { txt: 'Sin dato público comparable. Más días = más financiamiento de proveedores' } },
    { id: 'ccc', cat: 'Eficiencia operativa', nombre: 'Ciclo de conversión de efectivo', unit: 'dias', s: [14.2, 6.5], c: [-13.8, -9.8], better: 'low', ref: { criterio: true, txt: 'Criterio general: negativo es lo ideal (cobra antes de pagar)' } },
    { id: 'rdeuda', cat: 'Apalancamiento', nombre: 'Razón de deuda', unit: 'pct', s: [47.3, 45.7], c: [69.4, 67.4], better: 'low', ref: { criterio: true, txt: 'Criterio general: 40% a 60% se considera moderado' } },
    { id: 'rcap', cat: 'Apalancamiento', nombre: 'Razón de capital', unit: 'pct', s: [52.7, 54.3], c: [30.6, 32.6], better: 'high', ref: { txt: 'Complemento de la razón de deuda' } },
    { id: 'dtot', cat: 'Apalancamiento', nombre: 'Deuda total (con arrendamientos) / EBITDA', unit: 'x', s: [2.32, 1.99], c: [3.08, 2.32], better: 'low', ref: { criterio: true, txt: 'Criterio general: menos de 3.0x se considera cómodo' } },
    { id: 'dneta', cat: 'Apalancamiento', nombre: 'Deuda neta sin arrendamientos / EBITDA', unit: 'x', s: [0.69, 0.19], c: [-0.10, -0.28], better: 'low', ref: { txt: 'Chedraui guió -0.3x de deuda bancaria neta/EBITDA para 2025 (reporte de la empresa)' } }
  ],

  /* Grupos para la gráfica de barras lado a lado (misma unidad por grupo) */
  gruposBarras: [
    { id: 'ret', nombre: 'Crecimiento, márgenes y retornos (%)', unit: 'pct', ids: ['crec', 'mop', 'mebitda', 'mneto', 'roa', 'roe'] },
    { id: 'liq', nombre: 'Liquidez (veces)', unit: 'x', ids: ['circ', 'acida'] },
    { id: 'efi', nombre: 'Eficiencia operativa (días)', unit: 'dias', ids: ['dso', 'dio', 'dpo', 'ccc'] },
    { id: 'est', nombre: 'Estructura financiera (%)', unit: 'pct', ids: ['rdeuda', 'rcap'] },
    { id: 'dxe', nombre: 'Deuda / EBITDA (veces)', unit: 'x', ids: ['dtot', 'dneta'] }
  ],

  /* Ejes del radar: valor real / tope del eje. Referencia: Walmex (crecimiento y márgenes) y Damodaran (ROE). */
  radar: [
    { id: 'crec', tope: 8 }, { id: 'mop', tope: 8 }, { id: 'mebitda', tope: 12 }, { id: 'mneto', tope: 5 }, { id: 'roe', tope: 14 }
  ],

  comparacionNotas: {
    resultado2025: 'Resultado 2025: Chedraui mejor posicionada en 13 de 19 indicadores, Soriana en 6.',
    capitalTrabajo: 'El capital de trabajo (mdp) no se califica: no hay un "mejor" universal.',
    datos: 'Datos tomados de los archivos del equipo (descargados de Perplexity); difieren un poco de lo reportado (ej. utilidad neta 2025 de Soriana: 3,307 vs 3,334 reportada). Cifras en millones de pesos (mdp).'
  },

  /* ---------- CAPÍTULOS CUANTITATIVOS ----------
     Cada capítulo tiene vistas; cada vista = una gráfica + su "lectura". */
  capitulos: [
    {
      id: 'ingresos', head: { k: '03 · Hallazgos cuantitativos', t: 'Ingresos y utilidad.', s: 'Soriana vende menos y gana menos que hace dos años; Chedraui vende más cada año.' },
      vistas: [
        { id: 'ing', label: 'Ingresos', tipo: 'base', metrica: 'ingresos', unidad: 'mdp', anios: [2023, 2024, 2025],
          lectura: 'Chedraui +4.8% cerca de Walmex (+5.6%); Soriana -0.9% por menor consumo en tienda. En 2025 Chedraui vendió 295,314 mdp contra 173,980 de Soriana.' },
        { id: 'un', label: 'Utilidad neta', tipo: 'base', metrica: 'utilidadNeta', unidad: 'mdp', anios: [2023, 2024, 2025],
          lectura: 'La utilidad neta de Soriana bajó de 5,021 mdp (2023) a 3,307 mdp (2025). Matiz: en el 2T26 creció 46.8% (1,090 vs 743 mdp) principalmente por menor costo financiero, no por la operación; las ventas cayeron.' },
        { id: 'crec', label: 'Crecimiento', tipo: 'razones', ids: ['crec'], anios: [2024, 2025], conRef: true,
          lectura: 'Chedraui +4.8% cerca de Walmex; Soriana -0.9% por menor consumo en tienda.' }
      ]
    },
    {
      id: 'margenes', head: { k: '03 · Hallazgos cuantitativos', t: 'Márgenes.', s: 'Ambas por debajo de Walmex, pero Chedraui sostiene el paso.' },
      vistas: [
        { id: 'mar', label: 'Márgenes 2025', tipo: 'razones', ids: ['mop', 'mebitda', 'mneto'], anios: [2025], conRef: true,
          lectura: 'Chedraui 5.1% operativo y 8.4% EBITDA; Soriana 4.3% y 6.8% (bajando). Ambas por debajo de Walmex.' },
        { id: 'roe', label: 'Rentabilidad (ROE)', tipo: 'razones', ids: ['roa', 'roe'], anios: [2025], conRef: false,
          lectura: 'ROE Chedraui 12.5% (cerca del 12.9% del sector) vs Soriana 3.9%; parte de la brecha es porque Chedraui usa más deuda (activo/capital 3.1x vs 1.8x). Soriana tiene crédito mercantil e intangibles por 13.5% de su activo (Chedraui 5.8%).' }
      ]
    },
    {
      id: 'liquidez', head: { k: '03 · Hallazgos cuantitativos', t: 'Liquidez.', s: 'El balance es donde Soriana saca ventaja.' },
      vistas: [
        { id: 'liq', label: 'Razones de liquidez', tipo: 'razones', ids: ['circ', 'acida'], anios: [2024, 2025], criterio: { y: 1.0, txt: 'Criterio general: 1.0' },
          lectura: 'Soriana tiene más holgura (1.24); Chedraui 0.92 es normal en autoservicio porque cobra de contado y paga a crédito.' }
      ]
    },
    {
      id: 'eficiencia', head: { k: '03 · Hallazgos cuantitativos', t: 'Eficiencia operativa.', s: 'Aquí está la mayor brecha: el inventario.' },
      vistas: [
        { id: 'efi', label: 'Días del ciclo 2025', tipo: 'razones', ids: ['dso', 'dio', 'dpo', 'ccc'], anios: [2025], conRef: false,
          lectura: 'La mayor brecha es el inventario. Soriana 84 días (rota 4.3 veces) vs Chedraui 36 días (rota 10 veces). Ciclo de efectivo: Chedraui -10 días, Soriana +7 (mejoró desde 14).' }
      ]
    },
    {
      id: 'apalancamiento', head: { k: '03 · Hallazgos cuantitativos', t: 'Apalancamiento.', s: 'Dos formas distintas de financiarse.' },
      vistas: [
        { id: 'rd', label: 'Razón de deuda', tipo: 'razones', ids: ['rdeuda', 'rcap'], anios: [2024, 2025], conRef: false,
          lectura: 'Chedraui 67% de pasivos sobre activos, con ~49,558 mdp en arrendamientos; Soriana 46%.' },
        { id: 'dxe', label: 'Deuda / EBITDA', tipo: 'razones', ids: ['dtot', 'dneta'], anios: [2024, 2025], conRef: false, criterio: { y: 3, txt: 'Criterio general: <3x' },
          lectura: 'Sin arrendamientos, Chedraui tiene más caja que deuda (-0.3x, igual que su guía 2025). Soriana está en +0.2x.' }
      ]
    }
  ],

  /* ---------- REFERENCIAS DE INDUSTRIA ---------- */
  referencias: {
    walmex: { crec: 5.6, mbruto: 24.0, mop: 7.8, mebitda: 10.2, mneto: 4.9 },
    damodaran: { mneto: 1.32, moAntesImp: 2.29, roe: 12.9, ctoi: 1.9, roic: 7 }
  },

  /* ---------- DASHBOARD ----------
     ref.tipo: 'valor' (fuente) | 'rango' (criterio) | 'umbral' (criterio) | 'par' (la otra empresa)
     buena: cuando valor ≥ ref es bueno ('alto') o cuando es menor ('bajo') */
  kpis: [
    { id: 'crec', nombre: 'Crecimiento de ingresos', unit: 'pct', dec: 1, buena: 'alto', min: -5, max: 10, ref: { tipo: 'valor', v: 5.6, txt: 'Walmex 2025' } },
    { id: 'mebitda', nombre: 'Margen EBITDA', unit: 'pct', dec: 1, buena: 'alto', min: 0, max: 12, ref: { tipo: 'valor', v: 10.2, txt: 'Walmex 2025' } },
    { id: 'mneto', nombre: 'Margen neto', unit: 'pct', dec: 2, buena: 'alto', min: 0, max: 6, ref: { tipo: 'valor', v: 4.9, txt: 'Walmex 2025' } },
    { id: 'roe', nombre: 'ROE', unit: 'pct', dec: 1, buena: 'alto', min: 0, max: 16, ref: { tipo: 'valor', v: 12.9, txt: 'Damodaran, EE.UU.' } },
    { id: 'circ', nombre: 'Razón circulante', unit: 'x', dec: 2, buena: 'alto', min: 0, max: 2.5, ref: { tipo: 'rango', lo: 1.0, hi: 2.0, txt: 'Criterio general: 1.0 a 2.0' } },
    { id: 'dio', nombre: 'Días de inventario', unit: 'dias', dec: 1, buena: 'bajo', min: 0, max: 100, ref: { tipo: 'par', txt: 'La otra empresa (sin dato sectorial)' } },
    { id: 'ccc', nombre: 'Ciclo de conversión de efectivo', unit: 'dias', dec: 1, buena: 'bajo', min: -20, max: 30, ref: { tipo: 'umbral', v: 0, txt: 'Criterio general: negativo es ideal' } },
    { id: 'rdeuda', nombre: 'Razón de deuda', unit: 'pct', dec: 1, buena: 'bajo', min: 20, max: 80, ref: { tipo: 'rango', lo: 40, hi: 60, txt: 'Criterio general: 40% a 60%' } },
    { id: 'dneta', nombre: 'Deuda neta / EBITDA', unit: 'x', dec: 2, buena: 'bajo', min: -1, max: 4, ref: { tipo: 'umbral', v: 3, txt: 'Criterio general: menos de 3x' } }
  ],

  /* ---------- PROPUESTA ---------- */
  propuesta: {
    bien: [
      { t: 'Balance sólido', d: 'Razón circulante 1.24, 54% del activo con capital propio, deuda neta sin arrendamientos de 0.2x EBITDA. Da margen para invertir sin presión financiera.' },
      { t: 'Marca propia "Descubre lo Mejor"', d: 'Seguir ampliando surtido (+1,000 SKUs en 2026) para competir en valor sin sacrificar margen.' },
      { t: 'Omnicanalidad', d: 'El digital crece 5 veces más que lo físico; seguir escalando Súper en tu casa y recolección en tienda.' },
      { t: 'Optimización de red', d: 'De 820 a 812 tiendas, con 20 cierres y 60 tiendas reducidas; mantener la disciplina por rentabilidad por metro cuadrado.' },
      { t: 'Ciclo de efectivo', d: 'Pasó de 14 a 7 días; cuidar la relación con proveedores que lo sostiene.' }
    ],
    mejora: [
      { t: 'Rotación de inventario', d: '84 vs 36 días de Chedraui: cada día menos libera ~383 mdp (costo de ventas 139,691 / 365).', acciones: ['Surtido localizado por formato', 'Reabasto automatizado con analítica', 'Depurar SKUs de baja rotación', 'Cross-docking'] },
      { t: 'Margen EBITDA', d: '6.8% vs 8.4% de Chedraui y 10.2% de Walmex.', acciones: ['Productividad de tienda', 'Control de costos fijos', 'Mayor mezcla de marca propia', 'Retail media'] },
      { t: 'Volver a crecer', d: 'Ventas -0.9% en 2025 y a la baja en 2026.', acciones: ['Formatos de proximidad (Express)', 'Promociones personalizadas con datos de lealtad', 'City Club'] },
      { t: 'ROE de 3.9% vs 12.5%', d: 'Evaluar un uso más eficiente del capital (reinversión en proyectos de mayor retorno) y revisar el peso de crédito mercantil e intangibles.', acciones: [] },
      { t: 'Calidad de la utilidad', d: 'El alza de 46.8% del 2T26 vino del menor costo financiero; el reto es mejorar la operación.', acciones: [] }
    ],
    roadmap: [
      { rango: '0–6 meses', titulo: 'Inventario y surtido', items: ['Surtido localizado por formato', 'Depurar SKUs de baja rotación', 'Reabasto automatizado con analítica'] },
      { rango: '6–12 meses', titulo: 'Proximidad y retail media', items: ['Escalar formatos de proximidad (Express)', 'Promociones personalizadas con datos de lealtad', 'Retail media como nueva fuente de ingresos'] },
      { rango: '12–24 meses', titulo: 'Automatización logística y metas de KPIs', items: ['Cross-docking y automatización logística', 'Medir avance contra las metas de KPI', 'Revisar uso del capital y peso de intangibles'] }
    ],
    /* Metas ILUSTRATIVAS del equipo (editables, no son pronósticos) */
    kpis: [
      { nombre: 'Días de inventario', actual: 84, meta: 70, unit: 'dias', dec: 0, mejora: 'bajo' },
      { nombre: 'Margen EBITDA', actual: 6.8, meta: 7.5, unit: 'pct', dec: 1, mejora: 'alto' },
      { nombre: 'Crecimiento de ventas', actual: -0.9, meta: 2, unit: 'pct', dec: 1, mejora: 'alto' },
      { nombre: 'ROE', actual: 3.9, meta: 6, unit: 'pct', dec: 1, mejora: 'alto' },
      { nombre: 'Ciclo de efectivo', actual: 7, meta: 0, unit: 'dias', dec: 0, mejora: 'bajo' }
    ],
    metasNota: 'Metas ilustrativas del equipo (editables en data.js); no son pronósticos.',
    simulador: {
      ingresos: 173980, costoVentas: 139691, ebitda: 11894, diasActual: 84.4, margenActual: 6.84,
      sliders: {
        dias:   { min: 40, max: 90, paso: 0.1, meta: 70 },
        margen: { min: 5, max: 10.2, paso: 0.01, meta: 7.5 },
        crec:   { min: -5, max: 8, paso: 0.1, meta: 2 }
      },
      nota: 'Ejercicio ilustrativo. Fórmulas: efectivo liberado = (días actuales − días meta) × costo de ventas / 365; EBITDA adicional = ingresos proyectados × margen meta − EBITDA actual. Simplificación: el costo de ventas se mantiene en 139,691 mdp.'
    }
  },

  /* ---------- Textos de interfaz (pestañas, juego) ---------- */
  ui: {
    modeloTabs: [{ id: 'canvas', label: 'Modelo Canvas' }, { id: 'tendencias', label: 'Cinco tendencias' }],
    dueloTabs: [{ id: 'tabla', label: 'Tabla' }, { id: 'radar', label: 'Radar' }, { id: 'barras', label: 'Barras' }, { id: 'cara', label: 'Cara a cara' }, { id: 'juego', label: '¿Adivinas?' }],
    propTabs: [{ id: 'bien', label: 'Seguir haciendo bien' }, { id: 'mejora', label: 'Oportunidades' }, { id: 'ruta', label: 'Ruta a 24 meses' }],
    juego: { ids: ['crec', 'mebitda', 'dio', 'roe', 'circ', 'rdeuda'], anio: 2025 }
  },

  /* ---------- CIERRE ---------- */
  cierre: {
    conclusion: [
      'Soriana tiene el balance más fuerte: razón circulante de 1.24, 54% de capital propio y casi nada de deuda sin arrendamientos (0.2x EBITDA).',
      'Chedraui gana en la operación: crece +4.8%, rota su inventario 10 veces al año y su ciclo de efectivo es negativo (−10 días).',
      'La oportunidad de Soriana: usar esa solidez para mover el inventario más rápido y volver a crecer.'
    ],
    lema: 'Un balance fuerte es el punto de partida; la operación, la tarea pendiente.',
    nota: 'Datos tomados de los archivos del equipo (descargados de Perplexity); difieren un poco de lo reportado (ej. utilidad neta 2025 de Soriana: 3,307 vs 3,334 reportada). El margen bruto de los archivos no coincide con el reportado (Soriana reporta ~24%). Donde dice "criterio general" no hay una fuente específica: son rangos de uso común en análisis financiero.',
    fuentes: [
      { t: 'El Financiero (5 feb 2026). Impuestos y aumento de precios afectan las ventas de comercios en México.', u: 'https://www.elfinanciero.com.mx/empresas/2026/02/05/impuestos-y-aumento-de-precios-afectan-las-ventas-de-comercios-en-mexico/' },
      { t: 'El Financiero (5 feb 2026). Proximidad y precio, la nueva batalla del retail.', u: 'https://www.elfinanciero.com.mx/bloomberg-businessweek/2026/02/05/proximidad-y-precio-la-nueva-batalla-del-retail/' },
      { t: 'El Financiero (23 oct 2026). Lluvias en México e inflación asfixian ventas de tiendas en el 3T 2026.', u: 'https://www.elfinanciero.com.mx/empresas/2026/10/23/lluvias-en-mexico-e-inflacion-asfixian-ventas-de-tiendas-en-el-tercer-trimestre-de-2026/' },
      { t: 'Organización Soriana (2026). Primer informe trimestral 2026.', u: 'https://www.organizacionsoriana.com/pdf/reportes/2026/1T_2026_Espanol_InfDirVfinal.pdf' },
      { t: 'Organización Soriana (2026). Segundo informe trimestral 2026.', u: 'https://www.organizacionsoriana.com/pdf/reportes/2026/2T_2026_Espanol_InfDirVfinal.pdf' },
      { t: 'Organización Soriana (2025). Informe anual 2025.', u: 'https://www.organizacionsoriana.com/pdf/Infome%20Anual/2025/SORIANA_2025_IA-esp_vf.pdf' },
      { t: 'Expansión (25 jun 2026). Soriana cambió el calendario de Julio Regalado.', u: 'https://expansion.mx/empresas/2026/06/25/soriana-cambio-calendario-julio-regalado-mundial-2026' },
      { t: 'Merca2.0 (22 may 2026). Soriana lanza estrategia de marcas propias.', u: 'https://www.merca20.com/soriana-lanza-estrategia-de-marcas-propias-con-mas-de-2500-productos-el-reto-ya-no-es-vender-barato/' },
      { t: 'Retailers.mx (12 oct 2026). El despertar de Soriana llega con su retail media.', u: 'https://retailers.mx/el-despertar-de-soriana-llega-con-su-retail-media/' },
      { t: 'Damodaran / NYU Stern (ene-2026). Márgenes, ROE y ROC por sector (EE.UU.).', u: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/psdata.html' },
      { t: 'Walmex (B×+). Resultados 4T25 y año 2025.', u: 'https://estrategia.vepormas.com/wp-content/uploads/2026/02/Trimestral-WALMEX-4T25.pdf' },
      { t: 'Chedraui (B×+). Resultados 4T25 y año 2025.', u: 'https://estrategia.vepormas.com/wp-content/uploads/2026/02/Trimestral-CHDRAUI-4T25.pdf' },
      { t: 'Chedraui, guía de resultados 2025 (BMV).', u: 'https://bmv.com.mx/docs-pub/eventemi/eventemi_1433922_1.pdf' }
    ]
  }
};
