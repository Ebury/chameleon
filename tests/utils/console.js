/* eslint-env jest */

export function withMockedConsole(methodUnderTest) {
  const errorSpy = jest.spyOn(console, 'error');
  errorSpy.mockImplementation(() => { });

  const warnSpy = jest.spyOn(console, 'warn');
  warnSpy.mockImplementation(() => { });

  methodUnderTest(errorSpy, warnSpy);

  errorSpy.mockRestore();
  warnSpy.mockRestore();
}
