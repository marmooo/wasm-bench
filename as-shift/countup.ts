export function countColors(uint8Data: Uint8Array): Uint32Array {
  const colorCount = new Uint32Array(16777216);
  for (let i = 0; i < uint8Data.length; i += 4) {
    // const rgb = (uint8Data[i + 2] << 16) | (uint8Data[i + 1] << 8) | uint8Data[i];
    const rgb: u32 = (u32(uint8Data[i + 2]) << 16) |
      (u32(uint8Data[i + 1]) << 8) | u32(uint8Data[i]);
    colorCount[rgb]++;
  }
  return colorCount;
}
