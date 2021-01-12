<template>
  <div class="layout">
    <home-header class="home-header" :title="title"></home-header>
    <div class="content">
      <router-view />
    </div>
    <home-footer :active="active"></home-footer>
  </div>
</template>

<script>
import HomeHeader from "@/components/header/header";
import HomeFooter from "@/components/footer/footer";

export default {
  name: "layout",
  components: { HomeHeader, HomeFooter },
  data() {
    return {
      title: "",
      active: ""
    };
  },
  created() {
    this.active = this.$route.name || "other";
    this.title = this.$route.meta.title || "";
  }
};
</script>

<style scoped lang="less">
.layout {
  height: 100%;
  padding-top: 46px;
  padding-bottom: 50px;
  background: #f2f2f2;

  .home-header {
    ::v-deep {
      .van-nav-bar__content {
        background: linear-gradient(to right, #32add6, #21de9c);
      }
      .van-icon {
        color: white;
        font-size: 20px;
      }

      .header-title {
        color: white;
      }
    }
  }

  .content {
    padding: 0 16px;
    height: 100%;
    overflow: auto;
  }
}
</style>
