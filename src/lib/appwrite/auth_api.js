import config from "./config";
import { Client, Account, ID, Avatars } from "appwrite";
import databaseservices from "./database_api";

export class AuthenServices {
  client = new Client();
  account;
  avatar;

  constructor() {
    this.client
      .setProject(config.appwriteProjectid)
      .setEndpoint(config.appwriteUrl);
    this.account = new Account(this.client);
    this.avatar = new Avatars(this.client);
  }

  createUser = async ({ email, password, name }) => {
    try {
      const newuser = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });

      if (!newuser) throw Error;

      const avatarUrl = this.avatar.getInitials({
        name: newuser.name,
        width: 200,
        height: 200,
        background: "ffffff",
      });

      const newAccount = await databaseservices.saveUserInfoToDB({
        accountId: newuser.$id,
        name: newuser.name,
        email: newuser.email,
        imageUrl: avatarUrl,
      });

      return newAccount;
    } catch (error) {
      console.log("From creating user:: " + error);
      throw error;
    }
  };

  usersignin = async ({ email, password }) => {
    try {
      const session = this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });

      return session;
    } catch (error) {
      console.log("error from logging user:: " + error); // seen in console
      throw error; // react query receives...
    }
  };

  getaccount = async () => {
    try {
      const currentAccount = this.account.get();
      return currentAccount;
    } catch (error) {
      console.log("problem from getting current user:: " + error);
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      const response = await this.getaccount();

      if (!response) throw error;

      const currentUser = await databaseservices.gettingcurrentuserrecord({
        accountId: response.$id,
      });

      if (!currentUser) throw error;

      return currentUser.rows[0];
    } catch (error) {
      console.log("problem from getting the current user:: " + error);
      throw error;
    }
  };

  loggingOutUser = async () => {
    try {
      const session = await this.account.deleteSessions();
      return session;
    } catch (error) {
      console.log("problem from deleting the session:: " + error);
      throw error;
    }
  };
  
}

const authenservice = new AuthenServices();

export default authenservice;
