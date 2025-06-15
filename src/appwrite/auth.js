import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.account = new Account(this.client);
  }

async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

login = async ({ email, password }) => {
  try {
    const session = await this.account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error
  }
};


  logout = async () => {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = async () => {
  try {
    return await this.account.get();
  } catch (error) {
    return null;
  }
};

}

export const authService = new AuthService();
export default authService;
