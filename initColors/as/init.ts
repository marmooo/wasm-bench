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
}

class QuantizerImpl {
  image: Uint8Array;
  width: usize;
  height: usize;
  colors: ColorStat[] = [];

  constructor(image: Uint8Array, width: usize, height: usize) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.colors = this.getColors(image);
  }

  countColors(uint8Data: Uint8Array): Uint32Array {
    const uint32Data = Uint32Array.wrap(uint8Data.buffer);
    const colorCount = new Uint32Array(16777216);
    for (let i = 0; i < uint32Data.length; i++) {
      const rgba = uint32Data[i];
      const rgb = rgba & 0xFFFFFF;
      colorCount[rgb]++;
    }
    return colorCount;
  }

  getColors(uint8Data: Uint8Array): ColorStat[] {
    const colorCount = this.countColors(uint8Data);
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
    return colors;
  }
}

export function Quantizer(image: Uint8Array, width: number, height: number): QuantizerImpl {
  return new QuantizerImpl(image, usize(width), usize(height));
}

export function getBitCount(quantizer: QuantizerImpl): number {
  const colors = quantizer.colors;
  let sum = 0;
  for (let i = 0; i < colors.length; i++) {
    sum += colors[i].total;
  }
  return sum;
}

export function getColorCount(quantizer: QuantizerImpl): number {
  return quantizer.colors.length;
}
