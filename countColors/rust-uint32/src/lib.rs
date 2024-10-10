use js_sys::Uint32Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn count_colors(uint8_data: &[u8]) -> Uint32Array {
    let length = uint8_data.len() / 4;
    let uint32_data =
        unsafe { std::slice::from_raw_parts(uint8_data.as_ptr() as *const u32, length) };
    let mut color_count = vec![0u32; 16777216];
    for &rgba in uint32_data {
        let rgb = rgba & 0xFFFFFF;
        color_count[rgb as usize] += 1;
    }
    unsafe { Uint32Array::view(&color_count) }
}
