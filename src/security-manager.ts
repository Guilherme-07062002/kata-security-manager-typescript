import promptSync from "prompt-sync";

export interface PasswordEncrypter {
  encrypt(password: string): string;
}

export class ReversePasswordEncrypter implements PasswordEncrypter {
  encrypt(password: string): string {
    const array = password.split("");
    return array.reverse().join("");
  }
}

export class SecurityManager {
  constructor(private readonly passwordEncrypter: PasswordEncrypter) { }

  public createUser() {
    const prompt = promptSync();

    console.log("Enter a username");
    const username = prompt('');

    console.log("Enter your full name");
    const fullName = prompt("");

    console.log("Enter your password");
    const password = prompt("");

    console.log("Re-enter your password");
    const confirmPassword = prompt("");

    if (password != confirmPassword) {
      console.log("The passwords don't match");
      return;
    }

    if (password.length < 8) {
      console.log("Password must be at least 8 characters in length");
      return;
    }

    const passwordEncrypted = this.passwordEncrypter.encrypt(password);

    console.log(`Saving Details for User (${username}, ${fullName}, ${passwordEncrypted})\n`);
  }
}
