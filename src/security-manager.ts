import { PasswordEncrypter, Prompt } from "./domain";
import promptSync from "prompt-sync";

export class ReversePasswordEncrypter implements PasswordEncrypter {
  encrypt(password: string): string {
    const array = password.split("");
    return array.reverse().join("");
  }
}

export class PromptSyncAdapter implements Prompt {
  getUserInput(): string {
    const prompt = promptSync();
    return prompt("");
  }
}

export class SecurityManager {
  constructor(
    private readonly passwordEncrypter: PasswordEncrypter,
    private readonly prompt: Prompt
  ) { }

  public createUser() {
    console.log("Enter a username");
    const username = this.prompt.getUserInput();

    console.log("Enter your full name");
    const fullName = this.prompt.getUserInput();

    console.log("Enter your password");
    const password = this.prompt.getUserInput();

    console.log("Re-enter your password");
    const confirmPassword = this.prompt.getUserInput();

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
