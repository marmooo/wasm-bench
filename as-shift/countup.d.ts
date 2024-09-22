/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * countup/countColors
 * @param uint8Data `~lib/typedarray/Uint8Array`
 * @returns `~lib/typedarray/Uint32Array`
 */
export declare function countColors(uint8Data: Uint8Array): Uint32Array;
