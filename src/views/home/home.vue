<template>
  <div class="home-content">
    <van-swipe class="swipe-content" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="home-body">
      <message-item
        class="message-item"
        :data="messageItem"
        iconClass="ellipsis-v"
        @iconClick="messageClick"
      ></message-item>
      <div class="common-card padding-0" style="min-height: 126px">
        <weather-card></weather-card>
        <div class="tip-content">
          <span class="tip-title">小贴士：</span
          >{{ userInfo.userName }}您好！工作忙碌，注意适时休息。
        </div>
      </div>
      <div class="common-card padding-0">
        <div class="card-title style-title">
          <div>签到领积分</div>
          <div class="style-sub-title" @click="toCredits">积分明细</div>
        </div>
        <sign-card></sign-card>
      </div>
      <div class="common-card padding-0">
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
import { getPosition } from "../../components/map/config";

const POSITION_TIME = 1000 * 10;

export default {
  name: "Home",
  components: { WeatherCard, SignCard, MessageItem },
  data() {
    return {
      title: "中航环卫",
      userInfo: this.$store.state.userInfo,
      messageItem: {},
      weatherShow: false,
      position: {},
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
          link: "/credits/exchange",
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
  created() {
    this.getLocalPosition();
  },
  methods: {
    getLocalPosition() {
      getPosition()
        .then(res => {
          this.position = res;
          this.$store.commit("SET_POSITION", this.position);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          if (!this.position.lng && !this.position.lat) {
            setTimeout(() => {
              this.getLocalPosition();
            }, POSITION_TIME);
          }
        });
    },
    toCredits() {
      this.$router.push({ path: "/credits" });
    },
    messageClick() {
      this.$router.push({ path: "/message" });
    }
  }
};
</script>

<style scoped lang="less">
.home-body {
  padding: 0 @padding-md;

  .message-item {
    position: relative;
    top: -12px;
    margin: 0 0 -12px;
  }

  .common-card {
    overflow: hidden;
    position: relative;

    &.padding-0 {
      padding: 0;
    }

    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      padding: @padding-md;
    }

    .tip-content {
      width: 100%;
      padding: 24px 8px 8px;
      position: absolute;
      bottom: 0;
      color: white;
      text-align: left;

      .tip-title {
        font-weight: bold;
        background-image: @gradient-green;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
  }
}

.swipe-content {
  background: white;

  img {
    height: 200px;
  }
}

::v-deep {
  .van-grid-item__content {
    padding-top: 0;
  }
}
</style>
