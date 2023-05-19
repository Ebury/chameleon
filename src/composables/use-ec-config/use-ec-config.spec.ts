import { inject } from 'vue';

import config from '../../config';
import useEcConfig, { CHAMELEON_CONFIG_KEY } from './use-ec-config';

jest.mock('vue', () => ({
  inject: jest.fn(),
}));

describe('useEcConfig', () => {
  beforeEach(() => {
    (inject as jest.Mock).mockClear();
  });

  it('should call inject with CHAMELEON_CONFIG_KEY', () => {
    useEcConfig();

    expect(inject).toHaveBeenCalledWith(CHAMELEON_CONFIG_KEY, config);
  });

  it('should return the value from inject', () => {
    (inject as jest.Mock).mockReturnValueOnce('mockedValue');

    const result = useEcConfig();

    expect(result).toBe('mockedValue');
  });
});
