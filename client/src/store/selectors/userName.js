import { userState } from "../atoms/user";
import {selector} from "recoil";

export const userNameState = selector({
  key: 'userNameState',
  get: ({get}) => {
    const state = get(userState);
    return state.first_name;
  },
});
