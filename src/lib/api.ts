import axios from "axios";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BASE_URL is not defined Please add it to your .env file."
  );
}

if (!process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME) {
  throw new Error(
    "NEXT_PUBLIC_BASIC_AUTH_USERNAME is not defined. Please add it to your .env file."
  );
}

if (!process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD) {
  throw new Error(
    "NEXT_PUBLIC_BASIC_AUTH_PASSWORD is not defined. Please add it to your .env file."
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD,
  },
});
