let sensitiveClass = '';
let iconsStaticPrefix = '';

export interface EcConfig {
  get sensitiveClass(): string,
  set sensitiveClass(value: string),
  get iconsStaticPrefix(): string,
  set iconsStaticPrefix(value: string),
}

const config: EcConfig = {
  get sensitiveClass() {
    if (!sensitiveClass) {
      throw new Error('sensitiveClass is required');
    }
    return sensitiveClass;
  },
  set sensitiveClass(value) {
    sensitiveClass = value;
  },
  get iconsStaticPrefix() {
    return iconsStaticPrefix;
  },
  set iconsStaticPrefix(value) {
    iconsStaticPrefix = value;
  },
};

export default config;
