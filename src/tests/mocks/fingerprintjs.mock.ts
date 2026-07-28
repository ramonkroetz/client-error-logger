import { vitest } from 'vitest'

vitest.mock('@fingerprintjs/fingerprintjs', () => ({
  __esModule: true,
  default: {
    load: vitest.fn().mockResolvedValue({
      get: vitest.fn().mockResolvedValue({ visitorId: 'test-browser-id' }),
    }),
  },
}))
