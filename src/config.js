let sensitiveClass = '';

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
};
