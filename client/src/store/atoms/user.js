import {atom} from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    puid: null,
    profile_pic: null,
    type: null,
    major: null,
    classes: null
  },
});
