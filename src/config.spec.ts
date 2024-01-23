import config from './config';

describe('config', () => {
  it('should throw if sensitive class is empty', () => {
    config.sensitiveClass = '';

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      config.sensitiveClass;
    }).toThrow('sensitiveClass is required');
  });
});
