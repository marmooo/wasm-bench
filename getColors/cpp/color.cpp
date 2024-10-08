#include <vector>
#include <array>
#include <cstdint>
#include <emscripten/bind.h>
#include <emscripten/val.h>
using namespace emscripten;
using namespace std;

vector<uint32_t> countColors(const val &uint8Data) {
  val uint32Data = val::global("Uint32Array").new_(uint8Data["buffer"]);
  auto vec = emscripten::convertJSArrayToNumberVector<uint32_t>(uint32Data);
  vector<uint32_t> colorCount(16777216, 0);
  for (size_t i = 0; i < vec.size(); i++) {
    uint32_t rgba = vec[i];
    uint32_t rgb = rgba & 0xFFFFFF;
    colorCount[rgb]++;
  }
  return colorCount;
}

/* // too slow */
/* emscripten::val getColors(const val &uint8Data) { */
/*   vector<uint32_t> colorCount = countColors(uint8Data); */
/*   std::vector<val> colors; */
/*   for (uint32_t rgb = 0; rgb < colorCount.size(); rgb++) { */
/*     uint32_t uses = colorCount[rgb]; */
/*     if (uses > 0) { */
/*       uint8_t b = (rgb >> 16) & 0xFF; */
/*       uint8_t g = (rgb >> 8) & 0xFF; */
/*       uint8_t r = rgb & 0xFF; */
/*       std::vector<val> color = { val(r), val(g), val(b), val(uses) }; */
/*       colors.push_back(val::array(color)); */
/*     } */
/*   } */
/*   return val::array(colors); */
/* } */

emscripten::val getColors(const val &uint8Data) {
  vector<uint32_t> colorCount = countColors(uint8Data);
  vector<vector<uint32_t>> colors;
  for (uint32_t rgb = 0; rgb < colorCount.size(); rgb++) {
    uint32_t uses = colorCount[rgb];
    if (uses > 0) {
      uint8_t b = (rgb >> 16) & 0xFF;
      uint8_t g = (rgb >> 8) & 0xFF;
      uint8_t r = rgb & 0xFF;
      colors.push_back({r, g, b, uses});
    }
  }
  std::vector<val> result;
  result.reserve(colors.size());
  for (const auto& color : colors) {
    result.push_back(val::array(color));
  }
  return val::array(result);
}

EMSCRIPTEN_BINDINGS() { emscripten::function("getColors", &getColors); }
