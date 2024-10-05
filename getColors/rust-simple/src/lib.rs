use js_sys::Object;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ColorStat {
    r: u8,
    g: u8,
    b: u8,
    total: u32,
}

#[wasm_bindgen]
impl ColorStat {
    #[wasm_bindgen(constructor)]
    pub fn new(r: u8, g: u8, b: u8, total: u32) -> ColorStat {
        ColorStat { r, g, b, total }
    }

    #[wasm_bindgen(getter)]
    pub fn r(&self) -> u8 {
        self.r
    }

    #[wasm_bindgen(getter)]
    pub fn g(&self) -> u8 {
        self.g
    }

    #[wasm_bindgen(getter)]
    pub fn b(&self) -> u8 {
        self.b
    }

    #[wasm_bindgen(getter)]
    pub fn total(&self) -> u32 {
        self.total
    }

    #[wasm_bindgen]
    pub fn to_js_value(&self) -> JsValue {
        let obj = Object::new();
        js_sys::Reflect::set(&obj, &JsValue::from("r"), &JsValue::from(self.r)).unwrap();
        js_sys::Reflect::set(&obj, &JsValue::from("g"), &JsValue::from(self.g)).unwrap();
        js_sys::Reflect::set(&obj, &JsValue::from("b"), &JsValue::from(self.b)).unwrap();
        js_sys::Reflect::set(&obj, &JsValue::from("total"), &JsValue::from(self.total)).unwrap();
        JsValue::from(obj)
    }
}

pub fn count_colors(uint8_data: &[u8]) -> Vec<u32> {
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

#[wasm_bindgen]
pub fn get_colors(uint8_data: &[u8]) -> JsValue {
    let color_count = count_colors(uint8_data);
    let mut colors = Vec::new();
    for (rgb, &uses) in color_count.iter().enumerate() {
        if uses > 0 {
            let r = (rgb & 0xFF) as u8;
            let g = ((rgb >> 8) & 0xFF) as u8;
            let b = ((rgb >> 16) & 0xFF) as u8;
            let color = ColorStat::new(r, g, b, uses);
            colors.push(color); // Rust 側の Vec に保存
        }
    }
    let js_array = js_sys::Array::new_with_length(colors.len() as u32);
    for (i, color) in colors.into_iter().enumerate() {
        js_array.set(i as u32, color.to_js_value());
    }
    js_array.into()
}
