<template>
  <div class="layout">
    <home-header class="home-header" :title="title" :leftArrow="leftArrow">
      <template v-if="switchHeader" v-slot:title>
        <header-switch v-model="type" :options="switchOptions"></header-switch>
      </template>
    </home-header>
    <div
      ref="layout-content"
      class="content"
      @touchstart="touchstart"
      @touchend="touchend"
    >
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="include">
          <router-view />
        </keep-alive>
      </transition>
    </div>
    <home-footer :active="active"></home-footer>
  </div>
</template>

<script>
import HomeHeader from "@/components/header/header";
import HeaderSwitch from "@/components/header/headerSwitch";
import HomeFooter from "@/components/footer/footer";

export default {
  name: "layout",
  components: { HomeHeader, HeaderSwitch, HomeFooter },
  data() {
    return {
      title: "",
      active: "",
      leftArrow: true,
      switchHeader: false,
      switchOptions: null,
      switchMutation: null,
      clientWidth: 375,
      minWidth: 50,
      type: "",
      touch: {},
      include: [""]
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(v) {
        this.active = v.name || "other";
        this.title = v.meta.title || "";
        this.switchHeader = v.meta.switchHeader || false;
        if (v.meta.switchHeader) {
          this.switchOptions = v.meta.switchOptions;
          this.switchMutation = v.meta.switchMutation;
          this.type = this.$store.state[v.meta.switchType];
        }
        this.leftArrow = v.name !== "Home";
      }
    },
    type(v) {
      if (v) {
        this.$store.commit(this.switchMutation || "SET_EVENT_TYPE", v);
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
      // this.checkTouch();
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

  .content {
    height: 100%;
    overflow: auto;
  }
}
</style>
