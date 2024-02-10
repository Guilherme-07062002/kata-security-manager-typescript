import { SecurityManager } from "./security-manager";
import { ReversePasswordEncrypter, PromptSyncAdapter } from "./infra";

const passwordEncrypter = new ReversePasswordEncrypter();
const promptSync = new PromptSyncAdapter();

const securityManager = new SecurityManager(passwordEncrypter, promptSync);

securityManager.createUser();
