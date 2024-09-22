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
