<template>
  <div class="weather-card">
    <div class="date" v-if="weatherData[0]">{{ weatherData[0].fxDate }}</div>
    <div class="weather-days">
      <div v-for="(day, index) in weatherData" :key="index" class="day">
        <div class="day-weather">
          <div>{{ dayName[index] }}</div>
          <div>{{ day.textDay }}</div>
        </div>
        <div class="day-weather">
          <div class="tem">{{ day.tempMin }}/{{ day.tempMax }}℃</div>
          <!--          <div>{{ day.windDirDay }}{{ day.windScaleDay }}级</div>-->
        </div>
      </div>
    </div>
    <div class="tip-content">
      <span class="tip-title">小贴士：</span
      >{{ userInfo.userName }}您好！工作忙碌，注意适时休息。
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "weather",
  props: {
    location: { type: String, default: "121.478137,31.208805" }
  },
  data() {
    return {
      loading: true,
      userInfo: this.$store.state.userInfo,
      dayName: ["今天", "明天", "后天"],
      weatherData: [],
      url: "https://devapi.qweather.com/v7/weather/3d"
    };
  },
  watch: {
    location: {
      deep: true,
      handler() {
        this.loadData();
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      console.log("location",this.location)
      axios
        .get(this.url, {
          params: {
            key: "be422996ad364a0da16f2348bd98dadd",
            location: this.location || "121.478137,31.208805"
          }
        })
        .then(res => {
          if (res.data && res.data.daily) {
            this.weatherData = res.data.daily;
          }
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => {
            this.loadData();
          }, 1000);
        });
    }
  }
};
</script>

<style scoped lang="less">
.weather-card {
  height: 126px;
  padding: @padding-base;
  background: url("../../assets/images/weather_bg.png") center / cover no-repeat;

  .date {
    text-align: left;
    padding: @padding-base @padding-xs;
  }

  .weather-days {
    display: flex;
    height: 56px;

    .day {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .day-weather {
        display: flex;
        justify-content: space-between;
        padding: 0 @padding-xs;
      }
    }

    & .day:nth-child(1) {
      .tem {
        font-size: 26px;
      }
    }

    & .day:nth-child(n + 2) {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
    }
  }

  .tip-content {
    width: 100%;
    padding: 12px 4px 8px;
    text-align: left;

    .tip-title {
      font-weight: bold;
      background-image: @gradient-green;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
