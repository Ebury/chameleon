import { beforeEach, vi } from 'vitest';

let mockUid = 1;

beforeEach(() => {
  mockUid = 1;
});

vi.mock('../../src/utils/uid', () => ({
  getUid() {
    return mockUid++ % Number.MAX_SAFE_INTEGER;
  },
}));
