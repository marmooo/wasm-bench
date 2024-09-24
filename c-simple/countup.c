#include <emscripten/emscripten.h>
#include <stdint.h>

EMSCRIPTEN_KEEPALIVE
uint32_t *countColors(uint8_t *uint8Data, size_t length) {
  size_t uint32Length = length / 4;
  uint32_t *uint32Data = (uint32_t *)uint8Data;
  uint32_t *colorCount = (uint32_t *)calloc(16777216, sizeof(uint32_t));
  if (colorCount == NULL) {
    return NULL;
  }
  for (size_t i = 0; i < uint32Length; i++) {
    uint32_t rgba = uint32Data[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}
