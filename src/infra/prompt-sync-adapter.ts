import promptSync from "prompt-sync";
import { Prompt } from "../domain";

export class PromptSyncAdapter implements Prompt {
  getUserInput(): string {
    const prompt = promptSync();
    return prompt("");
  }
}
