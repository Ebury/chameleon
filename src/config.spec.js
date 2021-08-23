import config from './config';

it('should throw if sensitive class is empty', () => {
  config.sensitiveClass = '';

  expect(() => {
    config.sensitiveClass();
  }).toThrow('sensitiveClass is required');
});
