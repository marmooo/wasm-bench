class ColorStat {
  r: u8;
  g: u8;
  b: u8;
  total: u32;

  constructor(r: u8, g: u8, b: u8, total: u32) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.total = total;
  }

  toArray(): number[] {
    return [this.r, this.g, this.b, this.total];
  }
}

export function countColors(uint8Data: Uint8Array): Uint32Array {
  const uint32Data = Uint32Array.wrap(uint8Data.buffer);
  const colorCount = new Uint32Array(16777216);
  for (let i = 0; i < uint32Data.length; i++) {
    const rgba = uint32Data[i];
    const rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}

export function getColors(uint8Data: Uint8Array): number[][] {
  const colorCount = countColors(uint8Data);
  const colors: ColorStat[] = [];
  for (let rgb = 0; rgb < colorCount.length; rgb++) {
    const uses = colorCount[rgb];
    if (uses > 0) {
      const b = u8((rgb >> 16) & 0xFF);
      const g = u8((rgb >> 8) & 0xFF);
      const r = u8(rgb & 0xFF);
      colors.push(new ColorStat(r, g, b, uses));
    }
  }
  const result = new Array<number[]>(colors.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = colors[i].toArray();
  }
  return result;
}
