<template>
  <div class="header">
    <van-nav-bar :left-arrow="leftArrow" @click-left="goBack">
      <template #title>
        <slot name="title">
          <div class="header-title">{{ title }}</div>
        </slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: { type: String, default: "标题" },
    leftArrow: { type: Boolean, default: true }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 20px;
  background: @gradient-green;

  .header-title {
    font-size: 18px;
  }

  ::v-deep {
    .van-nav-bar {
      background: @gradient-green;
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
</style>
