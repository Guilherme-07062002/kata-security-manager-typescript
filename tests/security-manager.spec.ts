import SecurityManager from "../src/security-manager";

const passwordsDontMatchCase = () => {
  return jest.fn()
    .mockImplementationOnce(() => 'Guilherme')
    .mockImplementationOnce(() => 'Guilherme Gomes')
    .mockImplementationOnce(() => '12345679')
    .mockImplementationOnce(() => '12345678');
}

const SuccessCase = () => {
  return jest.fn()
    .mockImplementationOnce(() => 'Guilherme')
    .mockImplementationOnce(() => 'Guilherme Gomes')
    .mockImplementationOnce(() => '12345678')
    .mockImplementationOnce(() => '12345678');
}

var callCount = 0;

beforeEach(() => {
  jest.clearAllMocks();
  callCount++;
});

jest.mock('prompt-sync', () => {
  return jest.fn().mockImplementation(() => {
    if (callCount === 2) return passwordsDontMatchCase();

    return SuccessCase();
  });
});

describe('testing mock security manager', () => {
  it('should create a new user', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    SecurityManager.createUser()
    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Saving Details for User (Guilherme, Guilherme Gomes, 87654321)\n`)
  })

  it('should alert if passwords do not match', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    SecurityManager.createUser()
    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `The passwords don't match`)
  })
})
