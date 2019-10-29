/* eslint-env jest */

/* eslint-disable import/prefer-default-export */
export function withMockedConsole(methodUnderTest) {
  const errorSpy = jest.spyOn(console, 'error');
  errorSpy.mockImplementation(() => { });

  methodUnderTest(errorSpy);

  errorSpy.mockRestore();
}
