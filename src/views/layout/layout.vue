<template>
  <div class="layout">
    <home-header
      class="home-header"
      :title="title"
      :leftArrow="leftArrow"
    ></home-header>
    <div
      ref="layout-content"
      class="content"
      @touchstart="touchstart"
      @touchend="touchend"
    >
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
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
      active: "",
      leftArrow: true,
      clientWidth: 375,
      minWidth: 50,
      touch: {}
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(v) {
        this.active = v.name || "other";
        this.title = v.meta.title || "";
        this.leftArrow = v.name !== "Home";
      }
    }
  },
  mounted() {
    this.clientWidth = this.$refs["layout-content"].clientWidth;
    this.minWidth = this.clientWidth / 6;
  },
  methods: {
    touchstart(e) {
      this.touch = {};
      this.touch.startTime = e.timeStamp;
      this.touch.startClientX = e.changedTouches[0].clientX;
      this.touch.startClientY = e.changedTouches[0].clientY;
    },
    touchend(e) {
      this.touch.endTime = e.timeStamp;
      this.touch.endClientX = e.changedTouches[0].clientX;
      this.touch.endClientY = e.changedTouches[0].clientY;
      this.checkTouch();
    },
    checkTouch() {
      //首页不支持滑动回退
      if (this.$route.name === "Home") {
        return;
      }

      //滑动时间超过一秒则不执行任何操作
      if (
        !this.touch.endTime ||
        !this.touch.startTime ||
        this.touch.endTime - this.touch.startTime > 1000
      ) {
        return;
      }

      //滑动时判断滑动开始点在屏幕边缘50px(minWidth)内
      //X轴滑动距离超过50px(minWidth)
      //Y轴滑动距离不超过50px(minWidth)
      const left2Right =
        this.touch.startClientX <= this.minWidth &&
        this.touch.endClientX > this.touch.startClientX + this.minWidth &&
        Math.abs(this.touch.startClientY - this.touch.endClientY) <
          this.minWidth;

      const right2Left =
        this.touch.startClientX >= this.clientWidth - this.minWidth &&
        this.touch.endClientX < this.touch.startClientX - this.minWidth &&
        Math.abs(this.touch.startClientY - this.touch.endClientY) <
          this.minWidth;

      if (right2Left || left2Right) {
        this.$router.back();
      }
    }
  }
};
</script>

<style scoped lang="less">
.layout {
  height: 100%;
  padding-top: 66px;
  padding-bottom: 50px;
  background: #f2f2f2;

  .home-header {
    background: @gradient-green;
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

  .content {
    padding: 0 16px;
    height: 100%;
    overflow: auto;
  }
}
</style>
