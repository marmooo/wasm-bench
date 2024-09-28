use wasm_bindgen::prelude::*;

#[wasm_bindgen]
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
