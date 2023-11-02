import { vi } from 'vitest';

vi.mock('@vueuse/integrations/useFocusTrap', () => ({
  useFocusTrap: vi.fn(() => ({
    activate: vi.fn(),
    deactivate: vi.fn(),
    pause: vi.fn(),
    unpause: vi.fn(),
  })),
}));
