import { GET_BASIC_PROFILE_INFORMATION } from "../types/profile";
import { Profile } from "../../common/apiService";

export default {
  actions: {
    [GET_BASIC_PROFILE_INFORMATION]: async ({ commit }, username) => {
      try {
        const result = await Profile.getBasicInformation(username);
        const { information } = result.data;
        return information;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
