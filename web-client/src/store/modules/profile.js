import { GET_BASIC_PROFILE_INFORMATION } from "../types/profile";
import { Profile } from "../../common/apiService";

export default {
  actions: {
    [GET_BASIC_PROFILE_INFORMATION]: ({ commit }, username) => {
      try {
        const result = Profile.getBasicInformation(username);
        const { information } = result.data;
        return information;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
