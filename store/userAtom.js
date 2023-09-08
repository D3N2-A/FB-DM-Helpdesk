import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    authenticated: false,
    isLoading: false,
    displayName: "",
    email: "",
    uid: "",
    photoUrl: "",
  },
});
