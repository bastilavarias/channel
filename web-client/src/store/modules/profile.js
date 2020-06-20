import {
  GET_BASIC_PROFILE_INFORMATION,
  GET_GITHUB_PROFILE_INFORMATION,
} from "../types/profile";
import { Profile } from "../../common/apiService";

export default {
  actions: {
    [GET_BASIC_PROFILE_INFORMATION]: async ({ commit }, username) => {
      try {
        const result = await Profile.getBasicInformation(username);
        const { information } = result.data;
        return information;
      } catch (error) {
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    [GET_GITHUB_PROFILE_INFORMATION]: async ({ commit }, username) => {
      try {
        const result = await Profile.getGithubInformation(username);
        const { information } = result.data;
        return information;
      } catch (error) {
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
  },
};
