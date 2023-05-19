import { inject } from 'vue';

import config from '../../config';

export const CHAMELEON_CONFIG_KEY = Symbol('Chameleon Config');

export default function useEcConfig() {
  return inject(CHAMELEON_CONFIG_KEY, config);
}
