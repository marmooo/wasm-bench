#include <cstdint>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <vector>

using namespace emscripten;
using namespace std;

struct ColorStat {
  uint8_t r, g, b;
  uint32_t total;
};

class Quantizer {
private:
  val image;
  size_t width, height;
  std::vector<ColorStat> colors;

public:
  Quantizer(const val image, size_t width, size_t height)
      : image(image), width(width), height(height) {
    colors = getColors();
  }

  std::vector<uint32_t> countColors() {
    val uint32Data = val::global("Uint32Array").new_(image["buffer"]);
    auto vec = emscripten::convertJSArrayToNumberVector<uint32_t>(uint32Data);
    vector<uint32_t> colorCount(16777216, 0);
    for (size_t i = 0; i < vec.size(); i++) {
      uint32_t rgba = vec[i];
      uint32_t rgb = rgba & 0xFFFFFF;
      colorCount[rgb]++;
    }
    return colorCount;
  }

  std::vector<ColorStat> getColors() {
    std::vector<uint32_t> colorCount = countColors();
    std::vector<ColorStat> colors;
    for (uint32_t rgb = 0; rgb < colorCount.size(); rgb++) {
      uint32_t uses = colorCount[rgb];
      if (uses > 0) {
        uint8_t r = (rgb >> 16) & 0xFF;
        uint8_t g = (rgb >> 8) & 0xFF;
        uint8_t b = rgb & 0xFF;
        colors.push_back({r, g, b, static_cast<uint32_t>(uses)});
      }
    }
    return colors;
  }

  uint32_t getBitCount() const {
    uint32_t sum = 0;
    for (const auto &color : colors) {
      sum += color.total;
    }
    return sum;
  }

  size_t getColorCount() const { return colors.size(); }
};

EMSCRIPTEN_BINDINGS(quantizer_module) {
  emscripten::value_object<ColorStat>("ColorStat")
      .field("r", &ColorStat::r)
      .field("g", &ColorStat::g)
      .field("b", &ColorStat::b)
      .field("total", &ColorStat::total);
  emscripten::class_<Quantizer>("Quantizer")
      .constructor<emscripten::val, int, int>()
      .function("getBitCount", &Quantizer::getBitCount)
      .function("getColorCount", &Quantizer::getColorCount);
}
