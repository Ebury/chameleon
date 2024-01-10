import { type MockInstance, vi } from 'vitest';

export function withMockedConsole(methodUnderTest: (errorSpy: MockInstance, warnSpy: MockInstance) => void) {
  const errorSpy = vi.spyOn(console, 'error');

  errorSpy.mockImplementation(() => { });

  const warnSpy = vi.spyOn(console, 'warn');

  warnSpy.mockImplementation(() => { });
  try {
    methodUnderTest(errorSpy, warnSpy);
  } finally {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  }
}
