import SecurityManager from "../src/security-manager";

// Because the passwordEncrypt method is protected, you can't mock it directly. You can create a new class that extends the SecurityManager and override the passwordEncrypt method. Then, you can use the new class to test the createUser method.

// So if you want mock the passwordEncrypt dependency, you can use the following code:
class TestableSecurityManager extends SecurityManager {
  static passwordEncrypt(password: string): string[] {
    return [`Encrypted: ${password}`];
  }
}

const SuccessCase = () => {
  return jest.fn()
    .mockImplementationOnce(() => 'Guilherme')
    .mockImplementationOnce(() => 'Guilherme Gomes')
    .mockImplementationOnce(() => '12345678')
    .mockImplementationOnce(() => '12345678');
}

const passwordsDontMatchCase = () => {
  return jest.fn()
    .mockImplementationOnce(() => 'Guilherme')
    .mockImplementationOnce(() => 'Guilherme Gomes')
    .mockImplementationOnce(() => '12345679')
    .mockImplementationOnce(() => '12345678');
}

const passwordDontHave8CharactersCase = () => {
  return jest.fn()
    .mockImplementationOnce(() => 'Guilherme')
    .mockImplementationOnce(() => 'Guilherme Gomes')
    .mockImplementationOnce(() => '1234567')
    .mockImplementationOnce(() => '1234567');
}

var callCount = 0;

beforeEach(() => {
  jest.clearAllMocks();
  callCount++;
});

jest.mock('prompt-sync', () => {
  return jest.fn().mockImplementation(() => {
    if (callCount === 2) return passwordsDontMatchCase();

    if (callCount === 3) return passwordDontHave8CharactersCase();

    if (callCount === 3) return SuccessCase();

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

  it('should alert if password does not have 8 characters', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    SecurityManager.createUser()
    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Password must be at least 8 characters in length`)
  })

  it('should encrypt the password (testing with the override password encrypt method)', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    TestableSecurityManager.createUser()
    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Saving Details for User (Guilherme, Guilherme Gomes, Encrypted: 12345678)\n`)
  })
})
