<template>
  <div class="exchange-content">
    <van-image width="100%" :height="height" fit="contain" :src="url" />
  </div>
</template>

<script>
import { getGoodsImgAPI } from "@/api/credits";

export default {
  name: "exchange",
  data() {
    return {
      height: "",
      url: ""
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      getGoodsImgAPI().then(res => {
        this.url = res;
        let img = new Image();
        img.src = this.url;
        img.onload = () => {
          this.height = parseInt(img.height * (375 / img.width));
        };
      });
    }
  }
};
</script>

<style scoped lang="less">
.exchange-content {
  height: 100%;
}
</style>
