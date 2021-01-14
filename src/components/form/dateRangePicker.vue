<template>
  <div class="date-range-picker">
    <van-field
      v-model="currentValue"
      :label="label"
      v-bind="$attrs"
      v-on="$listeners"
      readonly
      :placeholder="placeholder"
      @click="show = true"
    />
    <van-calendar
      v-model="show"
      type="range"
      allow-same-day
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { timeFormat } from "@/filter/timeFormat";

export default {
  name: "datePicker",
  props: {
    value: {},
    label: { type: String, default: "日期范围" },
    placeholder: { type: String, default: "请选择日期范围" }
  },
  data() {
    return {
      show: false,
      currentValue: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v && v.length === 2) {
          this.currentValue = timeFormat(v[0]) + " 至 " + timeFormat(v[1]);
        } else {
          this.currentValue = "";
        }
      }
    }
  },
  methods: {
    onConfirm(date) {
      const [start, end] = date;
      this.$emit("input", [start.getTime(), end.getTime()]);
      this.$emit("change", [start.getTime(), end.getTime()]);
      this.show = false;
    }
  }
};
</script>

<style scoped></style>
