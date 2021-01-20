<template>
  <div class="exchange-content">
    <van-image width="100%" :height="height" fit="contain" :src="url" />
  </div>
</template>

<script>
export default {
  name: "exchange",
  data() {
    return {
      height: "",
      url: "https://img.yzcdn.cn/vant/apple-2.jpg"
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      let img = new Image();
      img.src = this.url;
      img.onload = () => {
        this.height = parseInt(img.height * (375 / img.width));
      };
    }
  }
};
</script>

<style scoped lang="less">
.exchange-content {
  height: 100%;
}
</style>
