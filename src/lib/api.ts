import axios from "axios";

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined Please add it to your .env file.");
}

if (!process.env.BASIC_AUTH_USERNAME) {
  throw new Error(
    "BASIC_AUTH_USERNAME is not defined. Please add it to your .env file."
  );
}

if (!process.env.BASIC_AUTH_PASSWORD) {
  throw new Error(
    "BASIC_AUTH_PASSWORD is not defined. Please add it to your .env file."
  );
}

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  auth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
});
