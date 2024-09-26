#include <cstdint>
#include <cstdlib>
#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
uint32_t *countColors(uint8_t *data, size_t length) {
  uint32_t *colorCount = (uint32_t *)std::calloc(16777216, sizeof(uint32_t));
  for (size_t i = 0; i < length / 4; i++) {
    uint32_t rgba = reinterpret_cast<uint32_t *>(data)[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}
}
