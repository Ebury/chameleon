/* eslint-env jest */

export function withMockedConsole(methodUnderTest) {
  const errorSpy = jest.spyOn(console, 'error');
  errorSpy.mockImplementation(() => { });

  methodUnderTest(errorSpy);

  errorSpy.mockRestore();
}
