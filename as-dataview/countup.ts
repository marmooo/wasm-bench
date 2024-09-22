export function countColors(uint8Data: Uint8Array): Uint32Array {
  const colorCount = new Uint32Array(16777216);
  const dataView = new DataView(uint8Data.buffer);
  for (let i = 0; i < uint8Data.length; i += 4) {
    const rgba = dataView.getUint32(i, true);
    const rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}
