use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn count_colors(uint8_data: &[u8]) -> *mut u32 {
    let mut color_count = Box::new([0u32; 16777216]);
    let uint32_data = unsafe {
        std::slice::from_raw_parts(uint8_data.as_ptr() as *const u32, uint8_data.len() / 4)
    };
    for &rgba in uint32_data {
        let rgb = rgba & 0xFFFFFF;
        color_count[rgb as usize] += 1;
    }
    Box::into_raw(color_count) as *mut u32
}

#[wasm_bindgen]
pub fn free(ptr: *mut u32, size: usize) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        let _ = Box::from_raw(std::slice::from_raw_parts_mut(ptr, size));
    }
}
