import { getPermissionAPI } from "@/api/auth";

const actions = {
  setPermission: async ({ commit }) => {
    let res = await getPermissionAPI();
    commit("SET_PERMISSION", res.menuDtos);
    return res.menuDtos;
  },
  removeOnLogout: ({ commit }) => {
    commit("REMOVE_TOKEN");
    commit("REMOVE_USER_INFO");
    commit("REMOVE_CUSTOMER_ID");
    commit("REMOVE_PERMISSION");
    localStorage.clear();
  }
};

export default actions;
