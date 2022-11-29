/* eslint-env jest */

export function withMockedConsole(methodUnderTest) {
  const errorSpy = jest.spyOn(console, 'error');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  errorSpy.mockImplementation(() => { });

  const warnSpy = jest.spyOn(console, 'warn');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  warnSpy.mockImplementation(() => { });

  methodUnderTest(errorSpy, warnSpy);

  errorSpy.mockRestore();
  warnSpy.mockRestore();
}
