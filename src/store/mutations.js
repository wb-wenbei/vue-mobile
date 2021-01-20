/**
 * @param {Array} arr
 * @param {Array} 拍平后的数组
 */
const flatArr = arr => {
  let result = [];
  arr.forEach(item => {
    if (item.children && item.children.length) {
      result.push(...flatArr(item.children));
    } else if (item.sonMenus && item.sonMenus.length) {
      result.push(...flatArr(item.sonMenus));
    }
    result.push(item);
  });
  return result;
};

/**
 * @param {Array} menus 所有的
 * @returns {Array} 返回菜单的权限的code组成的数组
 */
const getMenuCode = menus => {
  let menuC = flatArr(JSON.parse(JSON.stringify(menus)));
  let result = [];
  menuC.length &&
    menuC.forEach(item => {
      result.push(item.code);
    });
  return result;
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN: state => {
    state.token = "";
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = [];
    let array = getMenuCode(permission);
    state.permission = [...array];
  },
  REMOVE_PERMISSION: state => {
    state.permission = [];
  },
  SET_CUSTOMER_ID: (state, customerId) => {
    state.customerId = customerId;
  },
  REMOVE_CUSTOMER_ID: state => {
    state.customerId = "";
  },
  SET_USER_INFO: (state, userInfo) => {
    Object.assign(state.userInfo, userInfo);
  },
  REMOVE_USER_INFO: state => {
    state.userInfo = {};
  },
  SET_EVENT_TYPE: (state, eventType) => {
    state.eventType = eventType;
  }
};

export default mutations;
