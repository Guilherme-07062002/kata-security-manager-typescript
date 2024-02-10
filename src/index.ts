import { SecurityManager, PromptSyncAdapter } from "./security-manager";
import { ReversePasswordEncrypter } from "./infra";


const passwordEncrypter = new ReversePasswordEncrypter();
const promptSync = new PromptSyncAdapter();

const securityManager = new SecurityManager(passwordEncrypter, promptSync);

securityManager.createUser();
