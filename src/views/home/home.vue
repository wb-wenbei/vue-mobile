<template>
  <div>
    <div class="card">
      <van-swipe class="swipe-content" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <message-item
      :data="messageItem"
      iconClass="ellipsis-v"
      @iconClick="messageClick"
    ></message-item>
    <div class="card">
      <weather-card></weather-card>
    </div>
    <div class="card">
      <div class="card-title style-title">
        <div>签到领积分</div>
        <div class="style-sub-title">积分明细</div>
      </div>
      <sign-card></sign-card>
    </div>
    <div class="card">
      <div class="card-title style-title">员工关爱</div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="menu in menus" :key="menu.id" :to="menu.link">
          <div class="menu-content" :style="{ background: menu.bgColor }">
            <svg-icon class="menu-icon" :icon-class="menu.icon" />
          </div>
          <div class="style-sub-title">{{ menu.title }}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <van-popup
      v-model="weatherShow"
      closeable
      position="top"
      :style="{ height: '100%' }"
    >
      <!--      <weather-page></weather-page>-->
    </van-popup>
  </div>
</template>

<script>
import WeatherCard from "@/components/weather/weatherCard";
import SignCard from "./components/signCard/signCard";
import MessageItem from "@/views/message/components/messageItem";

export default {
  name: "Home",
  components: { WeatherCard, SignCard, MessageItem },
  data() {
    return {
      title: "中航环卫",
      messageItem: {},
      weatherShow: false,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      menus: [
        {
          id: 1,
          title: "健康上报",
          icon: "jiaosequanxian",
          link: "/healthReport",
          bgColor: "#F49541"
        },
        {
          id: 2,
          title: "积分兑换",
          icon: "jiaosequanxian",
          link: "/exchange",
          bgColor: "#F9C644"
        },
        {
          id: 3,
          title: "卫情上报",
          icon: "jiaosequanxian",
          link: "/eventReport",
          bgColor: "#28B893"
        }
      ]
    };
  },
  methods: {
    messageClick() {
      this.$router.push({ path: "/message" });
    }
  }
};
</script>

<style scoped lang="less">
.card {
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: @margin-md 0;
  min-height: 60px;
  overflow: hidden;

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: @padding-md;
  }

  .swipe-content {
    img {
      height: 200px;
    }
  }

  .menu-content {
    width: 50px;
    height: 50px;
    padding: @padding-sm;
    border-radius: @border-radius-lg;
    margin-bottom: @margin-xs;
    font-weight: bold;

    .menu-icon {
      width: 100%;
      height: 100%;
      color: white;
    }
  }

  ::v-deep {
    .van-grid-item__content {
      padding-top: 0;
    }
  }
}
</style>
