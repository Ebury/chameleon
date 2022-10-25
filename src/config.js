let sensitiveClass = '';
let iconsStaticPrefix = '';

export default {
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
