/**
 * A type predicate function that asserts the given value is not `null` or `undefined`.
 * 
 * This is useful when filtering arrays with potentially null or undefined values.
 * For example:
 * 
 * ```typescript
 * const arr: Array<string | null> = ['hello', null, 'world'];
 * const nonNullArr = arr.filter(isNotNull); // inferred as Array<string>
 * ```
 * 
 * @param value - The value to check for null or undefined.
 * @returns True if `value` is neither null nor undefined; otherwise, false.
 */
export function isNotNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}