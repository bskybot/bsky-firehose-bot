/**
 * Returns the given string if it is defined; otherwise returns `undefined`.
 * 
 * @param val - The optional string value to check.
 * @returns The given string if defined, or `undefined` if `val` is falsy.
 */
const maybeStr = (val?: string): string | undefined => {
  if (!val) return undefined;
  return val;
}

/**
* Parses the given string as an integer if it is defined and a valid integer; otherwise returns `undefined`.
* 
* @param val - The optional string value to parse.
* @returns The parsed integer if successful, or `undefined` if the string is falsy or not a valid integer.
*/
const maybeInt = (val?: string): number | undefined => {
  if (!val) return undefined;
  const int = parseInt(val, 10);
  if (isNaN(int)) return undefined;
  return int;
}