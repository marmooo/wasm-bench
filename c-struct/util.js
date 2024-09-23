export function createStruct(c, typedArray) {
  const structSize = 12;
  const structPtr = c._malloc(
    structSize + typedArray.length * typedArray.BYTES_PER_ELEMENT,
  );
  const dataPtr = structPtr + structSize;
  c[getHeapName(typedArray)].set(typedArray, dataPtr);
  c.HEAPU32[structPtr / 4] = dataPtr;
  c.HEAPU32[structPtr / 4 + 1] = typedArray.length;
  c.HEAPU8[structPtr + 8] = getType(typedArray);
  return structPtr;
}

export function createTypedArray(c, pointer) {
  const dataPtr = c.HEAPU32[pointer / 4];
  const length = c.HEAPU32[pointer / 4 + 1];
  const type = c.HEAPU8[pointer + 8];
  const buffer = c.HEAPU8.buffer;
  const typeString = getTypeString(type);
  return new globalThis[typeString](buffer, dataPtr, length);
}

export function freeStruct(c, structPtr) {
  const dataPtr = c.HEAP32[structPtr / 4];
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

function getType(typedArray) {
  if (typedArray instanceof Uint8Array) return 1;
  if (typedArray instanceof Uint8ClampedArray) return 2;
  if (typedArray instanceof Int8Array) return 3;
  if (typedArray instanceof Uint16Array) return 4;
  if (typedArray instanceof Int16Array) return 5;
  if (typedArray instanceof Uint32Array) return 6;
  if (typedArray instanceof Int32Array) return 7;
  if (typedArray instanceof Float32Array) return 8;
  if (typedArray instanceof Float64Array) return 9;
  if (typedArray instanceof BigUint64Array) return 10;
  if (typedArray instanceof BigInt64Array) return 11;
  throw new Error("Unsupported TypedArray type");
}

const typeString = [
  "Uint8Array",
  "Uint8ClampedArray",
  "Int8Array",
  "Uint16Array",
  "Int16Array",
  "Uint32Array",
  "Int32Array",
  "Float32Array",
  "Float64Array",
  "BigUint64Array",
  "BigInt64Array",
];

function getTypeString(type) {
  return typeString[type];
}
