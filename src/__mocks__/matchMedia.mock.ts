Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn<MediaQueryList, [string]>().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
