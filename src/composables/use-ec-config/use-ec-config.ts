import { inject } from 'vue';

import config, { type EcConfig } from '../../config';

export const CHAMELEON_CONFIG_KEY = Symbol('Chameleon Config');

export default function useEcConfig(): EcConfig {
  return inject<EcConfig>(CHAMELEON_CONFIG_KEY, config);
}
