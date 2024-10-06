use wasm_bindgen::prelude::*;

pub struct ColorStat {
    #[allow(dead_code)]
    r: u8,
    #[allow(dead_code)]
    g: u8,
    #[allow(dead_code)]
    b: u8,
    total: u32,
}

#[wasm_bindgen]
pub struct Quantizer {
    #[allow(dead_code)]
    image: Vec<u8>,
    #[allow(dead_code)]
    width: usize,
    #[allow(dead_code)]
    height: usize,
    colors: Vec<ColorStat>,
}

#[wasm_bindgen]
impl Quantizer {
    #[wasm_bindgen(constructor)]
    pub fn new(image: Vec<u8>, width: usize, height: usize) -> Quantizer {
        let colors = Quantizer::get_colors(&image);
        Quantizer { image, width, height, colors }
    }

    fn count_colors(uint8_data: &[u8]) -> Vec<u32> {
        let uint32_data = unsafe {
            std::slice::from_raw_parts(uint8_data.as_ptr() as *const u32, uint8_data.len() / 4)
        };
        let mut color_count = vec![0u32; 16777216];
        for &rgba in uint32_data {
            let rgb = rgba & 0xFFFFFF;
            color_count[rgb as usize] += 1;
        }
        color_count
    }

    fn get_colors(uint8_data: &[u8]) -> Vec<ColorStat> {
        let color_count = Quantizer::count_colors(uint8_data);
        let mut colors = Vec::new();
        for (rgb, &uses) in color_count.iter().enumerate() {
            if uses > 0 {
                let r = (rgb & 0xFF) as u8;
                let g = ((rgb >> 8) & 0xFF) as u8;
                let b = ((rgb >> 16) & 0xFF) as u8;
                let color = ColorStat {
                    r,
                    g,
                    b,
                    total: uses,
                };
                colors.push(color);
            }
        }
        colors
    }

    #[wasm_bindgen]
    pub fn get_bit_count(&self) -> u32 {
        self.colors.iter().map(|color| color.total).sum()
    }

    #[wasm_bindgen]
    pub fn get_color_count(&self) -> usize {
        self.colors.len()
    }
}
