<template>
  <div class="date-picker">
    <van-field
      v-model="currentValue"
      :label="label"
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="placeholder"
      @click="show = true"
    />
    <van-calendar v-model="show" @confirm="onConfirm" />
  </div>
</template>

<script>
import { timeFormat } from "@/filter/timeFormat";

export default {
  name: "datePicker",
  props: {
    value: {},
    label: { type: String, default: "请选择日期" },
    placeholder: { type: String, default: "请选择日期" }
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
        this.currentValue = timeFormat(v);
      }
    }
  },
  methods: {
    onConfirm(date) {
      let timestamp = date.getTime();
      this.$emit("input", timestamp);
      this.$emit("change", timestamp);
      this.show = false;
    }
  }
};
</script>

<style scoped></style>
