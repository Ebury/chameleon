let sensitiveClass = '';

export default {
  iconsPublicPath: '/img',
  get sensitiveClass() {
    if (!sensitiveClass) {
      throw new Error('sensitiveClass is required');
    }
    return sensitiveClass;
  },
  set sensitiveClass(value) {
    sensitiveClass = value;
  },
};
