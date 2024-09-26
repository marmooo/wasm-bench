export function countColors(uint8Data) {
  const uint32Data = new Uint32Array(uint8Data.buffer);
  const colorCount = new Uint32Array(16777216);
  for (let i = 0; i < uint32Data.length; i++) {
    const rgba = uint32Data[i];
    const rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}

export function getColors(uint8Data) {
  const colorCount = countColors(uint8Data);
  const colors = [];
  for (let rgb = 0; rgb < colorCount.length; rgb++) {
    const uses = colorCount[rgb];
    if (uses > 0) {
      const b = (rgb >> 16) & 0xFF;
      const g = (rgb >> 8) & 0xFF;
      const r = rgb & 0xFF;
      colors.push([r, g, b, uses]);
    }
  }
  return colors;
}
