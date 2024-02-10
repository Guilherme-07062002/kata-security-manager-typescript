import { SecurityManager, ReversePasswordEncrypter, PromptSyncAdapter } from "./security-manager";

const passwordEncrypter = new ReversePasswordEncrypter();
const promptSync = new PromptSyncAdapter();

const securityManager = new SecurityManager(passwordEncrypter, promptSync);

securityManager.createUser();
