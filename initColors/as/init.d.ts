/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * init/Quantizer
 * @param image `~lib/typedarray/Uint8Array`
 * @param width `f64`
 * @param height `f64`
 * @returns `init/QuantizerImpl`
 */
export declare function Quantizer(image: Uint8Array, width: number, height: number): __Internref5;
/**
 * init/getBitCount
 * @param quantizer `init/QuantizerImpl`
 * @returns `f64`
 */
export declare function getBitCount(quantizer: __Internref5): number;
/**
 * init/getColorCount
 * @param quantizer `init/QuantizerImpl`
 * @returns `f64`
 */
export declare function getColorCount(quantizer: __Internref5): number;
/** init/QuantizerImpl */
declare class __Internref5 extends Number {
  private __nominal5: symbol;
  private __nominal0: symbol;
}
