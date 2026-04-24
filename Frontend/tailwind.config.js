/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // PALETA AJUSTADA - SIN TONOS ROSADOS, SOLO AZUL Y BEIGE
        'background': '#FEFCFB',      // Casi blanco (fondo principal)
        'surface': '#F5F3F0',         // Beige muy sutil (superficies)
        'surface-elevated': '#FFFFFF', // Blanco puro (elementos elevados)
        'primary': '#0f2c4a',         // Azul marino oscuro (elementos principales)
        'vibrant-blue': '#2563eb',    // Azul más vibrante
        'accent': '#F29E38',          // Naranja vibrante (acentos únicos)
        'text-main': '#464E59',       // Gris azulado oscuro (texto principal)
        'text-muted': '#9298A6',      // Gris azulado medio (texto secundario)
        'stroke': '#BFAEA4',          // Beige medio (bordes y detalles)
        'detail': '#D9CBBF'           // Beige claro (detalles decorativos)
      },
      // ESTA SECCIÓN ES CRUCIAL:
      // Le dice a Tailwind que existen las clases font-bodoni y font-miles.
      fontFamily: {
        // Mapear utilidades a las familias reales instaladas
        // Prioriza "Bodoni Std" y cae a "Bodoni" si no está
        'bodoni': ['Bodoni Std', 'Bodoni', 'serif'],
        'miles': ['Miles Light', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
