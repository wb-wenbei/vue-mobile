<template>
  <div class="mine-content">
    <div class="user-info">
      <van-image
        width="56"
        height="56"
        lazy-load
        round
        fit="cover"
        :src="userPhoto"
      />
      <div class="style-title">{{ userInfo.userName }}</div>
    </div>
    <div class="company-info">
      <p>版本号：V1.0</p>
      <p>上海太的信息科技有限公司</p>
      <div>
        <van-button class="default-btn" type="primary" @click.stop="logout"
          >退 出 登 录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { logoutAPI } from "@/api/auth";
export default {
  name: "Mine",
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      userPhoto: require("../../assets/images/user_photo.png")
    };
  },
  methods: {
    logout() {
      logoutAPI().finally(() => {
        this.$store.dispatch("removeOnLogout");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped lang="less">
.mine-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 60px @padding-md;

  .user-info {
    .style-title {
      padding: @padding-xs;
    }
  }
}
</style>
