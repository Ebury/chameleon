let sensitiveClass = '';

export const config = {
  get sensitiveClass() {
    if (sensitiveClass.length === 0) {
      throw new Error('sensitiveClass is required');
    }
    return sensitiveClass;
  },
  set sensitiveClass(value) {
    sensitiveClass = value;
  },
};
