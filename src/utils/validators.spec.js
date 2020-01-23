import { arrayOfObjectsContainsKey } from './validators';

describe('Utils', () => {
  describe('arrayOfObjectsContainsKey', () => {
    const obj1 = {
      name: 'test',
      value: 'test',
      text: 'test',
    };
    const obj2 = {
      name: 'test',
      text: 'test',
    };
    const obj3 = {
      name: 'test',
      value: 'test',
    };
    it.each([
      ['name', [obj1, obj2, obj3], true],
      ['text', [obj1, obj2, obj3], false],
      ['value', [obj1, obj2, obj3], false],
      ['random', [obj1, obj2, obj3], false],
      ['text', [obj1, obj2], true],
      ['value', [obj1, obj3], true],
      ['name', [obj2, obj3], true],
      ['name', [], true],
      ['name', undefined, false],
      ['name', 'array', false],
      ['name', {}, false],
      ['name', true, false],
      ['name', 13, false],
      ['name', null, false],
    ])('should validate if the property "%s" is in all the objects in the array', (str, array, expected) => {
      expect(arrayOfObjectsContainsKey(array, str)).toEqual(expected);
    });
  });
});
