<template>
  <div class="schedule-content">
    <div class="date-content">
      <van-calendar
        v-if="show"
        :poppable="false"
        :show-confirm="false"
        :show-mark="true"
        :min-date="minDate"
        :row-height="48"
        :style="{ height: '370px' }"
        :formatter="formatter"
        @select="selectDate"
      />
    </div>

    <div v-if="detail.workDate" class="common-card padding-0">
      <div class="card-title style-title">
        {{ detail.workDate | formatDate }}（{{ detail.employeeName || '--' }}）
      </div>
      <div class="card-item">
        <span>排班状态：</span
        >{{ detail.type === 1 ? "正常" : detail.type === 2 ? "休息" : "--" }}
      </div>
      <div class="card-item">
        <span>作业区：</span>{{ detail.mapAreaNames || "--" }}
      </div>
      <div class="card-item">
        <span>班次：</span>{{ detail.workShiftName || "--" }}
      </div>
    </div>
  </div>
</template>

<script>
import { workScheduleV3API } from "@/api/schedule";
export default {
  name: "Schedule",
  data() {
    return {
      show: false,
      minDate: new Date(0),
      detail: {},
      scheduleType: {},
      scheduleData: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let employeeId = this.$store.state.userInfo.employeeId;
      // let employeeId = 34501;
      if (!employeeId) {
        this.$toast("本账号未关联职员，没有排班信息！");
        return;
      }
      let params = { employeeIds: employeeId, pageSize: 100, page: 1 };
      workScheduleV3API(params)
        .then(res => {
          this.scheduleData = res.data || [];
          this.scheduleData.forEach(item => {
            this.scheduleType[item.workDate] = item.type;
          });
          this.detail = this.scheduleData[0] || {};
        })
        .finally(() => {
          this.show = true;
        });
    },
    selectDate(day) {
      this.detail = {}
      let dayTime = new Date(new Date(day).toLocaleDateString()).getTime();
      this.scheduleData.forEach(item => {
        if (item.workDate === dayTime) {
          this.detail = item;
        }
      });
    },
    formatter(day) {
      if (!this.show) {
        return day;
      }
      let dayTime = new Date(new Date(day.date).toLocaleDateString()).getTime();
      if (!this.scheduleType[dayTime]) {
        return day;
      }
      if (this.scheduleType[dayTime] === 1) {
        day.bottomInfo = "班";
        day.className = "work";
      } else if (this.scheduleType[dayTime] === 2) {
        day.bottomInfo = "休";
        day.className = "rest";
      }
      return day;
    }
  }
};
</script>

<style scoped lang="less">
.schedule-content {
  padding: 0 @padding-md;

  .date-content {
    height: 370px;
    background: white;
  }

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: @padding-md;
  }

  .card-item {
    text-align: left;
    padding: 0 @padding-md @padding-xs;
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

    .van-calendar__day {
      align-items: flex-start;
      line-height: 32px;
    }
    .van-calendar__selected-day {
      align-items: flex-start;
      background: rgba(19, 168, 168, 0.6);
    }

    .work {
      .van-calendar__bottom-info {
        color: @blue;
      }
    }

    .rest {
      .van-calendar__bottom-info {
        color: @red;
      }
    }
  }
}
</style>
