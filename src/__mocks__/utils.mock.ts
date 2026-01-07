jest.mock('utils', () => ({
  getBrowserId: jest.fn().mockResolvedValue('browserIdMock'),
}))
