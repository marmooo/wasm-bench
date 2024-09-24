export function createStruct(c, typedArray) {
  const structSize = 12;
  const structPtr = c._malloc(
    structSize + typedArray.length * typedArray.BYTES_PER_ELEMENT,
  );
  const dataPtr = structPtr + structSize;
  c[getHeapName(typedArray)].set(typedArray, dataPtr);
  c.HEAPU32[structPtr / 4] = dataPtr;
  c.HEAPU32[structPtr / 4 + 1] = typedArray.length;
  return structPtr;
}

export function createTypedArray(c, pointer, klass) {
  const dataPtr = c.HEAPU32[pointer / 4];
  const length = c.HEAPU32[pointer / 4 + 1];
  const buffer = c.HEAPU8.buffer;
  return new klass(buffer, dataPtr, length);
}

export function freeStruct(c, structPtr) {
  const dataPtr = c.HEAPU32[structPtr / 4];
  c._free(structPtr);
  c._free(dataPtr);
}

function getHeapName(typedArray) {
  if (typedArray instanceof Uint8Array) return "HEAPU8";
  if (typedArray instanceof Uint8ClampedArray) return "HEAPU8";
  if (typedArray instanceof Int8Array) return "HEAP8";
  if (typedArray instanceof Uint16Array) return "HEAPU16";
  if (typedArray instanceof Int16Array) return "HEAP16";
  if (typedArray instanceof Uint32Array) return "HEAPU32";
  if (typedArray instanceof Int32Array) return "HEAP32";
  if (typedArray instanceof Float32Array) return "HEAPF32";
  if (typedArray instanceof Float64Array) return "HEAPF64";
  if (typedArray instanceof BigUint64Array) return "HEAPU64";
  if (typedArray instanceof BigInt64Array) return "HEAP64";
  throw new Error("Unsupported TypedArray type");
}
