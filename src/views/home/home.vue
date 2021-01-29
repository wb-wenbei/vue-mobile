<template>
  <van-pull-refresh v-model="loading" @refresh="load">
    <div class="home-content">
      <van-swipe class="swipe-content" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-if="image" v-lazy="image" />
          <div v-else class="default-image"></div>
        </van-swipe-item>
      </van-swipe>
      <div class="home-body">
        <message-item
          class="message-item"
          :data="messageItem"
          iconClass="ellipsis-v"
          @iconClick="messageClick"
        ></message-item>
        <div class="common-card padding-0">
          <weather-card :location="location"></weather-card>
        </div>
        <div class="common-card padding-0">
          <div class="card-title style-title">
            <div>签到领积分</div>
            <div class="style-sub-title" @click="toCredits">积分明细</div>
          </div>
          <sign-card :position="position"></sign-card>
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
  </van-pull-refresh>
</template>

<script>
import WeatherCard from "@/components/weather/weather";
import SignCard from "./components/signCard/signCard";
import MessageItem from "@/views/message/components/messageItem";
import { getPosition } from "../../components/map/config";

import { pageAPI as messagePageAPI } from "@/api/message";

const POSITION_TIME = 1000 * 10;
const BANNER_LOCATION = 1; // banner

export default {
  name: "Home",
  components: { WeatherCard, SignCard, MessageItem },
  data() {
    return {
      title: "中航环卫",
      messageItem: {},
      loading: false,
      weatherShow: false,
      position: {},
      images: ["", ""],
      menus: [
        {
          id: 1,
          title: "健康上报",
          icon: "menu-health",
          link: "/healthReport",
          bgColor: "#F49541"
        },
        {
          id: 2,
          title: "积分兑换",
          icon: "menu-exchange",
          link: "/credits/exchange",
          bgColor: "#F9C644"
        },
        {
          id: 3,
          title: "卫情上报",
          icon: "menu-report",
          link: "/eventReport",
          bgColor: "#28B893"
        },
        {
          id: 4,
          title: "查看排班",
          icon: "menu-schedule",
          link: "/schedule",
          bgColor: "#31ADD6"
        }
      ]
    };
  },
  computed: {
    location() {
      if (this.position.lng && this.position.lat) {
        return this.position.lng + "," + this.position.lat;
      }
      return "";
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.getLocalPosition();
      this.loadBanner();
      this.loadMessage();
    },
    loadBanner() {
      messagePageAPI({
        isWeb: false,
        articleLocation: BANNER_LOCATION,
        top: true,
        page: 1,
        pageSize: 5
      })
        .then(res => {
          if (res.data) {
            this.images = [];
            res.data.forEach(item => {
              this.images.push(item.imgUrl);
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadMessage() {
      messagePageAPI({
        isWeb: false,
        page: 1,
        pageSize: 1
      })
        .then(res => {
          if (res.data) {
            this.messageItem = res.data[0];
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
  .default-image {
    height: 200px;
    background: url("../../assets/images/image_bg.jpg");
  }

  img {
    height: 200px;
    width: 100%;
  }
}

::v-deep {
  .van-grid-item__content {
    padding-top: 0;
  }
}
</style>
