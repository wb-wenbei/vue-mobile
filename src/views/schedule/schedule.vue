<template>
  <div class="schedule-content">
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

    <div v-if="detail.workDate" class="common-card padding-0">
      <div class="card-title style-title">
        <div>{{ toDateFormat(detail.workDate, "MM月dd日") }}排班</div>
        <div class="status" :class="detail.type === 1 ? '' : 'un-normal'">
          {{ statusFilter(detail.type) }}
        </div>
      </div>
      <template v-if="showDetail">
        <div
          v-for="(schedule, index) in detail.workSchedule"
          :key="index"
          class="schedule-item"
        >
          <div class="schedule-time">
            <div class="schedule-icon"></div>
            {{ detail.workShiftName || "--" }} {{ schedule.timeRange[0] }}-{{
              schedule.timeRange[1]
            }}
          </div>
          <div class="schedule-area">
            <div class="area-icon"></div>
            {{ detail.mapAreaNames || "--" }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { workScheduleV3API, getWorkScheduleAPI } from "@/api/schedule";

import { toDateFormat } from "@/filters/timeFormat.js";

const statusOptions = [
  { id: 1, name: "正常", shortName: "班" },
  { id: 2, name: "休息", shortName: "休" },
  { id: 3, name: "请假", shortName: "假" },
  { id: 4, name: "调班", shortName: "调" },
  { id: 5, name: "加班", shortName: "加" }
];

export default {
  name: "Schedule",
  data() {
    return {
      toDateFormat,
      show: false,
      minDate: new Date(0),
      showDetail: false,
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
          this.getWorkSchedule(this.detail);
        })
        .finally(() => {
          this.show = true;
        });
    },
    selectDate(day) {
      this.detail = {};
      let dayTime = new Date(new Date(day).toLocaleDateString()).getTime();
      this.scheduleData.forEach(item => {
        if (item.workDate === dayTime) {
          this.detail = item;
          this.getWorkSchedule(item);
        }
      });
    },
    getWorkSchedule(item) {
      if (!item.workDate) {
        return;
      }
      this.showDetail = false;
      getWorkScheduleAPI({ timestamp: item.workDate })
        .then(res => {
          if (
            res.workScheduleDetailResponse &&
            res.workScheduleDetailResponse.workShiftDto &&
            res.workScheduleDetailResponse.workShiftDto.workShiftPeriods
          ) {
            let data =
              res.workScheduleDetailResponse.workShiftDto.workShiftPeriods;
            this.detail.workSchedule = [];
            let baseTimestamp = 0;
            data.forEach(item => {
              this.detail.workSchedule.push({
                timeRange: [
                  toDateFormat(baseTimestamp + item.startTime, "HH:mm"),
                  toDateFormat(baseTimestamp + item.endTime, "HH:mm")
                ]
              });
            });
          }
        })
        .finally(() => {
          this.showDetail = true;
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
      day.bottomInfo = this.statusFilter(
        this.scheduleType[dayTime],
        "shortName"
      );
      day.className = this.scheduleType[dayTime] === 1 ? "work" : "rest";
      return day;
    },
    statusFilter(v, key = "name") {
      let result = "--";
      statusOptions.forEach(item => {
        if (v === item.id) {
          result = item[key];
        }
      });
      return result;
    }
  }
};
</script>

<style scoped lang="less">
.schedule-content {
  padding: 0 @padding-md;
  border-radius: @border-radius-md;

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: @padding-sm 0 @padding-md;

    .status {
      border: 1px solid @blue;
      padding: 2px @padding-xs;
      font-size: 12px;
      font-weight: normal;
      border-radius: @border-radius-md;
      color: @blue;

      &.un-normal {
        border: 1px solid @red;
        color: @red;
      }
    }
  }

  .schedule-item {
    text-align: left;
    padding-bottom: @padding-base;
    margin-bottom: @margin-sm;
    border-bottom: 1px solid @gray-3;

    .schedule-time,
    .schedule-area {
      padding-bottom: @padding-sm;
      display: flex;
      align-items: center;
    }

    .schedule-icon,
    .area-icon {
      width: 18px;
      height: 18px;
      display: inline-block;
      margin-right: 4px;
      background: url("../../assets/icons/work-schedule.png") center / contain;
    }
    .area-icon {
      background: url("../../assets/icons/work-area.png") center / contain;
    }
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
