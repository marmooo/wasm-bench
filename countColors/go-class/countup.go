package main

import (
	"encoding/binary"
	"syscall/js"
	// "unsafe"
)

// // too slow
// func countColors2(this js.Value, args []js.Value) interface{} {
// 	uint8Array := args[0]
// 	length := uint8Array.Get("length").Int()
// 	uint8Data := make([]byte, length)
// 	js.CopyBytesToGo(uint8Data, uint8Array)
// 	uint32Data := unsafe.Slice((*uint32)(unsafe.Pointer(&uint8Data[0])), length/4)
// 	colorCount := make([]uint32, 16777216)
// 	for _, rgba := range uint32Data {
// 		rgb := rgba & 0xFFFFFF
// 		colorCount[rgb]++
// 	}
// 	result := js.Global().Get("Uint8Array").New(16777216 * 4)
// 	colorCountBytes := (*(*[16777216 * 4]byte)(unsafe.Pointer(&colorCount[0])))[:]
// 	js.CopyBytesToJS(result, colorCountBytes)
// 	return result
// }

// // truncate problem
// func countColors(this js.Value, args []js.Value) interface{} {
// 	uint8Data := args[0]
// 	buffer := uint8Data.Get("buffer")
// 	uint32Data := js.Global().Get("Uint32Array").New(buffer)
// 	colorCount := js.Global().Get("Uint32Array").New(16777216)
// 	for i := 0; i < uint32Data.Length(); i++ {
// 		rgba := uint32Data.Index(i).Int() // TODO
// 		rgb := rgba & 0xFFFFFF
// 		count := colorCount.Index(rgb).Int() + 1
// 		colorCount.SetIndex(rgb, count)
// 	}
// 	return colorCount
// }

func countColors(this js.Value, args []js.Value) interface{} {
	uint8Data := args[0]
	length := uint8Data.Get("byteLength").Int()
	uint8Array := make([]byte, length)
	js.CopyBytesToGo(uint8Array, uint8Data)
	uint32Data := make([]uint32, length/4)
	for i := 0; i < len(uint32Data); i++ {
		uint32Data[i] = binary.LittleEndian.Uint32(uint8Array[i*4 : (i+1)*4])
	}
	colorCount := js.Global().Get("Uint32Array").New(16777216)
	for _, rgba := range uint32Data {
		rgb := rgba & 0xFFFFFF
		count := colorCount.Index(int(rgb)).Int() + 1
		colorCount.SetIndex(int(rgb), count)
	}
	return colorCount
}

func main() {
	namespace := js.Global().Get("Object").New()
	namespace.Set("countColors", js.FuncOf(countColors))
	js.Global().Set("countup", namespace)
  select {}
}
