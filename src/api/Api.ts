import { encode } from "js-base64";
import { API_URLS } from "./config";
import axios from "axios";
import { User } from "../types";

export class Api {
  private static apiUrl =
    import.meta.env.MODE === "production"
      ? API_URLS.PRODUCTION
      : API_URLS.DEVELOPMENT;

  private static token = "";

  public static get = <Data>(url: string) => {
    return axios.get<Data>(`${this.apiUrl}${url}`, {
      headers: { Authorization: `Basic ${this.token}` },
    });
  };

  public static setTokenAndUser = async (login: string, password: string) => {
    this.token = encode(`${login}:${password}`);
    return this.get<User>("/loadUser");
  };
}
