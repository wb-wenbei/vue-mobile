<template>
  <div class="footer">
    <div
      v-for="menu in menus"
      :key="menu.id"
      class="menu"
      :class="active === menu.id ? 'active' : ''"
      @click="goLink(menu)"
    >
      {{ menu.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFooter",
  props: {
    active: { type: String, default: "Home" }
  },
  data() {
    return {
      menus: [
        { id: "Home", title: "首页", route: "/home" },
        { id: "Mine", title: "个人中心", route: "/mine" }
      ]
    };
  },
  methods: {
    goLink(menu) {
      if (this.active === menu.id) {
        return;
      }
      this.$router.push(menu.route);
    }
  }
};
</script>

<style scoped lang="less">
.footer {
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background: white;

  .menu {
    flex: 1;
    height: 100%;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);

    &.active {
      font-weight: bold;
    }
  }
}
</style>
