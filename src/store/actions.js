import { getPermissionAPI } from "@/api/auth";

const actions = {
  setPermission: async ({ commit }) => {
    let res = await getPermissionAPI();
    commit("SET_PERMISSION", res.menuDtos);
    return res.menuDtos;
  }
};

export default actions;
