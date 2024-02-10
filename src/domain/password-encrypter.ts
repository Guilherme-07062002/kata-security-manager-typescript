export interface PasswordEncrypter {
  encrypt(password: string): string;
}