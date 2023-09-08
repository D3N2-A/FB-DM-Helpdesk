import { atom } from "recoil";

export const personState = atom({
  key: "person",
  default: {
    status: "",
    accessToken: "",
  },
});
