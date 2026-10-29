# Soriana. Diagnóstico y estrategia.

Sitio de presentación (estático, sin build) sobre Organización Soriana (BMV: SORIANAB) frente a Chedraui.

## Estructura
- `index.html` — esqueleto de las secciones
- `css/styles.css` — estilos (claro/oscuro, responsive, movimiento reducido)
- `js/data.js` — **todos los datos y textos** (edita aquí)
- `js/app.js` — interacción, gráficas (Chart.js 4.4.1 vía jsDelivr) y modo presentación
- `assets/` — logos e imágenes opcionales

## Cómo editar
- **Autores, materia, profesor:** `SITE.meta` (materia, profesor e institución quedan vacíos; si los llenas, aparecen solos) en `js/data.js`.
- **Cifras y razones:** `SITE.base` (estados financieros) y `SITE.razones` (tabla de 20 razones, `[2024, 2025]`).
- **Metas del simulador y de la tabla de KPI:** `SITE.propuesta`.
- **Logos:** copia el archivo a `assets/` y escribe su ruta en `SITE.logos[i].archivo` (ej. `'assets/soriana.svg'`). Vacío o con error de carga, se muestra el nombre en texto.

## Modo presentación
Botón **Presentar** o tecla **P**. Flechas / espacio / clic para avanzar, **Shift+espacio** retrocede, **F** pantalla completa, **Esc** sale.

## Correr local
```
python3 -m http.server 8000
```
y abrir http://localhost:8000

## Nota sobre los datos
Datos tomados de los archivos del equipo (descargados de Perplexity); difieren un poco de lo reportado
(ej. utilidad neta 2025 de Soriana: 3,307 vs 3,334 reportada). El margen bruto de los archivos no coincide con el
reportado (Soriana ~24%); conviene comparar en margen operativo y EBITDA. "Criterio general" = regla práctica sin fuente específica.
