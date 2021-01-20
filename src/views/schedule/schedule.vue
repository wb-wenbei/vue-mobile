<template>
  <div class="schedule-content">
    <van-calendar
      :poppable="false"
      :show-confirm="false"
      :show-mark="true"
      :min-date="minDate"
      :row-height="48"
      :style="{ height: '370px' }"
      :formatter="formatter"
    />
    <div class="common-card padding-0">
      <div class="card-title style-title">{{ detail.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  data() {
    return {
      minDate: new Date(0),
      detail: {
        title: "17号排班"
      }
    };
  },
  methods: {
    load() {
      // let dom = document.querySelector(".schedule-content .van-calendar__header");
    },
    formatter(day) {
      if (day.type === "selected") {
        day.bottomInfo = "班";
      }
      return day;
    }
  }
};
</script>

<style scoped lang="less">
.schedule-content {
  padding: 0 @padding-md;

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: @padding-md;
  }

  ::v-deep {
    .van-calendar {
      margin-top: @margin-sm;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius: @border-radius-lg;
    }

    .van-calendar__header-title {
      display: none;
    }

    .van-calendar__month-title {
      color: white;
    }

    .van-calendar__bottom-info{
      border-radius: 50%;
      top: 0 !important;
      right: 0 !important;
      left: auto !important;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 22px;
      font-size: @font-size-xs !important;
      background: @blue;
    }
  }
}
</style>
