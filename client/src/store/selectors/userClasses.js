import { userState } from "../atoms/user";
import {selector} from "recoil";

export const userClassesState = selector({
  key: 'userClassesState',
  get: ({get}) => {
    const state = get(userState);
    return state.classes;
  },
});
