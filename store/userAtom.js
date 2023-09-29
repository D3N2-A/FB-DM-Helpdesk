import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    authenticated: false,
    userID: "",
    accessToken: "",
    isLoading: false,
  },
});
