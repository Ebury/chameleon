import { vi } from 'vitest';

import { getUid } from './uid';

vi.unmock('./uid');

describe('Utils', () => {
  describe('getUid', () => {
    it('should return unique ID every time it\'s called', () => {
      for (let i = 1; i < 100; i++) {
        expect(getUid()).toBe(i);
      }
    });
  });
});
