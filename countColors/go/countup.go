package main

import (
	"unsafe"
)

//export countColors
func countColors(uint8DataPtr *uint8, length int) *uint32 {
	colorCount := make([]uint32, 16777216)
	uint32Data := unsafe.Slice((*uint32)(unsafe.Pointer(uint8DataPtr)), length/4)
	for _, rgba := range uint32Data {
		rgb := rgba & 0xFFFFFF
		colorCount[rgb]++
	}
	return &colorCount[0]
}

func main() {
}
