#include <emscripten/emscripten.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  uint8_t *buffer;
  size_t length;
} TypedArray;

EMSCRIPTEN_KEEPALIVE
TypedArray *countColors(TypedArray array) {
  size_t uint32Length = array.length / 4;
  uint32_t *uint32Data = (uint32_t *)array.buffer;
  TypedArray *colorCount = (TypedArray *)malloc(sizeof(TypedArray));
  if (colorCount == NULL) {
    return NULL;
  }
  colorCount->buffer = (uint8_t *)calloc(16777216, sizeof(uint32_t));
  if (colorCount->buffer == NULL) {
    free(colorCount);
    return NULL;
  }
  colorCount->length = 16777216;
  uint32_t *uint32Buffer = (uint32_t *)colorCount->buffer;
  for (size_t i = 0; i < uint32Length; i++) {
    uint32_t rgba = uint32Data[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    uint32Buffer[rgb]++;
  }
  return colorCount;
}
