import { SecurityManager, ReversePasswordEncrypter } from "./security-manager";

const passwordEncrypter = new ReversePasswordEncrypter();
const securityManager = new SecurityManager(passwordEncrypter);

securityManager.createUser();
