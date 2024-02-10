import { SecurityManager } from "../src/security-manager";
import { PasswordEncrypter, Prompt } from "../src/domain";

class MockPasswordEncrypter implements PasswordEncrypter {
  encrypt: (password: string) => string = jest.fn().mockImplementation((password: string) => {
    return password.split("").reverse().join("");
  })
}

class MockPrompt implements Prompt {
  getUserInput: () => string = jest.fn()
}

const makeSut = () => {
  const mockPasswordEncrypter = new MockPasswordEncrypter();
  const mockPrompt = new MockPrompt();
  const securityManager = new SecurityManager(mockPasswordEncrypter, mockPrompt);

  return { securityManager, mockPasswordEncrypter, mockPrompt };
}

beforeEach(() => {
  jest.clearAllMocks();
})

describe('testing mock security manager', () => {
  it('should create a new user', () => {
    const { securityManager, mockPrompt } = makeSut()
    const consoleSpy = jest.spyOn(console, 'log')
    mockPrompt.getUserInput = jest.fn()
      .mockReturnValueOnce('Guilherme')
      .mockReturnValueOnce('Guilherme Gomes')
      .mockReturnValueOnce('12345678')
      .mockReturnValueOnce('12345678')

    securityManager.createUser()

    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Saving Details for User (Guilherme, Guilherme Gomes, 87654321)\n`)
  })

  it('should alert if passwords do not match', () => {
    const { securityManager, mockPrompt } = makeSut()
    mockPrompt.getUserInput = jest.fn()
      .mockReturnValueOnce('Guilherme')
      .mockReturnValueOnce('Guilherme Gomes')
      .mockReturnValueOnce('12345678')
      .mockReturnValueOnce('12345679')
    const consoleSpy = jest.spyOn(console, 'log')

    securityManager.createUser()

    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `The passwords don't match`)
  })

  it('should alert if password does not have 8 characters', () => {
    const { securityManager, mockPrompt } = makeSut()
    const consoleSpy = jest.spyOn(console, 'log')
    mockPrompt.getUserInput = jest.fn()
      .mockReturnValueOnce('Guilherme')
      .mockReturnValueOnce('Guilherme Gomes')
      .mockReturnValueOnce('1234567')
      .mockReturnValueOnce('1234567')

    securityManager.createUser()

    expect(consoleSpy).toBeCalledTimes(5)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Enter a username')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Enter your full name')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Re-enter your password')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Password must be at least 8 characters in length`)
  })
})
