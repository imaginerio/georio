const convert = require('color-convert');

/**
 * MakeSwatch Service
 *
 */
const makeSwatchService = (styles) => {
  let color;
  if (Array.isArray(styles)) {
    styles.forEach((s) => {
      const { style } = s.dataValues;
      if (style.type === 'fill') {
        color = style.paint['fill-color'];
      } else if (style.type === 'line') {
        color = style.paint['line-color'];
      }

      if (Array.isArray(color)) {
        [,,,, color] = color;
      }
      if (color && color.match(/^hsl/)) {
        color = color.match(/\d+/gm);
        color = `#${convert.hsl.hex(color).toLowerCase()}`;
      }
    });
  }
  return color;
};

module.exports = makeSwatchService;
