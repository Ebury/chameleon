import config from './config';

it('should throw if sensitive classs is empty', () => {
  config.sensitiveClass = '';

  expect(() => {
    config.sensitiveClass();
  }).toThrow('sensitiveClass is required');
});
