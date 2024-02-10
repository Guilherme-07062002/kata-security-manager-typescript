import { PasswordEncrypter } from "../domain";

export class ReversePasswordEncrypter implements PasswordEncrypter {
  encrypt(password: string): string {
    const array = password.split("");
    return array.reverse().join("");
  }
}