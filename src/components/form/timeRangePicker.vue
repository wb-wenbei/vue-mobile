<template>
  <div class="time-range-picker">
    <time-picker
      v-model="startTime"
      label="开始时间"
      :max-hour="maxHour"
      placeholder="请选择开始时间"
      @change="onConfirm($event, 'startTime')"
    ></time-picker>
    <time-picker
      v-model="endTime"
      label="结束时间"
      :min-hour="minHour"
      placeholder="请选择结束时间"
      @change="onConfirm($event, 'endTime')"
    ></time-picker>
  </div>
</template>

<script>
import TimePicker from "./timePicker";

export default {
  name: "timeRangePicker",
  components: { TimePicker },
  props: {
    value: {},
    required: { type: Boolean, default: false }
  },
  data() {
    return {
      startShow: false,
      endShow: false,
      startTime: "",
      endTime: "",
      currentValue: ["", ""]
    };
  },
  computed: {
    minHour() {
      if (this.startTime) {
        return +this.startTime.split(":")[0];
      } else {
        return 0;
      }
    },
    maxHour() {
      if (this.startTime) {
        return +this.endTime.split(":")[0];
      } else {
        return 23;
      }
    },
    minMinute() {
      if (this.endTime) {
        return +this.startTime.split(":")[1];
      } else {
        return 0;
      }
    },
    maxMinute() {
      if (this.endTime) {
        return +this.endTime.split(":")[1];
      } else {
        return 59;
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v && v.length === 2) {
          this.startTime = v[0];
          this.endTime = v[1];
        } else {
          this.startTime = "";
          this.endTime = "";
        }
        this.currentValue = [this.startTime, this.endTime];
      }
    }
  },
  methods: {
    onConfirm(date, prop) {
      this.currentValue =
        prop === "startTime"
          ? [date, this.currentValue[1]]
          : [this.currentValue[0], date];
      this.$emit("input", this.currentValue);
      this.$emit("change", this.currentValue);
      this.startShow = false;
      this.endShow = false;
    }
  }
};
</script>

<style scoped></style>
