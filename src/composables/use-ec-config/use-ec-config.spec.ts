import { vi } from 'vitest';
import { inject } from 'vue';

import config from '../../config';
import useEcConfig, { CHAMELEON_CONFIG_KEY } from './use-ec-config';

vi.mock('vue', () => ({
  inject: vi.fn(),
}));

describe('useEcConfig', () => {
  beforeEach(() => {
    vi.mocked(inject).mockClear();
  });

  it('should call inject with CHAMELEON_CONFIG_KEY', () => {
    useEcConfig();

    expect(inject).toHaveBeenCalledWith(CHAMELEON_CONFIG_KEY, config);
  });

  it('should return the value from inject', () => {
    vi.mocked(inject).mockReturnValueOnce('mockedValue');

    const result = useEcConfig();

    expect(result).toBe('mockedValue');
  });
});
