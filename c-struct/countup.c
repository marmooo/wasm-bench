#include <emscripten/emscripten.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  uint8_t *data;
  size_t length;
  uint8_t type;
} Uint8Array;

typedef struct {
  uint32_t *data;
  size_t length;
  uint8_t type;
} Uint32Array;

#define TYPE_Error 0
#define TYPE_Uint8Array 1
#define TYPE_Uint8ClampedArray 2
#define TYPE_Int8Array 3
#define TYPE_Uint16Array 4
#define TYPE_Int16Array 5
#define TYPE_Uint32Array 6
#define TYPE_Int32Array 7
#define TYPE_Float32Array 8
#define TYPE_Float64Array 9
#define TYPE_BigUint64Array 10
#define TYPE_BigInt64Array 11

EMSCRIPTEN_KEEPALIVE
Uint32Array *countColors(Uint8Array array) {
  size_t uint32Length = array.length / 4;
  uint32_t *uint32Data = (uint32_t *)array.data;
  Uint32Array *colorCount = (Uint32Array *)malloc(sizeof(Uint32Array));
  if (colorCount == NULL) {
    return NULL;
  }
  colorCount->data = (uint32_t *)calloc(16777216, sizeof(uint32_t));
  if (colorCount->data == NULL) {
    free(colorCount);
    return NULL;
  }
  colorCount->length = 16777216;
  colorCount->type = TYPE_Uint32Array;
  for (size_t i = 0; i < uint32Length; i++) {
    uint32_t rgba = uint32Data[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    colorCount->data[rgb]++;
  }
  return colorCount;
}
