import { cryptoSecret } from "../config";
import CryptoJS from "crypto-js";

export const encrypt = (data: string) => {
  try {
    if (!data) {
      return "";
    }
    console.log("data, cryptoSecret", data, cryptoSecret);
    var encrypted = CryptoJS.AES.encrypt(data, cryptoSecret).toString();
    console.log("encrypted", encrypted);
    return encrypted;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error encrypting data");
  }
};

export const decrypt = (data: string) => {
  try {
    if (!data) {
      return "";
    }
    console.log("data fetching", data);
    var bytes = CryptoJS.AES.decrypt(data, cryptoSecret);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Error decrypting data", error);
    throw new Error("Error decrypting data");
  }
};
