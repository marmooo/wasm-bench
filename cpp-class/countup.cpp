#include <emscripten/bind.h>
#include <vector>
using namespace emscripten;
using namespace std;

emscripten::val countColors(const val &uint8Data) {
  val uint32Data = val::global("Uint32Array").new_(uint8Data["buffer"]);
  auto vec = emscripten::convertJSArrayToNumberVector<uint32_t>(uint32Data);
  vector<uint32_t> colorCount(16777216, 0);
  for (size_t i = 0; i < vec.size(); i++) {
    uint32_t rgba = vec[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return emscripten::val(
      emscripten::typed_memory_view(colorCount.size(), colorCount.data()));
}

EMSCRIPTEN_BINDINGS() { emscripten::function("countColors", &countColors); }
