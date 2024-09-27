// ----------------------------------------------------------------------

export const stylesMode = {
  light: '[data-mui-color-scheme="light"] &',
  dark: '[data-mui-color-scheme="dark"] &',
};

export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
};

/**
 * Set font family
 */
export function setFont(fontName: string) {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`;
}

/**
 * Converts rem to px
 */
export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
}

/**
 * Converts px to rem
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

/**
 * Responsive font sizes
 */
export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  };
}

/**
 * Converts a hex color to RGB channels
 */
export function hexToRgbChannel(hex: string) {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
}

/**
 * Converts a hex color to RGB channels
 */
export function createPaletteChannel(hexPalette: Record<string, string>) {
  const channelPalette: Record<string, string> = {};

  Object.entries(hexPalette).forEach(([key, value]) => {
    channelPalette[`${key}Channel`] = hexToRgbChannel(value);
  });

  return { ...hexPalette, ...channelPalette };
}

/**
 * Color with alpha channel
 */

// Función auxiliar para convertir colores hexadecimales a RGB en TypeScript
function hexToRgb(hex: string): string {
  // Elimina el símbolo '#' si está presente
  hex = hex.replace(/^#/, '');

  // Convierte colores hexadecimales cortos (#fff) a formato largo (#ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map((x) => x + x).join('');
  }

  // Asegúrate de que el valor sea un número hexadecimal
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`; // Devuelve una cadena en formato RGB
}

// Función para aplicar el canal alfa a un color en formato válido
export function varAlpha(color: string, opacity: number = 1): string {
  // Convertimos "145 158 171" o "24, 119, 242" a formato "rgb(145, 158, 171)" si es necesario
  color = convertRgbString(color);

  // Si el color es un formato hexadecimal, lo convertimos a RGB
  if (color.startsWith('#')) {
    color = hexToRgb(color);
  }

  // Si el color no incluye el prefijo 'rgb' o 'rgba', lo convertimos
  if (!color.startsWith('rgb') && !color.startsWith('rgba')) {
    color = `rgb(${color})`;
  }

  // Comprobamos si el formato es compatible
  const unsupported = !(
    color.startsWith('rgb') ||
    color.startsWith('rgba') ||
    color.includes('var') ||
    color.includes('Channel')
  );

  if (unsupported) {
    throw new Error(
      `[Alpha]: Unsupported color format "${color}". 
       Supported formats are:
       - RGB channels: "0 184 217".
       - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
       Supported formats also include:
       - Hex: "#00B8D9".
       - RGB: "rgb(0, 184, 217)".
       - RGBA: "rgba(0, 184, 217, 1)".
       `
    );
  }

  // Devolvemos el color en formato `rgba`
  return `rgba(${color.replace(/rgb(a?)\(/, '').replace(')', '')}, ${opacity})`;
}

// Convertir string de formato RGB sin comas al formato correcto
export function convertRgbString(color: string): string {
  // Verificar si el formato ya está en rgb/rgba, si es así devolverlo sin cambios
  if (color.startsWith('rgb') || color.startsWith('rgba')) {
    return color;
  }

  // Si no tiene 'rgb', pero está en formato "24, 119, 242", devolvemos 'rgb(24, 119, 242)'
  const rgbValues = color.split(',');
  if (rgbValues.length === 3) {
    return `rgb(${rgbValues.join(',')})`;
  }

  // Si el formato es incorrecto, devolvemos el color tal cual
  return color;
}



/*export function varAlpha(color: string, opacity = 1) {
    const unsupported = !(
      color.includes('var') || 
      color.includes('Channel') || 
      color.startsWith('rgb') || 
      color.startsWith('rgba') || 
      color.startsWith('#')
    );
  
    if (unsupported) {
      throw new Error(
        `[Alpha]: Unsupported color format "${color}". 
         Supported formats are:
         - RGB channels: "0 184 217".
         - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
         Supported formats also include:
         - Hex: "#00B8D9".
         - RGB: "rgb(0, 184, 217)".
         - RGBA: "rgba(0, 184, 217, 1)".
         `
      );
    }
  
    return `rgba(${color} / ${opacity})`;
  }
*/
