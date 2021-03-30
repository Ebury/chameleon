let mockUid = 1;

beforeEach(() => {
  mockUid = 1;
});

jest.mock('../../src/utils/uid', () => ({
  getUid() {
    return mockUid++ % Number.MAX_SAFE_INTEGER;
  },
}));
