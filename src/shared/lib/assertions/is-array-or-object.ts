import { isArray } from './is-array';
import { isPlainObject } from './is-plain-object';
import { PlainObject } from './types';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
