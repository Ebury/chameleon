jest.mock('@vueuse/integrations/useFocusTrap', () => ({
  __esModule: true,
  useFocusTrap: jest.fn(() => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
    pause: jest.fn(),
    unpause: jest.fn(),
  })),
}));
