import { getQueryParamsString } from './httpUtils';

describe('httpUtils', () => {
  describe('getQueryParamsString', () => {
    it('converts object to query string correctly', () => {
      const testObject = {
        testString: 'test string',
        testNumber: 5,
      };
      expect(getQueryParamsString(testObject)).toEqual(
        'testString=test%20string&testNumber=5'
      );
    });
    it('does not add fields that are undefined', () => {
      const testObject = {
        testNumber: 2,
        testUndefined: undefined,
        testNull: null,
      };
      expect(getQueryParamsString(testObject)).toEqual('testNumber=2');
    });
    it('returns an empty string if the object is empty', () => {
      const testObject = {
        testUndefined: undefined,
        testNull: null,
      };
      expect(getQueryParamsString(testObject)).toEqual('');
    });
    it('throws an error if the object is undefined', () => {
      expect(() => getQueryParamsString(undefined)).toThrow(
        'Cannot convert undefined object to query param string.'
      );
    });
  });
});
