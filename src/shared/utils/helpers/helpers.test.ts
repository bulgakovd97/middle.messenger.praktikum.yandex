import { expect } from 'chai';
import { set } from './helpers';

describe('helpers functions', () => {
  describe('set function', () => {
    let path: string;
    let value: unknown;
    let object: Record<string, unknown>;

    beforeEach(() => {
      path = 'path';
      value = 'some value';
      object = {};
    });

    it('should set a new property to the object with the passed value', () => {
      const result = set(object, path, value);

      expect((result as any).path).to.eq(value);
    });

    it.only('should set a value by path to the object', () => {
      set(object, path, value);

      expect(object).to.haveOwnProperty(path);
      expect(object.path).to.eq(value);
    });
    it('should return a passed object if passed not an object', () => {
      const notAnObject = 2;

      const result = set(notAnObject, path, value);

      expect(result).to.eq(notAnObject);
    });

    it('should return null if passed null', () => {
      const result = set(null, path, value);

      expect(result).to.eq(null);
    });

    it('should throw an error if type of "path" is not a string', () => {
      const notStringPath = 4;

      const fn = () => set({}, notStringPath as any, value);

      expect(fn).throw(Error);
    });
  });
});
